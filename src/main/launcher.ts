import { Downloader, Launcher } from 'cubic-neutron';
import appPaths from '../utils/AppPaths.js';
import handleCode from '../utils/Api.js';
import { getSettings } from '../utils/settings.js';
import { Settings } from '../types/ApiTypes.js';
const downloader = new Downloader();
const launcher = new Launcher();
const gamedir = appPaths.getGameDir();
const settingsRes = await getSettings();
const settings = settingsRes.data as Settings

export async function downloadVersion(
	version: string,
	event: Electron.IpcMainInvokeEvent,
) {
	handleCode('INF01', version);

	// Escuchamos el progreso de la descarga
	downloader.on('percentDownloaded', (percent: number) => {
		event.sender.send('download-progress', percent);
	});

	try {
		await downloader.download(version, gamedir);
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

	launcher.on('debug', (status: string) => {
		event.sender.send('download-progress', status);
	});

	try {
		await launcher.launch({
			username: settings.username, // NOMBRE  USUARIO,
			version: version, // VERSION DE JUEGO - Varía dependiendo de la instalación.
			type: 'vanilla', // neoforge - optifine - fabric
			gameDirectory: gamedir, // RUTA DE JUEGO
			memory: {
				min: `${settings.minMem}M`, // MINIMO DE MEMORIA PARA USAR
				max: `${settings.maxMem}M`, // MAXIMO DE MEMORIA PARA USAR
			},
			java: settings.java21,
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