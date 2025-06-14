import { app } from "electron";
import os from "node:os"
import { BackendRes, LauncherData } from "../../shared/types.js";
import { mainLogger } from "../services/logger.js";

export async function GetLauncherData(): Promise<BackendRes> {
    try {
        let launcherData = {
            version: app.getVersion(),
            OS: os.platform(),
            OS_version: os.release(),
        } as LauncherData
        return {
            success: true,
            data: launcherData
        }
    } catch(error) {
        mainLogger.error(`Error while obtaining launcher data. ${error}`)
        return {success: false, error: error}
    }
}