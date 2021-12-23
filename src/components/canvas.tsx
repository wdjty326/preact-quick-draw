import { Fragment, FunctionComponent, h } from "preact";
import { useRef, useEffect } from "preact/hooks";
import { isPassive, objState } from "../libs";
import { PaintCursorState, PaintLocation, PaintReadyState } from "../defines/paint";

import "./canvas.scss";

const cWidth = 1920; // document.documentElement.clientWidth;
const cHeight = 1080; // document.documentElement.clientHeight;

const Canvas: FunctionComponent = () => {
	const mainLayer = useRef<HTMLCanvasElement>(null);
	const paintingLayer = useRef<HTMLCanvasElement>(null);

	const readyState = objState<PaintReadyState>(PaintReadyState.Ready);

	const rootPositions = objState<number[]>([]);
	const rootPointer = objState<number>(0);

	const renderData = objState<PaintLocation[]>([]);
	const renderStartCursor = objState<number>(0);
	const renderCursor = objState<number>(0);

	const cursorState = objState<PaintCursorState>(PaintCursorState.Pen);

	// const cursorDisp = objState<boolean>(false);
	// const cursorX = objState<number>(0);
	// const cursorY = objState<number>(0);

	const size = objState<number>(10);
	const radius = objState<"round" | "square">("round");
	const color = objState<string>("#0d6efd");

	const reload = (): void => {
		const layer = mainLayer.current;
		if (layer) {
			const ctx = layer.getContext("2d") as CanvasRenderingContext2D;
			ctx.lineCap = radius.value;
			ctx.lineJoin = "round";
			ctx.clearRect(0, 0, layer.width, layer.height);
			ctx.beginPath();
			console.log(renderData.value);
			for (let i = 0; i < renderCursor.value; i++) {
				const data = renderData.value[i];
				if (data.isRoot) {
					ctx.stroke();

					ctx.strokeStyle = data.color;
					ctx.lineWidth = data.size;

					ctx.moveTo(data.x, data.y);
				}
				else ctx.lineTo(data.x, data.y);
			}
			ctx.stroke();
			ctx.closePath();
		}
	};

	const undo = (): void => {
		let pointer = rootPointer.value - 1;
		pointer = pointer > 0 ? pointer : 0;

		const cursor = rootPositions.value[pointer];

		rootPointer.set(pointer);
		renderCursor.set(cursor);
		// for (let i = renderCursor.value; i > 0; i--) {
		// 	if (renderData.value[i].isRoot) {
		// 		renderCursor.set(i - 1);
		// 		break;
		// 	}
		// }
		reload();
	};

	const redo = (): void => {
		let pointer = rootPointer.value + 1;
		pointer = pointer < rootPositions.value.length ? pointer : rootPositions.value.length - 1;

		const cursor = rootPositions.value[pointer];

		rootPointer.set(pointer);
		renderCursor.set(cursor);
		// for (let i = renderCursor.value; i < renderData.value.length; i++) {
		// 	if (renderData.value[i].isRoot) {
		// 		renderCursor.set(i - 1);
		// 		break;
		// 	}
		// }
		reload();
	};

	const clear = (): void => {
		renderCursor.set(0);
		renderStartCursor.set(0);
		renderData.set([]);

		rootPositions.set([]);
		rootPointer.set(0);

		reload();
	};

	const SpoidColor = (e: MouseEvent | TouchEvent): void => {
		console.log(cursorState.value === PaintCursorState.Spoid);
		if (cursorState.value === PaintCursorState.Spoid) {
			e.preventDefault();
			if (e.currentTarget) {
				if (readyState.value !== PaintReadyState.Ready) return;
		
				const target = e.currentTarget as HTMLCanvasElement;
				const ctx = target.getContext("2d") as CanvasRenderingContext2D;

				let x, y;
				const rect = target.getBoundingClientRect();
				if ("touches" in e) {
					x = e.touches[0].clientX - rect.left;
					y = e.touches[0].clientY - rect.top;
				} else {
					x = e.clientX - rect.left;
					y = e.clientY - rect.top;
				}
	
				x = Math.round(x * target.width / target.offsetWidth);
				y = Math.round(y * target.height / target.offsetHeight);
	
				const imageData = ctx.getImageData(x, y, 1, 1);
				const colorData = imageData.data;

				// 색상이 없을 경우
				if (colorData[4] === 0) return;

				const r = `00${colorData[0].toString(16)}`.slice(-2);
				const g = `00${colorData[1].toString(16)}`.slice(-2);
				const b = `00${colorData[2].toString(16)}`.slice(-2);

				color.set(`#${r}${g}${b}`);
			}
		}
	};

	const mousedown = (e: MouseEvent | TouchEvent): void => {
		e.preventDefault();

		if ("button" in e && e.button) return;	// 버튼을 누른상태에서 이벤트 발생 무시
		if (e.currentTarget) {
			if (readyState.value !== PaintReadyState.Ready) return;
	
			const target = e.currentTarget as HTMLCanvasElement;
			const ctx = target.getContext("2d") as CanvasRenderingContext2D;

			ctx.strokeStyle = color.value;
			ctx.lineCap = radius.value;
			ctx.lineJoin = "round";
			ctx.lineWidth = size.value;

			let x, y;
			const rect = target.getBoundingClientRect();
			if ("touches" in e) {
				x = e.touches[0].clientX - rect.left;
				y = e.touches[0].clientY - rect.top;
			} else {
				x = e.clientX - rect.left;
				y = e.clientY - rect.top;
			}

			x = Math.round(x * target.width / target.offsetWidth);
			y = Math.round(y * target.height / target.offsetHeight);

			const datas = renderData.value;
			datas.push({
				x,
				y,
				color: color.value,
				size: size.value,
				isRoot: true,
				isTransparent: false,
			});
			renderData.set(datas);

			const cursor = datas.length - 1;
			renderCursor.set(cursor);
			renderStartCursor.set(cursor);

			const positions = rootPositions.value;
			positions.push(cursor);
			rootPositions.set(positions);

			const pointer = positions.length - 1;
			rootPointer.set(pointer);

			ctx.beginPath();
			ctx.moveTo(x, y);

			// cursorDisp.set(true);
			// cursorX.set(x);
			// cursorY.set(y);

			readyState.set(PaintReadyState.Play);
		}
	};

	const mousemove = (e: MouseEvent | TouchEvent): void => {
		e.preventDefault();
		if (e.currentTarget) {
			if (readyState.value !== PaintReadyState.Play) return;

			const target = e.currentTarget as HTMLCanvasElement;
			const ctx = target.getContext("2d") as CanvasRenderingContext2D;

			let x, y;
			const rect = target.getBoundingClientRect();
			if ("touches" in e) {
				x = e.touches[0].clientX - rect.left;
				y = e.touches[0].clientY - rect.top;
			} else {
				x = e.clientX - rect.left;
				y = e.clientY - rect.top;
			}

			x = Math.round(x * target.width / target.offsetWidth);
			y = Math.round(y * target.height / target.offsetHeight);

			const datas = renderData.value;
			datas.push({
				x,
				y,
				color: color.value,
				size: size.value,
				isRoot: false,
				isTransparent: false,
			});

			renderData.set(datas);
			renderCursor.set(datas.length);

			ctx.lineTo(x, y);
			ctx.stroke();

			// cursorDisp.set(true);
			// cursorX.set(x);
			// cursorY.set(y);
		}
	};

	const mouseup = (e: MouseEvent | TouchEvent): void => {
		e.preventDefault();
		if (e.currentTarget) {
			if (readyState.value !== PaintReadyState.Play) return;

			const target = e.currentTarget as HTMLCanvasElement;
			const ctx = target.getContext("2d") as CanvasRenderingContext2D;

			let x, y;
			const rect = target.getBoundingClientRect();
			if ("touches" in e) {
				x = e.touches[0].clientX - rect.left;
				y = e.touches[0].clientY - rect.top;
			} else {
				x = e.clientX - rect.left;
				y = e.clientY - rect.top;
			}

			x = Math.round(x * target.width / target.offsetWidth);
			y = Math.round(y * target.height / target.offsetHeight);

			const datas = renderData.value;
			datas.push({
				x,
				y,
				color: color.value,
				size: size.value,
				isRoot: false,
				isTransparent: false,
			});

			renderData.set(datas);
			renderCursor.set(datas.length);

			ctx.lineTo(x, y);
			ctx.stroke();
			ctx.closePath();

			readyState.set(PaintReadyState.Ready);

			// readyState.set(PaintReadyState.Ended);

			if (mainLayer.current) {
				const mainCtx = mainLayer.current.getContext("2d") as CanvasRenderingContext2D;
				mainCtx.drawImage(target, 0, 0, cWidth, cHeight);
				ctx.clearRect(0, 0, cWidth, cHeight);
			}

			// cursorDisp.set(true);
			// cursorX.set(x);
			// cursorY.set(y);
		}
	};

	useEffect(() => {
		const passive = isPassive() ? {
			passive: false,
		} : false;

		const layer = paintingLayer.current;

		if (layer) {
			layer.addEventListener("mousedown", mousedown);
			layer.addEventListener("mousemove", mousemove, passive);
			layer.addEventListener("mouseup", mouseup);
			// paintingLayer.current.addEventListener("touchmove", mousemove, passive);
		}

		return (): void => {
			if (layer) {
				layer.removeEventListener("mousedown", mousedown);
				layer.removeEventListener("mousemove", mousemove);
				layer.removeEventListener("mouseup", mouseup);
				// paintingLayer.current.removeEventListener("touchmove", mousemove);
			}
		};
	}, [size.value, color.value, radius.value]);

	return <>
		<div id="painting_canvas">
			<canvas
				id="main_layer"
				width={cWidth}
				height={cHeight}
				ref={mainLayer}
				onClick={SpoidColor}
			/>
			<canvas
				id="painting_layer"
				width={cWidth}
				height={cHeight}
				ref={paintingLayer}
				style={{
					display: cursorState.value !== PaintCursorState.Pen ? "none" : "block",
				}}
			/>
		</div>
		<button onClick={() => cursorState.set(PaintCursorState.Pen)}>
			Pen
		</button>
		<button onClick={() => cursorState.set(PaintCursorState.Spoid)}>
			Spoid
		</button>
		<input type="input" value={color.value} onInput={(e): void => {
			const target = e.target as HTMLInputElement;
			color.set(target.value);
		}} />
		<input type="input" value={size.value} onInput={(e): void => {
			const target = e.target as HTMLInputElement;
			size.set(parseInt(target.value, 10));
		}} />
		<button onClick={() => radius.set("round")}>
			Round
		</button>
		<button onClick={() => radius.set("square")}>
			Square
		</button>
		<button onClick={undo}>
			Undo
		</button>
		<button onClick={redo}>
			Redo
		</button>
		<button onClick={clear}>
			Clear
		</button>
	</>;
};

export default Canvas;

