export interface PaintLocation {
	x: number;
	y: number;
	color: string;
	size: number;
	isRoot: boolean;
	isTransparent: boolean;
}

export enum PaintReadyState {
	Ready = "Ready",
	Play = "play",
	Ended = "ended",
}
