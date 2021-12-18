import { FunctionComponent, h } from "preact";
import { useRef, useEffect } from "preact/hooks";
import { objState } from "@/libs/state";
import { PaintLocation, PaintReadyState } from "@/defines/paint";

const Canvas: FunctionComponent = () => {
	const canvasElement = useRef<HTMLCanvasElement>(null);

	const readyState = objState<PaintReadyState>(PaintReadyState.Ready);

	const renderData = objState<PaintLocation[]>([]);
	const renderStartCursor = objState<number>(0);
	const renderCursor = objState<number>(0);

	const cursorDisp = objState<boolean>(false);
	const cursorX = objState<number>(0);
	const cursorY = objState<number>(0);

	const size = objState<number>(10);
	const radius = objState<number>(10);
	const color = objState<string>("#0d6efd");

	const cWidth = document.documentElement.clientWidth;
	const cHeight = document.documentElement.clientHeight;

	const mousedown = (e: MouseEvent | TouchEvent): void => {
		e.preventDefault();

		if ("button" in e && e.button) return;	// 버튼을 누른상태에서 이벤트 발생 무시
		if (e.currentTarget) {
			if (readyState.value !== PaintReadyState.Ready) return;
			readyState.set(PaintReadyState.Play);
	
			const target = e.currentTarget as HTMLCanvasElement;
			target.getClientRects();

			let x, y;

			if ("touches" in e) {
				const rect = target.getBoundingClientRect();
				x = e.touches[0].clientX - rect.left;
				y = e.touches[0].clientY - rect.top;
			} else {
				x = e.offsetX;
				y = e.offsetY;
			}

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

			cursorDisp.set(true);
			cursorX.set(x);
			cursorY.set(y)
		}
	};

	useEffect(() => {
		if (canvasElement.current) {
			canvasElement.current.addEventListener("mousedown", mousedown);
		}

		return () => {
			if (canvasElement.current) {
				canvasElement.current.removeEventListener("mousedown", mousedown);
			}
		};
	}, []);

	return <canvas
		id="painting_canvas"
		width={cWidth}
		height={cHeight}
		ref={canvasElement}
	/>;
};

export default Canvas;
