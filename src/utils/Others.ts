import { promises as fs } from "node:fs";
import appPaths from "./AppPaths.js";
import handleCode from "./Api.js";

export async function generateDirs() {
  const dirs: [string] = [""];
  dirs.pop();
  dirs.push(appPaths.getAppDir());
  dirs.push(appPaths.getAssetsDir());
  dirs.push(appPaths.getConfigDir());
  dirs.push(appPaths.getGameDir());
  dirs.push(appPaths.getLocalesDir());
  dirs.push(appPaths.getLogDir());
  dirs.push(appPaths.getTempDir());
  dirs.push(appPaths.getThemesDir());

  for (const dir of dirs) {
    try {
      fs.mkdir(dir, { recursive: true });
    } catch (error: unknown) {
      if (error instanceof Error) {
        handleCode("ERR07", error.message);
      } else {
        // En caso de que no sea un Error, manejamos el error genérico
        handleCode("ERR99", "Unknown error occurred");
      }
    }
  }
}
