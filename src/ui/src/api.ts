import { type BackendRes, type Instance } from "../../shared/types";

interface IAPI {
  launcher: {
    downloadVersion(version: string): BackendRes;
	launchVersion(version: string): BackendRes;
	getVersions(version: string): BackendRes;
    getInstances(): Promise<BackendRes>;
    saveInstances(instances: Instance[]): Promise<BackendRes>;
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
