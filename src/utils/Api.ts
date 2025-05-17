import { mainLogger } from "./Logger.js";
import type {
	CodeDefinition,
	CodeType,
	APIResponse,
} from "../types/ApiTypes.js";

const defaultDefinition: CodeDefinition = {
	type: "ERR",
	template: "Unknow error",
};

// Diccionario de códigos de estado
const CODE_MAP: Record<string, CodeDefinition> = {
	ERR01: {
		type: "ERR",
		template:
			"No se pudo conectar con el servidor: {field}",
	},
	ERR02: {
		type: "ERR",
		template: "Archivo no encontrado: {field}",
	},
	ERR03: {
		type: "ERR",
		template: "Versión no disponible: {field}",
	},
	ERR04: {
		type: "ERR",
		template: "Fallo en la descarga de recursos: {field}",
	},
	ERR05: {
		type: "ERR",
		template: "Permisos insuficientes: {field}",
	},
	ERR06: {
		type: "ERR",
		template: "Archivo de configuración corrupto: {field}",
	},
	ERR07: {
		type: "ERR",
		template: "Error al crear archivo",
	},
	ERR08: {
		type: "ERR",
		template:
			"Error de validacion de archivo de configuracion.",
	},
	ERR09: {
		type: "ERR",
		template: "Error al descargar la version {field}",
	},
	ERR10: {
		type: "ERR",
		template: "Las notificaciones no estan habilitadas.",
	},
	ERR11: {
		type: "ERR",
		template: "Error al mostrar notificacion: {field}.",
	},
	ERR12: {
		type: "ERR",
		template:
			"Archivo de configuracion reescrito incorrectamente",
	},
	ERR99: {
		type: "ERR",
		template: "Error desconocido: {field}",
	},

	OK01: {
		type: "OK",
		template: "Versión {field} descargada correctamente",
	},
	OK02: {
		type: "OK",
		template: "Instancia {field} creada exitosamente",
	},
	OK03: { type: "OK", template: "Task {field} succeded" },
	OK04: {
		type: "OK",
		template:
			"Archivo de configuracion pasado correctamente",
	},
	OK05: {
		type: "OK",
		template:
			"Archivo de configuracion reescrito correctamente.",
	},

	INF01: {
		type: "INF",
		template: "Iniciando descarga de {field}...",
	},
	INF02: {
		type: "INF",
		template: "Iniciando version {field}...",
	},
};

// Tipo para los códigos válidos
type ValidCode = keyof typeof CODE_MAP;

// Verifica si un código existe en el mapa
function isValidCode(code: string): code is ValidCode {
	return code in CODE_MAP;
}

// Genera mensaje formateado
function formatMessage(code: string, field: string) {
	// Verifica si el código existe o usa el código de error por defecto
	const safeCode = isValidCode(code) ? code : "ERR99";
	const def = CODE_MAP[safeCode] || defaultDefinition;

	// Reemplaza el marcador de posición con el campo proporcionado
	const message = def.template.replace("{field}", field);

	return { code: safeCode, type: def.type, message };
}

// Función principal de manejo
export default function handleCode(
	code: string,
	field: string,
) {
	const {
		type,
		message,
		code: safeCode,
	} = formatMessage(code, field);

	switch (type) {
		case "ERR":
			console.error(`[${safeCode}] ${message}`);
			break;
		case "OK":
			console.log(`[${safeCode}] ${message}`);
			break;
		case "INF":
			console.info(`[${safeCode}] ${message}`);
			break;
	}

	logCode(safeCode, message, type);
	return {
		type: type,
		safeCode: safeCode,
		message: message,
	} as APIResponse;
}

// Registro de eventos según el tipo
function logCode(
	code: string,
	message: string,
	type: CodeType,
) {
	const timestamp = new Date().toISOString();
	const logMessage = `[LOG ${type}] ${timestamp} - ${code}: ${message}`;

	if (type === "ERR") {
		mainLogger.error(logMessage);
	} else {
		mainLogger.log(logMessage);
	}
}
