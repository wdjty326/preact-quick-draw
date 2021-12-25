export interface PaintLocation {
	x: number;
	y: number;
	color: string;
	size: number;
	isRoot: boolean;
	isTransparent: boolean;
}

export enum PaintReadyState {
	Ready = "ready",
	Play = "play",
	Ended = "ended",
}

export enum PaintCursor {
	Pen = "pen",
	Spoid = "spoid",
	Eraser = "eraser",
}
