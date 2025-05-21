import { Settings } from "../shared/types";
import { contextBridge, ipcRenderer } from "electron";

const cubic = {
  settings: {
    // Obtener la configuración desde el proceso principal
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
    onDownloadProgress: (callback: (progress: number) => void): void => {
      ipcRenderer.on(
        "download-progress",
        (_event: Electron.IpcRendererEvent, progress: number) => {
          callback(progress);
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
};

contextBridge.exposeInMainWorld("cubic", cubic);
