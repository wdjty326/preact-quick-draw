import { useState } from "preact/hooks";

export interface ObjectState<T> {
	readonly value: T;
	set (value: T | ((prevState: T) => T)): void;
}

export function objState<T> (initialState: T | (() => T)): ObjectState<T> {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [value, updator] = useState<T>(initialState);
	return {
		value,
		set (value: T): void {
			(this.value as T) = value;
			updator(value);
		},
	};
}
