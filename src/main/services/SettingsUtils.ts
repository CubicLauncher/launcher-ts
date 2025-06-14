import { constants } from "node:fs";
import { access, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { decode, encode } from "@msgpack/msgpack";
import { z } from "zod/v4";
import {
	type BackendRes,
	CubicError,
	type Settings,
	settingsSchema,
} from "../../shared/types.js";
import appPaths from "../utilities/paths.js";
import { mainLogger } from "./logger.js";

const SETTINGS_FILE_LOCATION = path.resolve(appPaths.configDir, "settings.bin");

/**
 * Validates and writes settings to the configuration file
 */
async function writeSettingsFile(settings: Settings): Promise<BackendRes> {
	const parseResult = settingsSchema.safeParse(settings);

	if (!parseResult.success) {
		const treeifiedError = z.treeifyError(parseResult.error);

		mainLogger.error(
			`Error saving settings: ${CubicError.InvalidSettings}
      ${JSON.stringify(treeifiedError)}
      `,
		);

		return {
			success: false,
			errorType: CubicError.InvalidSettings,
			error: treeifiedError.properties,
		};
	}

	try {
		const encodedSettings = encode(parseResult.data);
		await writeFile(SETTINGS_FILE_LOCATION, encodedSettings);

		return {
			success: true,
			data: settings,
		};
	} catch (err: unknown) {
		mainLogger.error("Error saving settings:", err);

		if (err instanceof Error) {
			return {
				success: false,
				errorType: CubicError.GenericFilesystem,
				error: err.message,
			};
		}

		return {
			success: false,
			errorType: CubicError.GenericFilesystem,
			error: err,
		};
	}
}

/**
 * Reads and validates settings from the configuration file
 */
async function readSettingsFile(): Promise<BackendRes> {
	try {
		try {
			await access(SETTINGS_FILE_LOCATION, constants.F_OK);
		} catch {
			return {
				success: false,
				errorType: CubicError.SettingsFileENOENT,
			};
		}

		const settingsFile = await readFile(SETTINGS_FILE_LOCATION);
		const decodedSettings = decode(settingsFile);
		const parseResult = settingsSchema.safeParse(decodedSettings);

		if (parseResult.success) {
			return {
				success: true,
				data: parseResult.data,
			};
		}

		const treeifiedError = z.treeifyError(parseResult.error);
		mainLogger.error(
			`Error reading settings file: ${JSON.stringify(treeifiedError)}`,
		);

		return {
			success: false,
			errorType: CubicError.InvalidInstance,
			error: treeifiedError,
		};
	} catch (err: unknown) {
		mainLogger.error("Error accessing settings file:", err);

		return {
			success: false,
			errorType: CubicError.InvalidInstance,
			error: err,
		};
	}
}

export { readSettingsFile, writeSettingsFile };
