import { ipcMain, BrowserWindow } from "electron/main";
import {
	readSettingsFile,
	writeSettingsFile,
} from "../services/SettingsUtils.js"; // Asegúrate de que esté exportada writeSettingsFile
import { Settings, DownloadEvent, BackendRes, CubicError, Instance } from "../../shared/types.js";
import { getVersions } from "../utilities/versions.js";
import { Launcher } from "../services/Launcher.js";
import { getInstances, WriteInstance } from "../services/InstanceService.js";
import { GetLauncherData } from "../utilities/launcher.js";
import { mainLogger } from "../services/logger.js";

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
				error: error instanceof Error ? error.message : String(error),
			};
		}
	});

	// Launch handlers
	ipcMain.handle("launch-version", async (_, version: string) => {
		try {
			// Using the public method from Launcher class
			await Launcher.launchVersion(version);
			return { success: true };
		} catch (error: unknown) {
			console.error("Error launching version:", error);
			return {
				success: false,
				error: error instanceof Error ? error.message : String(error),
			};
		}
	});

	// Instance handlers
	ipcMain.handle("get-instances", async () => {
		return await getInstances()
	});

	ipcMain.handle("save-instances", async (_, instance: Instance) => {
		try {
			await WriteInstance(instance);
			return { success: true };
		} catch (error: unknown) {
			mainLogger.error("Error saving instance:", error);
			return {
				success: false,
				error: error instanceof Error ? error.message : String(error),
			};
		}
	});

	ipcMain.handle("get-launcher-data", async (): Promise<BackendRes> => {
		try {
			let launcherData = await GetLauncherData();
			return { success: true, data: launcherData  };
		} catch (error: unknown) {
			return {
				success: false,
				error: error instanceof Error ? error.message : String(error),
			};
		}
	});

	// Register download progress event
	Launcher.onDownloadProgress((progress: DownloadEvent) => {
		// Send progress to all renderer processes
		const windows = BrowserWindow.getAllWindows();
		windows.forEach((window: Electron.BrowserWindow) => {
			if (!window.isDestroyed()) {
				window.webContents.send("download-progress", progress);
			}
		});
	});
}

export async function registerWindowControls(window: BrowserWindow) {
	ipcMain.handle("close-launcher", () => {
		try {
			window.close();
			return {
				success: true,
			} as BackendRes
		} catch (error) {
			return {
				success: false,
				errorType: CubicError.CloseWinError,
				error: error
			} as BackendRes
		}
	});

	ipcMain.handle("hide-launcher", () => {
		try {
			window.minimize();
			return {
				success: true,
			} as BackendRes
		} catch (error) {
			return {
				success: false,
				errorType: CubicError.HideWinError,
				error: error
			} as BackendRes
		}
	});

	ipcMain.handle("maximize-launcher", () => {
		try {
			if (!window.isMaximized()) {
				window.maximize()
			} else {
				window.restore();
			}
			return {
				success: true,
			} as BackendRes
		} catch (error) {
			return {
				success: false,
				errorType: CubicError.MaximizeWinError,
				error: error
			} as BackendRes
		}
	});
}
