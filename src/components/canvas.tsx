import { Fragment, Component, h, createRef } from "preact";
import { useRef, useEffect } from "preact/hooks";
import { isPassive, objState } from "../libs";
import { PaintCursor, PaintLocation, PaintReadyState } from "../defines/paint";

import "./canvas.scss";

const cWidth = 1920; // document.documentElement.clientWidth;
const cHeight = 1080; // document.documentElement.clientHeight;


interface CanvasProps {
	// readyState: PaintReadyState;

	// renderData: PaintLocation[];
	// renderStartCursor: number;
	// renderCursor: number;

	// rootData: number[];
	// rootCursor: number;

	cursor: PaintCursor;
	size: number;
	radius: "round" | "square";
	color: string;
}
export default class Canvas extends Component<unknown, CanvasProps> {
	private mainLayer;
	private paintingLayer;

	private readyState: PaintReadyState = PaintReadyState.Ready;

	private renderData: PaintLocation[] = [];
	private renderCursor = 0;
	private renderStartCursor = 0;

	constructor () {
		super();

		this.mainLayer  = createRef<HTMLCanvasElement>();
		this.paintingLayer = createRef<HTMLCanvasElement>();

		this.state = {
			// renderData: [],
			color: "#0d6efd",
			size: 10,
			// rootData: [],
			// rootCursor: 0,
			cursor: PaintCursor.Pen,
			radius: "round",
			// readyState: PaintReadyState.Ready,
			// renderCursor: 0,
			// renderStartCursor: 0,
		};
	}

	mousedown = (e: MouseEvent | TouchEvent): void => {
		e.preventDefault();
		const state = this.state;

		const setSrokeStyle = (ctx: CanvasRenderingContext2D): void => {
			ctx.strokeStyle = state.color;
			ctx.lineCap = state.radius;
			ctx.lineJoin = "round";
			ctx.lineWidth = state.size;
		};

		if ("button" in e && e.button) return;	// 버튼을 누른상태에서 이벤트 발생 무시
		if (e.currentTarget) {
			if (this.readyState !== PaintReadyState.Ready) return;
	
			const target = e.currentTarget as HTMLCanvasElement;
			const ctx = target.getContext("2d") as CanvasRenderingContext2D;

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const ctxO = this.mainLayer.current!.getContext("2d")!;

			setSrokeStyle(ctx);
			setSrokeStyle(ctxO);

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

			const renderData = this.renderData;
			renderData.push({
				x,
				y,
				color: state.color,
				size: state.size,
				isRoot: true,
				isTransparent: state.cursor === PaintCursor.Eraser,
			});
			const cursor = renderData.length - 1;

			this.renderCursor = cursor;
			this.renderStartCursor = cursor;
			this.readyState = PaintReadyState.Play;

			// this.setState({
			// 	renderData,
			// 	renderCursor: cursor,
			// 	renderStartCursor: cursor,

			// 	rootData,
			// 	rootCursor,
			// 	readyState: PaintReadyState.Play,
			// });

			ctx.beginPath();
			ctx.moveTo(x, y);

			ctx.beginPath();
			ctxO.moveTo(x, y);

			// cursorDisp.set(true);
			// cursorX.set(x);
			// cursorY.set(y);
		}
	};

	mousemove = (e: MouseEvent | TouchEvent): void => {
		e.preventDefault();
		const state = this.state;

		if (e.currentTarget) {
			if (this.readyState !== PaintReadyState.Play) return;

			const target = e.currentTarget as HTMLCanvasElement;
			const ctx = target.getContext("2d") as CanvasRenderingContext2D;

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const ctxO = this.mainLayer.current!.getContext("2d")!;

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

			const isTransparent = state.cursor === PaintCursor.Eraser;

			const renderData = this.renderData;
			renderData.push({
				x,
				y,
				color: state.color,
				size: state.size,
				isRoot: false,
				isTransparent,
			});

			this.renderCursor = renderData.length - 1;

			// this.setState({
			// 	renderData,
			// 	renderCursor: renderData.length - 1,
			// });

			if (isTransparent) {
				// TODO::호를 활용
				ctxO.clearRect(x, y, state.size, state.size);
			} else {
				ctxO.lineTo(x, y);
				ctxO.stroke();
			}

			ctx.lineTo(x, y);
			ctx.stroke();

			// cursorDisp.set(true);
			// cursorX.set(x);
			// cursorY.set(y);
		}
	};

	mouseup = (e: MouseEvent | TouchEvent): void => {
		e.preventDefault();
		const state = this.state;

		if (e.currentTarget) {
			if (this.readyState !== PaintReadyState.Play) return;

			const target = e.currentTarget as HTMLCanvasElement;
			const ctx = target.getContext("2d") as CanvasRenderingContext2D;

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const ctxO = this.mainLayer.current!.getContext("2d")!;

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

			const isTransparent = state.cursor === PaintCursor.Eraser;

			const renderData = this.renderData;
			renderData.push({
				x,
				y,
				color: state.color,
				size: state.size,
				isRoot: false,
				isTransparent,
			});

			this.renderCursor = renderData.length - 1;
			this.readyState = PaintReadyState.Ready;

			// this.setState({
			// 	renderData,
			// 	renderCursor: renderData.length - 1,
				
			// 	readyState: PaintReadyState.Ready,
			// });

			if (isTransparent) {
				ctxO.clearRect(x, y, state.size, state.size);
			} else {
				ctxO.lineTo(x, y);
				ctxO.stroke();
				ctx.closePath();
			}

			ctx.lineTo(x, y);
			ctx.stroke();
			ctx.closePath();
			
			
			ctx.clearRect(0, 0, cWidth, cHeight);
			// readyState.set(PaintReadyState.Ended);

			// const mainLayer = this.mainLayer.current;

			// if (mainLayer) {
			// 	const mainCtx = mainLayer.getContext("2d") as CanvasRenderingContext2D;
			// 	mainCtx.drawImage(target, 0, 0, cWidth, cHeight);
			// }

			// cursorDisp.set(true);
			// cursorX.set(x);
			// cursorY.set(y);
		}
	};

	reload = (): void => {
		const mainLayer = this.mainLayer.current;
		const state = this.state;
		if (mainLayer) {
			const ctx = mainLayer.getContext("2d") as CanvasRenderingContext2D;
			ctx.clearRect(0, 0, mainLayer.width, mainLayer.height);

			ctx.lineCap = state.radius;
			ctx.lineJoin = "round";

			ctx.beginPath();
			for (let i = 0; i < this.renderCursor; i++) {
				const data = this.renderData[i];
				if (data.isRoot) {
					if (i !== 0) {
						ctx.stroke();
						ctx.beginPath();
					}

					ctx.strokeStyle = data.color;
					ctx.lineWidth = data.size;

					ctx.moveTo(data.x, data.y);
				}
				else if (data.isTransparent) ctx.clearRect(data.x, data.y, data.size, data.size);
				else ctx.lineTo(data.x, data.y);
			}
			ctx.stroke();
			ctx.closePath();
		}
	};

	undo = (): void => {
		// const rootCursor = this.state.rootCursor - 1;
		// if (rootCursor >= 0) {
		// 	const cursor = this.state.rootData[rootCursor];

		// 	this.setState({
		// 		rootCursor,
		// 		renderCursor: cursor,
		// 	});
		// }
		let i = this.renderCursor;
		for (; i > 0; i--) {
			if (this.renderData[i].isRoot) break;
		}
		this.renderCursor = i > 0 ? i - 1 : 0;
		this.reload();
		// this.setState({ renderCursor: i > 0 ? i - 1 : 0 }, () => {
		// 	this.reload();
		// });
	};

	redo = (): void => {
		// const rootCursor = this.state.rootCursor + 1;
		// if (rootCursor < this.state.rootData.length) {
		// 	const cursor = this.state.rootData[rootCursor];

		// 	this.setState({
		// 		rootCursor,
		// 		renderCursor: cursor,
		// 	});
		// }
		const renderLength = this.renderData.length;
		let i = this.renderCursor + 2;
		for (; i < renderLength; i++) {
			if (this.renderData[i].isRoot) break;
		}
		this.renderCursor = (i < renderLength ? i : renderLength) - 1;
		this.reload();
		// this.setState({ renderCursor: (i < renderLength ? i : renderLength) - 1 }, () => {
		// 	this.reload();
		// });
	};

	clear = (): void => {
		// this.setState({
		// 	renderCursor: 0,
		// 	renderStartCursor: 0,
		// 	renderData: [],

		// 	rootCursor: 0,
		// 	rootData: [],
		// });
		this.renderCursor = 0;
		this.renderStartCursor = 0;
		this.renderData.length = 0;

		this.reload();
	};

	SpoidColor = (e: MouseEvent | TouchEvent): void => {
		const state = this.state;
		if (state.cursor === PaintCursor.Spoid) {
			e.preventDefault();
			if (e.currentTarget) {
				if (this.readyState !== PaintReadyState.Ready) return;
		
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

				this.setState({
					color: `#${r}${g}${b}`, 
				});
			}
		}
	};

	componentDidMount (): void {
		const paintingLayer = this.paintingLayer.current;
		if (paintingLayer) {
			const passive = isPassive() ? {
				passive: false,
				capture: false,
			} : false;

			paintingLayer.addEventListener("mousedown", this.mousedown);
			paintingLayer.addEventListener("mousemove", this.mousemove, passive);
			paintingLayer.addEventListener("mouseup", this.mouseup);
			
			paintingLayer.addEventListener("touchstart", this.mousedown);
			paintingLayer.addEventListener("touchmove", this.mousemove, passive);
			paintingLayer.addEventListener("touchend", this.mouseup);
		}
	}

	componentWillUnmount (): void {
		const paintingLayer = this.paintingLayer.current;
		if (paintingLayer) {
			paintingLayer.removeEventListener("mousedown", this.mousedown);
			paintingLayer.removeEventListener("mousemove", this.mousemove);
			paintingLayer.removeEventListener("mouseup", this.mouseup);

			paintingLayer.removeEventListener("touchstart", this.mousedown);
			paintingLayer.removeEventListener("touchmove", this.mousemove);
			paintingLayer.removeEventListener("touchend", this.mouseup);
		}
	}

	render (_: unknown, state: Readonly<CanvasProps>): h.JSX.Element {
		return <>
			<div id="painting_canvas">
				<canvas
					id="main_layer"
					width={cWidth}
					height={cHeight}
					ref={this.mainLayer}
					onClick={this.SpoidColor}
				/>
				<canvas
					id="painting_layer"
					width={cWidth}
					height={cHeight}
					ref={this.paintingLayer}
					style={{
						display: state.cursor === PaintCursor.Spoid ? "none" : "block",
						opacity: 0,
					}}
					onMouseDown={this.mousedown}
					onMouseMove={this.mousemove}
					onMouseUp={this.mouseup}
				/>
			</div>
			<button onClick={(): void => this.setState({ cursor: PaintCursor.Pen })}>
				Pen
			</button>
			<button onClick={(): void => this.setState({ cursor: PaintCursor.Spoid })}>
				Spoid
			</button>
			<button onClick={(): void => this.setState({ cursor: PaintCursor.Eraser })}>
				Eraser
			</button>
			<input type="input" value={state.color} onInput={(e): void => {
				const target = e.target as HTMLInputElement;
				this.setState({ color: target.value });
			}} />
			<input type="input" value={state.size} onInput={(e): void => {
				const target = e.target as HTMLInputElement;
				this.setState({ size: parseInt(target.value, 10) });
			}} />
			<button onClick={(): void => this.setState({ radius: "round" })}>
				Round
			</button>
			<button onClick={(): void => this.setState({ radius: "square" })}>
				Square
			</button>
			<button onClick={(): void => this.undo()}>
				Undo
			</button>
			<button onClick={(): void => this.redo()}>
				Redo
			</button>
			<button onClick={(): void => this.clear()}>
				Clear
			</button>
		</>;
	}
}
