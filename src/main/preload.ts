import { Settings, DownloadEvent } from "../shared/types";
import { contextBridge, ipcRenderer } from "electron";

const cubic = {
	settings: {
		getSettings: async (): Promise<object> => {
			try {
				return await ipcRenderer.invoke("get-settings");
			} catch (error) {
				console.error("Error al obtener la configuración:", error);
				throw error;
			}
		},
		writeSettings: async (settings: Settings): Promise<object> => {
			try {
				return await ipcRenderer.invoke("write-settings", settings);
			} catch (error) {
				console.error("Error al obtener la configuración:", error);
				throw error;
			}
		},
	},

	events: {
		// Escuchar progreso de descarga
		onDownloadProgress: (callback: (progress: DownloadEvent) => void): void => {
			ipcRenderer.on(
				"download-progress",
				(_event: Electron.IpcRendererEvent, percent: DownloadEvent) => {
					callback(percent);
				},
			);
		},

		// Escuchar el progreso del lanzador
		onLauncherProgress: (callback: (status: string) => void): void => {
			ipcRenderer.on(
				"launcher-progress",
				(_event: Electron.IpcRendererEvent, status: string) => {
					// Aquí usamos Electron.IpcRendererEvent
					callback(status);
				},
			);
		},

		// Escuchar cuando la descarga se complete
		onDownloadComplete: (callback: () => void): void => {
			ipcRenderer.on(
				"download-complete",
				(_event: Electron.IpcRendererEvent) => {
					callback();
				},
			);
		},
	},
	launcher: {
		getVersions: async (): Promise<object> => {
			try {
				return await ipcRenderer.invoke("get-versions");
			} catch (error) {
				console.error("Error al obtener las versiones:", error);
				throw error;
			}
		},
		downloadVersion: async (version: string): Promise<object> => {
			try {
				return await ipcRenderer.invoke("download-version", version);
			} catch (error) {
				console.error("Error al descargar la version:", error);
				throw error;
			}
		},

		launchVersion: async (version: string): Promise<object> => {
			try {
				return await ipcRenderer.invoke("launch-version", version);
			} catch (error) {
				console.error("Error al descargar la version:", error);
				throw error;
			}
		},
		getInstances: async (): Promise<object> => {
			try {
				return await ipcRenderer.invoke("get-instances");
			} catch (error) {
				console.error("Error al obtener las instancias:", error);
				throw error;
			}
		},
		saveInstances: async (instances: object[]): Promise<object> => {
			try {
				return await ipcRenderer.invoke("save-instances", instances);
			} catch (error) {
				console.error("Error al guardar las instancias:", error);
				throw error;
			}
		}
	},
	window: {
		closeLauncher: () => {
			try {
				return ipcRenderer.invoke("close-launcher");
			} catch (error) {
				throw error;
			}
		},
		hideLauncher: () => {
			try {
				return ipcRenderer.invoke("hide-launcher");
			} catch (error) {
				throw error;
			}
		},
		maximizeLauncher: () => {
			try {
				return ipcRenderer.invoke("maximize-launcher");
			} catch (error) {
				throw error;
			}
		},
	}
};

contextBridge.exposeInMainWorld("cubic", cubic);
