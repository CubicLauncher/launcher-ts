// AppPaths.ts - Gestión de rutas de la aplicación
import envPaths from "env-paths";
import path from "node:path";
import { readdir } from "node:fs/promises";
/**
 * Interface para las rutas de la aplicación
 */
export interface IAppPaths {
  appName: string;
  AppDir: string;
  configDir: string;
  themesDir: string;
  gameDir: string;
  logDir: string;
  localesDir: string;
  assetsDir: string;
  tempDir: string;
  InstanceDir: string
}

/**
 * Clase que gestiona las rutas de la aplicación
 */
export class AppPaths implements IAppPaths {
  public readonly appName = "cubic";
  public readonly AppDir: string;

  public readonly configDir: string;
  public readonly themesDir: string;
  public readonly gameDir: string;
  public readonly logDir: string;
  public readonly localesDir: string;
  public readonly assetsDir: string;
  public readonly tempDir: string;
  public readonly InstanceDir: string

  constructor() {
    const paths = envPaths(this.appName, { suffix: "" });
    this.AppDir = paths.data;

    this.configDir = path.join(this.AppDir, "config");
    this.themesDir = path.join(this.AppDir, "themes");
    this.gameDir = path.join(this.AppDir, ".minecraft");
    this.logDir = path.join(this.AppDir, "logs");
    this.localesDir = path.join(this.AppDir, "locales");
    this.assetsDir = path.join(this.AppDir, "assets");
    this.tempDir = path.join(this.AppDir, "temp");
    this.InstanceDir = path.join(this.AppDir, 'instances');
  }
}

export async function getAllDirectories(dir: string): Promise<string[]> {
  const subdirs = [];

  // Leer el contenido del directorio
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      subdirs.push(fullPath); // Guardamos este directorio

      // Recursivamente obtener directorios dentro
      const nested = await getAllDirectories(fullPath);
      subdirs.push(...nested);
    }
  }

  return subdirs;
}

// Instancia única
const appPaths = new AppPaths();

export { appPaths };
export default appPaths;
