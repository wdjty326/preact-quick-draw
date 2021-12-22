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

	const spoideColor = (e: MouseEvent | TouchEvent): void => {
		if (cursorState.value === PaintCursorState.Spoide) {
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
	
				const data = ctx.getImageData(x, y, 1, 1);
				console.log(data);
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
			renderCursor.set(datas.length);
			renderStartCursor.set(datas.length);

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

		const onMousedown = mousedown.bind(this);
		const onMousemove = mousemove.bind(this);
		const onMouseup = mouseup.bind(this);

		const layer = paintingLayer.current;

		if (layer) {
			layer.addEventListener("mousedown", onMousedown);
			layer.addEventListener("mousemove", onMousemove, passive);
			layer.addEventListener("mouseup", onMouseup);
			// paintingLayer.current.addEventListener("touchmove", mousemove, passive);
		}

		return (): void => {
			if (layer) {
				layer.removeEventListener("mousedown", onMousedown);
				layer.removeEventListener("mousemove", onMousemove);
				layer.removeEventListener("mouseup", onMouseup);
				// paintingLayer.current.removeEventListener("touchmove", mousemove);
			}
		};
	}, []);

	return <>
		<div id="painting_canvas">
			<canvas
				id="main_layer"
				width={cWidth}
				height={cHeight}
				ref={mainLayer}
				onClick={spoideColor}
			/>
			<canvas
				id="painting_layer"
				width={cWidth}
				height={cHeight}
				ref={paintingLayer}
				style={{
					pointerEvents: cursorState.value !== PaintCursorState.Pen ? "none" : "auto", 
				}}
			/>
		</div>
		<button onClick={() => cursorState.set(PaintCursorState.Pen)}>
			Pen
		</button>
		<button onClick={() => cursorState.set(PaintCursorState.Spoide)}>
			Spoide
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
	</>;
};

export default Canvas;

