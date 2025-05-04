import { promises as fs } from 'fs';
import appPaths from './AppPaths';
import handleCode from './Api';

export async function generateDirs() {
	let baseDir = appPaths.getAppDir();
	let dirs: [string] = [''];
	dirs.pop();
	dirs.push(appPaths.getAppDir());
	dirs.push(appPaths.getAssetsDir());
	dirs.push(appPaths.getConfigDir());
	dirs.push(appPaths.getGameDir());
	dirs.push(appPaths.getLocalesDir());
	dirs.push(appPaths.getLogDir());
	dirs.push(appPaths.getTempDir());
	dirs.push(appPaths.getThemesDir());

	dirs.forEach((dir) => {
		try {
			fs.mkdir(dir);
		} catch (error: unknown) {
			if (error instanceof Error) {
				handleCode('ERR07', error.message);
			} else {
				// En caso de que no sea un Error, manejamos el error genérico
				handleCode('ERR99', 'Unknown error occurred');
			}
		}
	});
}
