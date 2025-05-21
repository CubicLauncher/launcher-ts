import { ipcMain } from "electron/main";
import {
  readSettingsFile,
  writeSettingsFile,
} from "../services/SettingsUtils.js"; // Asegúrate de que esté exportada writeSettingsFile
import { Settings } from "../../shared/types.js";

export async function registerHandlers() {
  ipcMain.handle("get-settings", async () => {
    return await readSettingsFile();
  });

  ipcMain.handle("write-settings", async (_, settings: Settings) => {
    await writeSettingsFile(settings);
    return { success: true };
  });
}
