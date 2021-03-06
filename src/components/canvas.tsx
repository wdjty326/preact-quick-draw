import { Fragment, Component, h, createRef, RefObject } from "preact";
import { isPassive } from "../libs";
import { PaintCursor, PaintLayer, PaintLocation, PaintReadyState } from "../defines/paint";
import { LAYER_FLAG_KEY } from "../defines/const";

import "./canvas.scss";

interface CanvasProps {
	cWidth: number;
	cHeight: number;
}
interface CanvasState {
	cursor: PaintCursor;
	size: number;
	radius: "round" | "square";
	color: string;

	currentLayer: PaintLayer;
	allLayer: PaintLayer[]; 
}
export default class Canvas extends Component<CanvasProps, CanvasState> {
	private mainLayer;
	private paintingLayer;

	private activeLayer: {
		[key: string]: RefObject<HTMLCanvasElement>;
	} = {};

	private readyState: PaintReadyState = PaintReadyState.Ready;

	private renderData: { [key: string]: PaintLocation[] } = {};
	private renderCursor: { [key: string]: number } = {};

	constructor () {
		super();

		this.mainLayer  = createRef<HTMLCanvasElement>();
		this.paintingLayer = createRef<HTMLCanvasElement>();

		const layer: PaintLayer = {
			id: `${LAYER_FLAG_KEY}${Date.now()}`,
			name: "Layer 1",
		};
		this.renderData[layer.id] = [];
		this.renderCursor[layer.id] = 0;
		this.activeLayer[layer.id] = createRef<HTMLCanvasElement>();

		this.state = {
			color: "#0d6efd",
			size: 10,
			cursor: PaintCursor.Pen,
			radius: "round",

			currentLayer: layer,
			allLayer: [layer],
		};
	}

	setStrokeStyle = (ctx: CanvasRenderingContext2D): void => {
		ctx.strokeStyle = this.state.color;
		ctx.lineCap = this.state.radius;
		ctx.lineJoin = "round";
		ctx.lineWidth = this.state.size;
	};

	mousedown = (e: MouseEvent | TouchEvent): void => {
		if (e.cancelable) e.preventDefault();
		const state = this.state;

		const setStrokeStyle = (ctx: CanvasRenderingContext2D): void => {
			ctx.strokeStyle = state.color;
			ctx.lineCap = state.radius;
			ctx.lineJoin = "round";
			ctx.lineWidth = state.size;
		};

		if ("button" in e && e.button) return;	// 버튼을 누른상태에서 이벤트 발생 무시
		if (e.currentTarget) {
			if (this.readyState !== PaintReadyState.Ready) return;
			const currentLayer = state.currentLayer;
			
			const target = e.currentTarget as HTMLCanvasElement;
			const ctx = target.getContext("2d") as CanvasRenderingContext2D;

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const ctxA = this.activeLayer[currentLayer.id].current!.getContext("2d")!;
			// const ctxO = this.mainLayer.current!.getContext("2d")!;

			setStrokeStyle(ctx);
			// setStrokeStyle(ctxO);
			setStrokeStyle(ctxA);

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

			let renderData = this.renderData[currentLayer.id];
			if (typeof renderData === "undefined") {
				this.renderData[currentLayer.id] = [];
				renderData = [];
			}
			let renderCursor = this.renderCursor[currentLayer.id];
			if (typeof renderCursor === "undefined") {
				this.renderCursor[currentLayer.id] = 0;
				renderCursor = 0;	
			}

			renderData.splice(
				renderCursor,
				renderData.length - renderCursor,
				{
					x,
					y,
					color: state.color,
					size: state.size,
					radius: state.radius,
					isRoot: true,
					isTransparent,
					layerId: state.currentLayer.id,
				});
			const cursor = renderData.length;

			this.renderCursor[currentLayer.id] = cursor;
			this.readyState = PaintReadyState.Play;

			if (isTransparent) {
				ctxA.save();
				ctxA.globalCompositeOperation = "destination-out";
			}
			ctxA.beginPath();
			ctxA.moveTo(x, y);					

			ctx.beginPath();
			ctx.moveTo(x, y);
		}
	};

	mousemove = (e: MouseEvent | TouchEvent): void => {
		e.preventDefault();
		const state = this.state;

		if (e.currentTarget) {
			if (this.readyState !== PaintReadyState.Play) return;
			const currentLayer = state.currentLayer;
			
			const target = e.currentTarget as HTMLCanvasElement;
			const ctx = target.getContext("2d") as CanvasRenderingContext2D;

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const ctxA = this.activeLayer[currentLayer.id].current!.getContext("2d")!;
			// const ctxO = this.mainLayer.current!.getContext("2d")!;
			
			let x, y;
			const rect = target.getBoundingClientRect();
			if ("changedTouches" in e) {
				x = e.changedTouches[0].clientX - rect.left;
				y = e.changedTouches[0].clientY - rect.top;
			} else {
				x = e.clientX - rect.left;
				y = e.clientY - rect.top;
			}

			x = Math.round(x * target.width / target.offsetWidth);
			y = Math.round(y * target.height / target.offsetHeight);

			const isTransparent = state.cursor === PaintCursor.Eraser;

			const renderData = this.renderData[currentLayer.id];
			renderData.push({
				x,
				y,
				color: state.color,
				size: state.size,
				radius: state.radius,
				isRoot: false,
				isTransparent,
				layerId: state.currentLayer.id,
			});

			this.renderCursor[currentLayer.id] = renderData.length;

			ctxA.lineTo(x, y);
			ctxA.stroke();
		
			ctx.lineTo(x, y);
			ctx.stroke();
		}
	};

	mouseup = (e: MouseEvent | TouchEvent): void => {
		if (e.cancelable) e.preventDefault();
		const state = this.state;

		if (e.currentTarget) {
			if (this.readyState !== PaintReadyState.Play) return;
			const currentLayer = state.currentLayer;
			
			const target = e.currentTarget as HTMLCanvasElement;
			const ctx = target.getContext("2d") as CanvasRenderingContext2D;

			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const ctxA = this.activeLayer[currentLayer.id].current!.getContext("2d")!;
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			const ctxO = this.mainLayer.current!.getContext("2d")!;

			let x, y;
			const rect = target.getBoundingClientRect();
			if ("targetTouches" in e) {
				x = e.targetTouches[0].clientX - rect.left;
				y = e.targetTouches[0].clientY - rect.top;
			} else {
				x = e.clientX - rect.left;
				y = e.clientY - rect.top;
			}

			x = Math.round(x * target.width / target.offsetWidth);
			y = Math.round(y * target.height / target.offsetHeight);

			const isTransparent = state.cursor === PaintCursor.Eraser;

			const renderData = this.renderData[currentLayer.id];
			renderData.push({
				x,
				y,
				color: state.color,
				size: state.size,
				radius: state.radius,
				isRoot: false,
				isTransparent,
				layerId: state.currentLayer.id,
			});

			this.renderCursor[currentLayer.id] = renderData.length;
			this.readyState = PaintReadyState.Ready;

			ctxA.lineTo(x, y);
			ctxA.stroke();
			isTransparent && ctxA.restore();

			ctx.lineTo(x, y);
			ctx.stroke();

			ctxO.beginPath();
			ctxO.drawImage(target, 0, 0, this.props.cWidth, this.props.cHeight)
			
			ctx.clearRect(0, 0, this.props.cWidth, this.props.cHeight);
		}
	};

	mouseleave = (e: MouseEvent): void => {
		if (this.readyState !== PaintReadyState.Play) return;
		if (this.paintingLayer.current !== e.currentTarget) this.mouseup(e);
	};

	forceReload = (): void => {
		this.forceUpdate(() => this.reload());
	};

	reload = (): void => {
		const mainLayer = this.mainLayer.current;
		const state = this.state;
		if (mainLayer) {
			const ctx = mainLayer.getContext("2d") as CanvasRenderingContext2D;
			let data: PaintLocation | null = null;

			ctx.clearRect(0, 0, mainLayer.width, mainLayer.height);
			ctx.lineJoin = "round";
			ctx.beginPath();
			state.allLayer.forEach((layer) => {
				const ctxA = (this.activeLayer[layer.id].current as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D;

				ctxA.clearRect(0, 0, this.props.cWidth, this.props.cHeight);
				ctxA.lineJoin = "round";
				ctxA.beginPath();

				for (let cursor = 0; cursor < this.renderCursor[layer.id]; cursor++) {
					data = this.renderData[layer.id][cursor];
					if (data.isRoot) {
						if (cursor !== 0) {
							ctx.stroke();
							data.isTransparent && ctx.restore();
							ctx.beginPath();

							ctxA.stroke();
							data.isTransparent && ctxA.restore();
							ctxA.beginPath();
						}
						if (data.isTransparent) {
							ctx.save();
							ctx.globalCompositeOperation = "destination-out";
							ctxA.save();
							ctxA.globalCompositeOperation = "destination-out";
						}
	
						ctx.strokeStyle = data.color;
						ctx.lineWidth = data.size;
						ctx.lineCap = state.radius;
					
						ctxA.strokeStyle = data.color;
						ctxA.lineWidth = data.size;
						ctxA.lineCap = state.radius;
					
						ctx.moveTo(data.x, data.y);
						ctxA.moveTo(data.x, data.y);
					}
					else {
						ctx.lineTo(data.x, data.y);
						ctxA.lineTo(data.x, data.y);
					}
				}
				
				ctxA.stroke();
				(data as unknown as PaintLocation)?.isTransparent && ctxA.restore();
			});
			ctx.stroke();
			(data as unknown as PaintLocation)?.isTransparent && ctx.restore();
		}
	};

	undo = (): void => {
		const currentLayer = this.state.currentLayer;
		let i = this.renderCursor[currentLayer.id] - 1;
		for (; i >= 0; i--) {
			if (this.renderData[currentLayer.id][i].isRoot) break;
		}
		this.renderCursor[currentLayer.id] = Math.max(i, 0);
		this.forceReload();
	};

	redo = (): void => {
		const currentLayer = this.state.currentLayer;
		const renderLength = this.renderData[currentLayer.id].length;

		let i = this.renderCursor[currentLayer.id] + 1;
		for (; i < renderLength; i++) {
			if (this.renderData[currentLayer.id][i].isRoot) break;
		}
		this.renderCursor[currentLayer.id] = Math.min(i, renderLength);
		this.forceReload();
	};

	clear = (): void => {
		const layer: PaintLayer = {
			id: `${LAYER_FLAG_KEY}${Date.now()}`,
			name: "Layer 1",
		};
		this.renderData = {
			[layer.id]: [],
		};
		this.renderCursor = {
			[layer.id]: 0,
		};


		this.forceReload();
	};

	SpoidColor = (e: MouseEvent | TouchEvent): void => {
		e.preventDefault();
		const state = this.state;
		if (state.cursor === PaintCursor.Spoid) {
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

	createLayer = (): void => {
		const id = `${LAYER_FLAG_KEY}${Date.now()}`;
		this.setState((state) => {
			const allLayer = state.allLayer;
			allLayer.push({
				id,
				name: `Layer ${allLayer.length + 1}`,
			});
			return {
				allLayer,
			};
		}, () => {
			this.renderData[id] = [];
			this.renderCursor[id] = 0;
			this.activeLayer[id] = createRef<HTMLCanvasElement>();
		});
	};

	deleteLayer = (layerId: string): void => {
		this.setState((state) => {
			const allLayer = state.allLayer;
			const idx = allLayer.findIndex((layer) => layer.id === layerId);
			if (idx > -1) allLayer.splice(idx, 1); 
			return {
				allLayer,
			};
		}, () => {
			this.renderData[layerId] && delete this.renderData[layerId];
			this.renderCursor[layerId] && delete this.renderCursor[layerId];
			this.activeLayer[layerId] && delete this.activeLayer[layerId];

			this.forceReload();
		});
	}

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
			document.addEventListener("mouseup", this.mouseleave);
			
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
			document.removeEventListener("mouseup", this.mouseleave);

			paintingLayer.removeEventListener("touchstart", this.mousedown);
			paintingLayer.removeEventListener("touchmove", this.mousemove);
			paintingLayer.removeEventListener("touchend", this.mouseup);
		}
	}

	render (props: Readonly<CanvasProps>, state: Readonly<CanvasState>): h.JSX.Element {
		return <>
			<div>
				<div
					id="painting_canvas"
					onTouchMove={(e): void => {
						// scroll issue
						e.preventDefault();
					}}
				>
					<canvas
						id="main_layer"
						width={props.cWidth}
						height={props.cHeight}
						ref={this.mainLayer}
						style={{
							opacity: 0,
						}}
					/>
					{ state.allLayer.map((layer) => <canvas
						class="active_layer"
						ref={this.activeLayer[layer.id]}
						key={layer.id}
						width={props.cWidth}
						height={props.cHeight}
						onClick={this.SpoidColor}
						onTouchStart={this.SpoidColor}
					/> )}
					<canvas
						id="painting_layer"
						width={props.cWidth}
						height={props.cHeight}
						ref={this.paintingLayer}
						style={{
							display: state.cursor === PaintCursor.Spoid ? "none" : "block",
							opacity: 0,
						}}
					/>
				</div>
			</div>
			<div id="tool_menu">
				<button data-theme="purple" onClick={(): void => this.setState({ cursor: PaintCursor.Pen })}>
					Pen
				</button>
				<button data-theme="purple" onClick={(): void => this.setState({ cursor: PaintCursor.Spoid })}>
					Spoid
				</button>
				<button data-theme="purple" onClick={(): void => this.setState({ cursor: PaintCursor.Eraser })}>
					Eraser
				</button>
				<div class="colorful">
					<input type="input" maxLength={7} value={state.color} onInput={(e): void => {
						const target = e.target as HTMLInputElement;
						this.setState({ color: target.value });
					}} />
					<span class="preview_colorful" style={`background: ${state.color}`} />
				</div>	
				<input type="number" min={0} max={100} maxLength={3} value={state.size} onInput={(e): void => {
					const target = e.target as HTMLInputElement;
					this.setState({ size: parseInt(target.value, 10) });
				}} />
				<button data-theme="green" onClick={(): void => this.setState({ radius: "round" })}>
					Round
				</button>
				<button data-theme="green" onClick={(): void => this.setState({ radius: "square" })}>
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
			</div>
			<div id="layer_menu">
				<button onClick={(): void => this.createLayer()}>
					Create
				</button>
				<button data-theme="green" onClick={(): void => this.setState((state) => {
					const allLayer = state.allLayer;
					const idx = allLayer.findIndex((layer2) => state.currentLayer.id === layer2.id);
					if (idx > 0) {
						const target = allLayer.splice(idx, 1)[0];
						allLayer.splice(idx - 1, 0, target);
					}
					return {
						allLayer,
					};
				}, () => this.reload())}>
					UP
				</button>
				<button data-theme="green"  onClick={(): void => this.setState((state) => {
					const allLayer = state.allLayer;
					const idx = allLayer.findIndex((layer2) => state.currentLayer.id === layer2.id);
					if (idx > -1 && idx + 1 < allLayer.length) {
						const target = allLayer.splice(idx, 1)[0];
						allLayer.splice(idx + 1, 0, target);
					}
					return {
						allLayer,
					};
				}, () => this.reload())}>
					DOWN
				</button>
				<ul>
					{ state.allLayer.map((layer) => <li
						key={layer.id}
						class={`layer_item ${layer.id === state.currentLayer.id ? "selected" : ""}`}
						onClick={(): void => this.setState({
							currentLayer: layer,
						})}
					>
						{layer.name}
						<span onClick={(): void => this.deleteLayer(layer.id)}>삭제</span>
					</li>)}
				</ul>
			</div>
		</>;
	}
}

Canvas.defaultProps = {
	cWidth: 1920,
	cHeight: 1080,
};
