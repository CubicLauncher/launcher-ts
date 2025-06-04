import { type BackendRes } from "../../shared/types";

interface IAPI {
  launcher: {
    downloadVersion(version: string): BackendRes;
	launchVersion(version: string): BackendRes;
	getVersions(version: string): BackendRes;
  };
  window: {
	closeLauncher(): BackendRes;
	hideLauncher(): BackendRes;
	maximizeLauncher(): BackendRes
  }
}
declare global {
	interface Window {
		cubic: IAPI;
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
