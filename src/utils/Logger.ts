import log4js from "log4js";
import { AppPaths } from "./AppPaths.js";
import fs from "node:fs";
import path from "node:path";
import handleCode from "./Api.js";
const paths = new AppPaths();

// Asegurar que existe el directorio de logs
const logDir = paths.getLogDir();
if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir, { recursive: true });
}

// Configuración más eficiente para log4js
log4js.configure({
	appenders: {
		// Salida a archivo por categoría con rotación
		versionManagerFile: {
			type: "file",
			filename: path.join(logDir, "versionManager.log"),
			maxLogSize: 10485760, // 10MB
			backups: 3,
			compress: true,
		},
		mainThreadFile: {
			type: "file",
			filename: path.join(logDir, "mainThread.log"),
			maxLogSize: 10485760, // 10MB
			backups: 3,
			compress: true,
		},
		renderThreadFile: {
			type: "file",
			filename: path.join(logDir, "renderer.log"),
			maxLogSize: 10485760, // 10MB
			backups: 3,
			compress: true,
		},

		// Consola para desarrollo (solo en entorno de desarrollo)
		out: { type: "stdout" },

		// Filtros para niveles de log
		versionManagerFilter: {
			type: "logLevelFilter",
			appender: "versionManagerFile",
			level:
				process.env["NODE_ENV"] === "development"
					? "debug"
					: "info",
		},
		mainThreadFilter: {
			type: "logLevelFilter",
			appender: "mainThreadFile",
			level:
				process.env["NODE_ENV"] === "development"
					? "debug"
					: "info",
		},
		renderThreadFilter: {
			type: "logLevelFilter",
			appender: "renderThreadFile",
			level:
				process.env["NODE_ENV"] === "development"
					? "debug"
					: "info",
		},
		defaultFilter: {
			type: "logLevelFilter",
			appender: "defaultFile",
			level: "info",
		},
	},

	categories: {
		default: {
			// Siempre debe tener al menos un appender
			appenders:
				process.env["NODE_ENV"] === "development"
					? ["out", "defaultFilter"]
					: ["defaultFilter"],
			level: "info",
		},

		versionManager: {
			appenders:
				process.env["NODE_ENV"] === "development"
					? ["versionManagerFilter", "out"]
					: ["versionManagerFilter"],
			level: "debug",
		},

		mainThread: {
			appenders:
				process.env["NODE_ENV"] === "development"
					? ["mainThreadFilter", "out"]
					: ["mainThreadFilter"],
			level: "debug",
		},

		renderThread: {
			appenders:
				process.env["NODE_ENV"] === "development"
					? ["renderThreadFilter", "out"]
					: ["renderThreadFilter"],
			level: "debug",
		},
	},
});

// Exportar loggers por categoría
export const versionLogger = log4js.getLogger(
	"versionManager",
);
export const mainLogger = log4js.getLogger("mainThread");
export const renderLogger =
	log4js.getLogger("renderThread");

// Función para limpiar logs antiguos (más de 7 días)
export async function cleanOldLogs() {
	try {
		const files = fs.readdirSync(logDir);
		const now = Date.now();
		const MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 días

		for (const file of files) {
			const filePath = path.join(logDir, file);
			const stats = fs.statSync(filePath);

			if (now - stats.mtime.getTime() > MAX_AGE) {
				fs.unlinkSync(filePath);
				mainLogger.info(`Removed old log file: ${file}`);
			}
		}
	} catch (error) {
		if (error instanceof Error) {
			handleCode("ERR07", error.message);
		} else {
			handleCode("ERR99", "Unknown error occurred");
		}
	}
}
