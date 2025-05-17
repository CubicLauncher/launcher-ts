// AppPaths.ts - Gestión de rutas de la aplicación
import envPaths from "env-paths";
import path from "node:path";

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

	getConfigDir(): string;
	getThemesDir(): string;
	getGameDir(): string;
	getAppDir(): string;
	getLogDir(): string;
	getLocalesDir(): string;
	getAssetsDir(): string;
	getTempDir(): string;
}

/**
 * Clase que gestiona las rutas de la aplicación
 */
export class AppPaths implements IAppPaths {
	public readonly appName: string;
	public readonly AppDir: string;
	public readonly configDir: string;
	public readonly themesDir: string;
	public readonly gameDir: string;
	public readonly logDir: string;
	public readonly localesDir: string;
	public readonly assetsDir: string;
	public readonly tempDir: string;
	constructor() {
		this.appName = "cubic";

		const paths = envPaths(this.appName, {
			suffix: "",
		});

		this.AppDir = paths.data; // Directorio principal de datos persistentes

		// Subdirectorios dentro del AppDir
		this.configDir = path.join(this.AppDir, "config");
		this.themesDir = path.join(this.AppDir, "themes");
		this.gameDir = path.join(this.AppDir, ".minecraft");
		this.logDir = path.join(this.AppDir, "logs");
		this.localesDir = path.join(this.AppDir, "locales");
		this.assetsDir = path.join(this.AppDir, "assets");
		this.tempDir = path.join(this.AppDir, "temp");
	}

	public getConfigDir(): string {
		return this.configDir;
	}

	public getThemesDir(): string {
		return this.themesDir;
	}

	public getGameDir(): string {
		return this.gameDir;
	}

	public getAppDir(): string {
		return this.AppDir;
	}

	public getLogDir(): string {
		return this.logDir;
	}

	public getLocalesDir(): string {
		return this.localesDir;
	}

	public getAssetsDir(): string {
		return this.assetsDir;
	}

	public getTempDir(): string {
		return this.tempDir;
	}
}

// Crear instancia única
const appPaths = new AppPaths();

export { appPaths };
export default appPaths;
