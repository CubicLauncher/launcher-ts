import type {
	BackendRes,
	Instance,
	MinecraftVersion,
} from "../../shared/types";

interface IAPI {
	launcher: {
		downloadVersion(version: string): BackendRes;
		launchVersion(version: string): BackendRes;
		getVersions(): BackendRes;
		getInstances(): Promise<BackendRes>;
		createInstance(instance: Instance): Promise<BackendRes>;
	};
	window: {
		closeLauncher(): BackendRes;
		hideLauncher(): BackendRes;
		maximizeLauncher(): BackendRes;
	};
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

export async function GetVersions() {
	const versions = await window.cubic.launcher.getVersions();
	if (!versions.success) {
		return [];
	} else {
		const instances = versions.data;
		return instances.versions as MinecraftVersion[];
	}
}
export async function SaveInstance(instance: Instance) {
	return await window.cubic.launcher.createInstance(instance);
}
