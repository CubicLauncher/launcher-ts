import appPaths from './AppPaths';
import proto from 'protobufjs';
import { promises as fs } from 'fs';
import path from 'path';
import handleCode from './Api.js';

const settingsScheme = await proto.load('./src/types/proto/settings.proto');
const SettingsMessage = settingsScheme.lookupType('cubicmc.Settings');
const filePath = path.resolve(appPaths.getConfigDir(), 'settings.bin');

interface Settings {
	username: string;
	gamedir: string;
	theme: string;
	java8: string;
	java17: string;
	java21: string;
	autoupdate: boolean;
	minMem: number;
	maxMem: number;
}

interface Response {
	success: boolean;
	data: any;
}

export async function newSettings(stngs: Settings): Promise<void> {
	// Validar la estructura de los settings
	const validationError = SettingsMessage.verify(stngs);
	if (validationError) {
		handleCode('ERR08', validationError);
		return;
	}

	try {
		// Crear el mensaje y convertirlo en un buffer para escribirlo
		const message = SettingsMessage.create(stngs);
		const buffer = SettingsMessage.encode(message).finish();
		await fs.writeFile(filePath, buffer);
	} catch (error) {
		// Asegurarse de que error sea un Error tipo
		if (error instanceof Error) {
			handleCode('ERR06', error.message); // Pasar solo el mensaje de error
		} else {
			handleCode('ERR06', 'Unknown error occurred');
		}
	}
}

export async function getSettings(): Promise<Response> {
	try {
		// Leer el archivo binario de los settings
		const settingsBin = await fs.readFile(filePath);
		let settings = SettingsMessage.decode(settingsBin);

		// Verificar la validez de los datos
		let verifyError = SettingsMessage.verify(settings);
		if (verifyError) {
			handleCode('ERR06', verifyError);
			return {
				success: false,
				data: verifyError,
			};
		} else {
			return {
				success: true,
				data: settings.toJSON() as Settings, // Convertirlo a JSON para devolverlo en la estructura correcta
			};
		}
	} catch (error) {
		// Asegurarse de que error sea un Error tipo
		if (error instanceof Error) {
			handleCode('ERR08', error.message);
		} else {
			handleCode('ERR08', 'Unknown error occurred');
		}
		return {
			success: false,
			data: error instanceof Error ? error.message : 'Unknown error occurred',
		};
	}
}
