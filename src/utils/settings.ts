import appPaths from './AppPaths.js';
import proto from 'protobufjs';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import handleCode from './Api.js';
import type { APIResponse, Settings } from '../types/ApiTypes.js';
import { mainLogger } from './Logger.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const settingsSchemeFile = path.join(
	__dirname,
	'../../src/types/proto/settings.proto',
);
mainLogger.log('Searching protocol buffer file for settings.');
mainLogger.log(settingsSchemeFile);
const settingsScheme = await proto.load(settingsSchemeFile);
const SettingsMessage = settingsScheme.lookupType('cubicmc.Settings');
const filePath = path.resolve(appPaths.getConfigDir(), 'settings.bin');

interface Response {
	success: boolean;
	data: any;
}

export async function newSettings(stngs: Settings): Promise<APIResponse> {
	// Validar la estructura de los settings
	const validationError = SettingsMessage.verify(stngs);
	if (validationError) {
		return handleCode('ERR08', validationError);
	}

	try {
		// Crear el mensaje y convertirlo en un buffer para escribirlo
		const message = SettingsMessage.create(stngs);
		const buffer = SettingsMessage.encode(message).finish();
		await fs.writeFile(filePath, buffer);
		return handleCode('OK04', '');
	} catch (error) {
		// Asegurarse de que error sea un Error tipo
		if (error instanceof Error) {
			return handleCode('ERR06', error.message); // Pasar solo el mensaje de error
		} else {
			return handleCode('ERR06', 'Unknown error occurred');
		}
	}
}

export async function getSettings(): Promise<Response> {
	try {
		// Leer el archivo binario de los settings
		const settingsBin = await fs.readFile(filePath);
		const settings = SettingsMessage.decode(settingsBin);

		// Verificar la validez de los datos
		const verifyError = SettingsMessage.verify(settings);
		if (verifyError) {
			handleCode('ERR06', verifyError);
			return {
				success: false,
				data: verifyError,
			};
		}
		return {
			success: true,
			data: settings.toJSON() as Settings, // Convertirlo a JSON para devolverlo en la estructura correcta
		};
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
