// preload.ts
const { contextBridge, ipcRenderer } = require("electron");

const cubic = {
	settings: {
		// Obtener la configuración desde el proceso principal
		getSettings: async (): Promise<string> => {
			try {
				return await ipcRenderer.invoke("get-settings");
			} catch (error) {
				console.error(
					"Error al obtener la configuración:",
					error,
				);
				throw error;
			}
		},
		saveSettings: async (
			settings: object,
		): Promise<object> => {
			return await ipcRenderer.invoke(
				"new-settings",
				settings,
			);
		},
	},

	launcher: {
		// Descargar una versión específica
		downloadVersion: async (
			version: string,
		): Promise<void> => {
			try {
				await ipcRenderer.invoke(
					"download-version",
					version,
				);
			} catch (error) {
				console.error(
					"Error al descargar la versión:",
					error,
				);
				throw error;
			}
		},

		// Lanzar una versión específica
		launchVersion: async (
			version: string,
		): Promise<void> => {
			try {
				await ipcRenderer.invoke("launch-version", version);
			} catch (error) {
				console.error("Error al lanzar la versión:", error);
				throw error;
			}
		},
	},

	events: {
		// Escuchar progreso de descarga
		onDownloadProgress: (
			callback: (progress: number) => void,
		): void => {
			ipcRenderer.on(
				"download-progress",
				(
					_event: Electron.IpcRendererEvent,
					progress: number,
				) => {
					callback(progress);
				},
			);
		},

		// Escuchar el progreso del lanzador
		onLauncherProgress: (
			callback: (status: string) => void,
		): void => {
			ipcRenderer.on(
				"launcher-progress",
				(
					_event: Electron.IpcRendererEvent,
					status: string,
				) => {
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
};

contextBridge.exposeInMainWorld("cubic", cubic);
