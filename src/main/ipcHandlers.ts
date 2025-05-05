import { ipcMain } from 'electron';
import { downloadVersion } from './launcher.js';
import { getSettings } from '../utils/settings.js';

/**
 * @
 */
export async function InitializeHandlers() {
	ipcMain.handle('get-settings', async () => {
		return await getSettings();
	});
	ipcMain.handle('download-version', async (event, version: string) => {
		return await downloadVersion(version, event);
	});
}
