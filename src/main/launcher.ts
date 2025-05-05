import { Downloader } from 'cubic-neutron';
import appPaths from '../utils/AppPaths.js';
import handleCode from '../utils/Api.js';
const downloader = new Downloader();
const gamedir = appPaths.getGameDir();

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
