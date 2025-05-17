//Imports
import { Downloader, NeutronLauncher } from 'cubic-neutron';
import appPaths from '../utils/AppPaths.js';
import handleCode from '../utils/Api.js';
import { getSettings } from '../utils/settings.js';
import type { Settings } from '../types/ApiTypes.js';
import { v4 } from 'uuid';

// Declarations
const launcher = new NeutronLauncher();
const gamedir = appPaths.getGameDir();
const settingsRes = await getSettings();
const settings = settingsRes.data as Settings;
const downloader = new Downloader(settings.gamedir);

export async function downloadVersion(
	version: string,
	event: Electron.IpcMainInvokeEvent,
) {
	handleCode('INF01', version);

	// Escuchamos el progreso de la descarga
	downloader.on('percentDownloaded', (percent) => {
		event.sender.send('download-progress', percent);
	});

	try {
		console.log(gamedir);
		await downloader.download(version);
		event.sender.send('download-complete');
		return handleCode('OK01', version);
	} catch (error) {
		if (typeof error === 'string') {
			return handleCode('ERR09', error);
		}
		if (error instanceof Error) {
			return handleCode('ERR09', error.message);
		}
		return handleCode('ERR99', 'Unknown error');
	}
}

export async function launchVersion(
	version: string,
	event: Electron.IpcMainInvokeEvent,
) {
	handleCode('INF02', version);
	let token = v4();
	try {
		await launcher.launchVersion({
			username: settings.username,
			uuid: token,
			accessToken: token,
			minecraftDir: settings.gamedir,
			version: version,
			isCracked: true,
		});
		event.sender.send('download-complete');
		return handleCode('OK01', version);
	} catch (error) {
		if (typeof error === 'string') {
			return handleCode('ERR09', error);
		}
		if (error instanceof Error) {
			return handleCode('ERR09', error.message);
		}
		return handleCode('ERR99', 'Unknown error');
	}
}
