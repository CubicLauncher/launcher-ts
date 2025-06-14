const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

/**
 * Genera un hash basado en los contenidos de todos los archivos en un directorio
 * @param {string} directory - El directorio a escanear
 * @returns {string} - El hash generado
 */
function generateBuildHash(directory) {
	// Almacena los hashes de todos los archivos
	const fileHashes = [];

	// Función recursiva para leer todos los archivos en un directorio y sus subdirectorios
	function processDirectory(dir) {
		const files = fs.readdirSync(dir);

		for (const file of files) {
			const fullPath = path.join(dir, file);
			const stats = fs.statSync(fullPath);

			if (stats.isDirectory()) {
				processDirectory(fullPath);
			} else {
				// Leer el contenido y generar un hash
				const content = fs.readFileSync(fullPath);
				const hash = crypto.createHash("sha256").update(content).digest("hex");
				fileHashes.push({ path: fullPath, hash });
			}
		}
	}

	// Comenzar el procesamiento desde el directorio principal
	try {
		processDirectory(directory);

		// Ordenar los hashes por ruta para garantizar consistencia
		fileHashes.sort((a, b) => a.path.localeCompare(b.path));

		// Combinar todos los hashes en una sola cadena
		const combinedHash = fileHashes.map((item) => item.hash).join("");

		// Generar un hash final
		const finalHash = crypto
			.createHash("sha256")
			.update(combinedHash)
			.digest("hex");

		// Puedes usar el hash completo o solo parte de él (los primeros 8 caracteres son suficientes como número de build)
		return finalHash.substring(0, 8);
	} catch (error) {
		console.error("Error generando build hash:", error);
		return "error";
	}
}

// Ruta al directorio src/main (ajusta según tu estructura de proyecto)
const mainDirectory = path.join(__dirname, "../", "src", "main");

// Generar el hash
const buildHash = generateBuildHash(mainDirectory);

console.log(`Build hash: ${buildHash}`);

// Opcional: Actualizar el package.json con el nuevo hash
const packageJsonPath = path.join(__dirname, "../", "package.json");
const packageJson = require(packageJsonPath);

// Podrías agregarlo como una propiedad separada o incorporarlo a la versión
packageJson.buildHash = buildHash;

const baseVersion = packageJson.version.split(/[+-]/)[0]; // Captura solo MAJOR.MINOR.PATCH
packageJson.version = `${baseVersion}+${buildHash}`;

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
console.log(`Package.json actualizado con build hash: ${buildHash}`);

// Exportar el hash para usarlo en tu aplicación
module.exports = buildHash;
