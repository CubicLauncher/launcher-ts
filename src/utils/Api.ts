import { mainLogger } from './Logger.js';

// Tipos de códigos
type CodeType = 'ERR' | 'OK' | 'INF';

// Estructura de un código
interface CodeDefinition {
	type: CodeType;
	template: string; // Usa {field} como marcador de inserción
}

// Diccionario de códigos de estado
const CODE_MAP: Record<string, CodeDefinition> = {
	ERR01: {
		type: 'ERR',
		template: 'No se pudo conectar con el servidor: {field}',
	},
	ERR02: { type: 'ERR', template: 'Archivo no encontrado: {field}' },
	ERR03: { type: 'ERR', template: 'Versión no disponible: {field}' },
	ERR04: { type: 'ERR', template: 'Fallo en la descarga de recursos: {field}' },
	ERR05: { type: 'ERR', template: 'Permisos insuficientes: {field}' },
	ERR06: {
		type: 'ERR',
		template: 'Archivo de configuración corrupto: {field}',
	},
	ERR07: { type: 'ERR', template: 'Error al crear archivo' },
	ERR08: {
		type: 'ERR',
		template: 'Error de validacion de archivo de configuracion.',
	},
	ERR99: { type: 'ERR', template: 'Error desconocido: {field}' },

	OK01: { type: 'OK', template: 'Versión {field} descargada correctamente' },
	OK02: { type: 'OK', template: 'Instancia {field} creada exitosamente' },

	INF01: { type: 'INF', template: 'Iniciando descarga de {field}...' },
	INF02: { type: 'INF', template: 'Verificando integridad de {field}' },
};

// Genera mensaje formateado
function formatMessage(code: string, field: string = '') {
	const def = CODE_MAP[code] || CODE_MAP['ERR99'];
	const message = def.template.replace('{field}', field || '');
	return { code, type: def.type, message };
}

// Función principal de manejo
export default function handleCode(code: string, field: string = '') {
	const { type, message } = formatMessage(code, field);

	switch (type) {
		case 'ERR':
			console.error(`[${code}] ${message}`);
			break;
		case 'OK':
			console.log(`[${code}] ${message}`);
			break;
		case 'INF':
			console.info(`[${code}] ${message}`);
			break;
	}

	logCode(code, message, type);
}

// Registro de eventos según el tipo
function logCode(code: string, message: string, type: CodeType) {
	const timestamp = new Date().toISOString();
	const logMessage = `[LOG ${type}] ${timestamp} - ${code}: ${message}`;

	if (type === 'ERR') {
		mainLogger.error(logMessage);
	} else {
		mainLogger.log(logMessage);
	}
}
