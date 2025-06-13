import { Instance, BackendRes, InstanceSchema, CubicError } from "../../shared/types.js";
import { encode } from "@msgpack/msgpack";
import { mainLogger } from "./logger.js";
import z from "zod/v4";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import appPaths from "../utilities/paths.js";


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
        let InstanceDir = path.join(appPaths.InstanceDir, instance.name)
        await mkdir(InstanceDir, { recursive: true});
        const encondedInstance = encode(parseResult.data);
        await writeFile(path.join(InstanceDir, `${instance.name}`), encondedInstance);
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