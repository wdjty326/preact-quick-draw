export interface PaintLocation {
	x: number;
	y: number;
	color: string;
	size: number;
	radius: string;
	isRoot: boolean;
	isTransparent: boolean;
	layerId: string;
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

export interface PaintLayer {
	id: string;
	name: string;
}
