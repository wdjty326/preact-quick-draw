export interface PaintLocation {
	x: number;
	y: number;
	color: string;
	size: number;
	radius: string;
	isRoot: boolean;
	isTransparent: boolean;
}

export enum PaintReadyState {
	Ready = "ready",
	Play = "play",
}

export enum PaintCursor {
	Pen = "pen",
	Spoid = "spoid",
	Eraser = "eraser",
}
