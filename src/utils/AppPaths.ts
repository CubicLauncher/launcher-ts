// AppPaths.ts - Gestión de rutas de la aplicación
import appDataPath from 'appdata-path';
import path from 'node:path';

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

	// Métodos para obtener las rutas
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

	/**
	 * Inicializa las rutas de la aplicación
	 * @param {string} customAppName - Nombre personalizado de la aplicación (opcional)
	 */
	constructor(customAppName?: string) {
		this.appName = customAppName || 'cubic';

		// Inicializar rutas base
		const appdata = appDataPath();
		this.AppDir = path.join(appdata, this.appName);

		// Inicializar subdirectorios
		this.configDir = path.join(this.AppDir, 'config');
		this.themesDir = path.join(this.AppDir, 'themes');
		this.gameDir = path.join(this.AppDir, '.minecraft');
		this.logDir = path.join(this.AppDir, 'logs');
		this.localesDir = path.join(this.AppDir, 'locales');
		this.assetsDir = path.join(this.AppDir, 'assets');
		this.tempDir = path.join(this.AppDir, 'temp');
	}
	/**
	 * Obtiene el directorio de configuración
	 * @returns {string} Ruta del directorio de configuración
	 */
	public getConfigDir(): string {
		return this.configDir;
	}

	/**
	 * Obtiene el directorio de temas
	 * @returns {string} Ruta del directorio de temas
	 */
	public getThemesDir(): string {
		return this.themesDir;
	}

	/**
	 * Obtiene el directorio del juego
	 * @returns {string} Ruta del directorio del juego
	 */
	public getGameDir(): string {
		return this.gameDir;
	}

	/**
	 * Obtiene el directorio principal de la aplicación
	 * @returns {string} Ruta del directorio principal
	 */
	public getAppDir(): string {
		return this.AppDir;
	}

	/**
	 * Obtiene el directorio de logs
	 * @returns {string} Ruta del directorio de logs
	 */
	public getLogDir(): string {
		return this.logDir;
	}

	/**
	 * Obtiene el directorio de archivos de idioma
	 * @returns {string} Ruta del directorio de archivos de idioma
	 */
	public getLocalesDir(): string {
		return this.localesDir;
	}

	/**
	 * Obtiene el directorio de assets
	 * @returns {string} Ruta del directorio de assets
	 */
	public getAssetsDir(): string {
		return this.assetsDir;
	}

	/**
	 * Obtiene el directorio temporal
	 * @returns {string} Ruta del directorio temporal
	 */
	public getTempDir(): string {
		return this.tempDir;
	}
}

// Crear instancia única
const appPaths = new AppPaths();

export { appPaths };
export default appPaths;
