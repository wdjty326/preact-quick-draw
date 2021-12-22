export function isPassive (): boolean {
	let supportPassive = false;
	try {
		const opts = Object.defineProperty({}, "passive", {
			get: (): boolean => supportPassive,
			set: (): void => {
				supportPassive = true;
			},
		});

		window.addEventListener("testPassive", () => null, opts);
		window.removeEventListener("testPassive", () => null, opts);
	} catch (e) {}
	return supportPassive;
}
