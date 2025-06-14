import {
	settingsSchema,
	type Settings,
	type BackendRes,
	CubicError,
} from "../../shared/types.js";
import { decode, encode } from "@msgpack/msgpack";
import appPaths from "../utilities/paths.js";
import { access, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { mainLogger } from "./logger.js";
import { z } from "zod/v4";
import { constants } from "node:fs";

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
	} catch (err) {
		mainLogger.error("Error saving settings:", err);

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
		} else {
			const treeifiedError = z.treeifyError(parseResult.error);
			mainLogger.error(
				`Error reading settings file: ${JSON.stringify(treeifiedError)}`,
			);

			return {
				success: false,
				errorType: CubicError.InvalidSettings,
				error: treeifiedError,
			};
		}
	} catch (err) {
		mainLogger.error("Error accessing settings file:", err);

		return {
			success: false,
			errorType: CubicError.GenericFilesystem,
			error: err,
		};
	}
}

export { readSettingsFile, writeSettingsFile };
