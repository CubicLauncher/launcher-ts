/// <reference types="electron" />

// Usamos require para no convertir esto en módulo ES
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('cubic', {
  settings: {
    getSettings: (): Promise<string> =>
      ipcRenderer.invoke('get-settings'),
  },

  launcher: {
    downloadVersion: (version: string): Promise<void> =>
      ipcRenderer.invoke('download-version', version),
	launchVersion: (version: string): Promise<void> =>
		ipcRenderer.invoke('launch-version', version),
  },
  events: {
	onDownloadProgress: (callback: (progress: number) => void): void => {
		ipcRenderer.on(
		  'download-progress',
		  (_event: Electron.IpcRendererEvent, progress: number) => {
			callback(progress);
		  }
		);
	  },
	  onLauncherProgress: (callback: (status: string) => void): void => {
		ipcRenderer.on(
		  'download-progress',
		  (_event: Electron.IpcRendererEvent, status: string) => {
			callback(status);
		  }
		);
	  },
  
	  onDownloadComplete: (callback: () => void): void => {
		ipcRenderer.on(
		  'download-complete',
		  (_event: Electron.IpcRendererEvent) => {
			callback();
		  }
		);
	  },
  },
});
