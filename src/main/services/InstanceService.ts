import path from "path";
import { decode, encode } from "@msgpack/msgpack";
import { mkdir, readFile, writeFile } from "fs/promises";
import z from "zod/v4";
import {
	type BackendRes,
	CubicError,
	type Instance,
	InstanceSchema,
} from "../../shared/types.js";
import { appPaths, getAllDirectories } from "../utilities/paths.js";
import { mainLogger } from "./logger.js";

/**
 * Validates and writes settings to the configuration file
 */
export async function WriteInstance(instance: Instance): Promise<BackendRes> {
	const parseResult = InstanceSchema.safeParse(instance);

	if (!parseResult.success) {
		const treeifiedError = z.treeifyError(parseResult.error);

		mainLogger.error(
			`Error saving settings: ${CubicError.InvalidInstance}
      ${JSON.stringify(treeifiedError)}
      `,
		);

		return {
			success: false,
			errorType: CubicError.InvalidInstance,
			error: treeifiedError.properties,
		};
	}

	try {
		const InstanceDir = path.join(appPaths.InstanceDir, instance.name);
		await mkdir(InstanceDir, { recursive: true });
		const encondedInstance = encode(parseResult.data);
		await writeFile(path.join(InstanceDir, `instance.cin`), encondedInstance);
		return {
			success: true,
			data: instance,
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

export async function getInstances(): Promise<BackendRes> {
	const instances: Instance[] = [];

	let instanceDirs: string[];

	try {
		instanceDirs = await getAllDirectories(appPaths.InstanceDir);
	} catch (err) {
		mainLogger.error("Failed to list instance directories:", err);
		return {
			success: false,
			errorType: CubicError.GenericFilesystem,
			error: err,
		};
	}

	for (const dir of instanceDirs) {
		const filePath = path.resolve(dir, "instance.cin");

		try {
			const content = await readFile(filePath);
			const decoded = decode(content);

			const result = await InstanceSchema.safeParseAsync(decoded);

			if (!result.success) {
				const fallbackName = (decoded as any)?.name ?? "unknown";
				const parsedError = z.treeifyError(result.error).properties;

				mainLogger.error(
					`Invalid instance "${fallbackName}" in ${filePath}`,
					parsedError,
				);

				return {
					success: false,
					errorType: CubicError.InvalidInstance,
					error: parsedError,
				};
			}

			instances.push(result.data);
		} catch (err) {
			mainLogger.error(`Failed to load instance from ${filePath}:`, err);
			return {
				success: false,
				errorType: CubicError.InstanceFileENOENT,
				error: err,
			};
		}
	}

	return {
		success: true,
		data: instances,
	};
}
