import { ipcMain } from 'electron';
import { downloadVersion, launchVersion } from './launcher.js';
import { getSettings, newSettings } from '../utils/settings.js';
import type { Settings } from '../types/ApiTypes.js';
import handleCode from '../utils/Api.js';

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
	ipcMain.handle('launch-version', async (event, version: string) => {
		return await launchVersion(version, event);
	});
	ipcMain.handle('new-settings', async (_, settings: Settings) => {
		try {
			let result = await newSettings(settings);
			return result;
		} catch (error) {
			if (typeof error === 'string') {
				return handleCode('ERR09', error);
			}
			if (error instanceof Error) {
				return handleCode('ERR09', error.message);
			}
			return handleCode('ERR99', 'Unknown error');
		}
	});
}
