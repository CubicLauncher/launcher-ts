import { app, dialog } from 'electron';
import electronUpdater from 'electron-updater';
import { mainLogger } from './Logger.js';

/**
 * Configura el electron-updater para actualizar la aplicación desde un repositorio público de GitHub
 *
 * @param options Opciones de configuración para el actualizador
 */
export function setupAutoUpdater(options: {
	owner: string; // Nombre de usuario o organización en GitHub
	repo: string; // Nombre del repositorio
	notifyOnUpdates?: boolean; // Si se debe notificar al usuario sobre las actualizaciones
	autoDownload?: boolean; // Si se deben descargar automáticamente las actualizaciones
	autoInstallOnAppQuit?: boolean; // Si se debe instalar automáticamente al salir de la aplicación
}) {
	const { autoUpdater } = electronUpdater;
	// Configurar log para electron-updater
	autoUpdater.logger = mainLogger;

	// Configurar opciones para GitHub
	autoUpdater.setFeedURL({
		provider: 'github',
		owner: options.owner,
		repo: options.repo,
		// Si es un repositorio privado, necesitarías un token
		// private: true,
		// token: 'tu-token-de-github'
	});

	// Configurar opciones de comportamiento
	autoUpdater.autoDownload = options.autoDownload !== false;
	autoUpdater.autoInstallOnAppQuit = options.autoInstallOnAppQuit !== false;

	// Manejo de eventos
	autoUpdater.on('checking-for-update', () => {
		mainLogger.info('Buscando actualizaciones...');
	});

	autoUpdater.on('update-available', (info) => {
		mainLogger.info('Actualización disponible:', info);

		if (options.notifyOnUpdates) {
			dialog.showMessageBox({
				type: 'info',
				title: 'Actualización disponible',
				message: `La versión ${info.version} está disponible para descargar.`,
				buttons: ['Aceptar'],
			});
		}
	});

	autoUpdater.on('update-not-available', (info) => {
		mainLogger.info('No hay actualizaciones disponibles:', info);
	});

	autoUpdater.on('error', (err) => {
		mainLogger.error('Error al actualizar:', err);
	});

	autoUpdater.on('download-progress', (progressObj) => {
		let logMessage = `Velocidad: ${progressObj.bytesPerSecond} - Descargado ${progressObj.percent}% (${progressObj.transferred}/${progressObj.total})`;
		mainLogger.info(logMessage);
	});

	autoUpdater.on('update-downloaded', (info) => {
		mainLogger.info('Actualización descargada:', info);

		dialog
			.showMessageBox({
				type: 'info',
				title: 'Actualización lista',
				message: `La versión ${info.version} ha sido descargada y se instalará al reiniciar la aplicación.`,
				buttons: ['Reiniciar ahora', 'Más tarde'],
			})
			.then((returnValue) => {
				if (returnValue.response === 0) {
					autoUpdater.quitAndInstall();
				}
			});
	});

	// Verificar actualizaciones después de que la app esté lista
	app.whenReady().then(() => {
		// Esperar un poco antes de verificar las actualizaciones para no afectar el tiempo de inicio
		setTimeout(() => {
			autoUpdater.checkForUpdates();
		}, 3000);
	});

	// Configurar verificación periódica (cada 4 horas)
	setInterval(
		() => {
			autoUpdater.checkForUpdates();
		},
		4 * 60 * 60 * 1000,
	);
}
