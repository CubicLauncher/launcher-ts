declare global {
	interface Window {
		cubic: any;
	}
}

export function closeLauncher() {
	window.cubic.window.closeLauncher();
}

export function hideLauncher() {
	window.cubic.window.hideLauncher();
}
export function maximizeLauncher() {
	window.cubic.window.maximizeLauncher();
}
