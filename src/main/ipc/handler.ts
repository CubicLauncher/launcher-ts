import { ipcMain, BrowserWindow } from "electron/main";
import {
  readSettingsFile,
  writeSettingsFile,
} from "../services/SettingsUtils.js"; // Asegúrate de que esté exportada writeSettingsFile
import { Settings, DownloadEvent } from "../../shared/types.js";
import { getVersions } from "../utilities/versions.js";
import { Launcher } from "../services/Launcher.js";

export async function registerHandlers() {
  // Settings handlers
  ipcMain.handle("get-settings", async () => {
    return await readSettingsFile();
  });

  ipcMain.handle("write-settings", async (_, settings: Settings) => {
    await writeSettingsFile(settings);
    return { success: true };
  });

  // Version handlers
  ipcMain.handle("get-versions", async () => {
    return await getVersions();
  });
  
  // Download handlers
  ipcMain.handle("download-version", async (_, version: string) => {
    try {
      // Using the public method from Launcher class
      await Launcher.downloadVersion(version);
      return { success: true };
    } catch (error: unknown) {
      console.error("Error downloading version:", error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : String(error) 
      };
    }
  });
  
  // Download handlers
  ipcMain.handle("launch-version", async (_, version: string) => {
    try {
      // Using the public method from Launcher class
      await Launcher.launchVersion(version);
      return { success: true };
    } catch (error: unknown) {
      console.error("Error downloading version:", error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : String(error) 
      };
    }
  });

  // Register download progress event
  Launcher.onDownloadProgress((progress: DownloadEvent) => {
    // Send progress to all renderer processes
    const windows = BrowserWindow.getAllWindows();
    windows.forEach((window: Electron.BrowserWindow) => {
      if (!window.isDestroyed()) {
        window.webContents.send('download-progress', progress);
      }
    });
  });
}
