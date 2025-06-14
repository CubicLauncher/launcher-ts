import esbuild from 'esbuild';
import path from 'path';
import fs from 'fs';
import { esbuildPluginFilePathExtensions } from 'esbuild-plugin-file-path-extensions';

// Función para obtener todos los archivos TS dentro de src, excluyendo preload y ui
function getAllEntries(dir: string, excludePaths: string[]): string[] {
  const entries: string[] = [];
  const files = fs.readdirSync(dir, { withFileTypes: true });

  console.log(`Leyendo directorio: ${dir}`);

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    // Excluir rutas que contengan cualquiera de las rutas de exclusión
    if (excludePaths.some(exclude => fullPath.includes(exclude))) {
      console.log(`Excluyendo: ${fullPath}`);
      continue;
    }

    if (file.isDirectory()) {
      console.log(`Entrando a subdirectorio: ${fullPath}`);
      entries.push(...getAllEntries(fullPath, excludePaths));
    } else if (file.isFile() && file.name.endsWith('.ts')) {
      console.log(`Agregando archivo de entrada: ${fullPath}`);
      entries.push(fullPath);
    }
  }
  return entries;
}

async function build() {
  const srcDir = path.resolve(__dirname, '../', 'src');
  const preloadPath = path.resolve(srcDir, 'main/preload.ts');

  console.log(`Directorio fuente: ${srcDir}`);
  console.log(`Archivo preload: ${preloadPath}`);

  // Excluir preload y todo dentro de ui
  const excludePaths = ['main/preload', 'ui'];
  console.log(`Rutas excluidas: ${JSON.stringify(excludePaths, null, 2)}`);

  // 1. Build ESM para todos menos preload y ui
  const esmEntries = getAllEntries(srcDir, excludePaths);
  console.log('Entradas ESM detectadas:');
  esmEntries.forEach(entry => console.log(` - ${entry}`));

  console.log('Iniciando build ESM...');
  await esbuild.build({
    entryPoints: esmEntries,
    outdir: 'dist',
    bundle: false,
    format: 'esm',
    platform: 'node',
    target: ['node22.16'],
    sourcemap: false,
    minify: true,
    splitting: true,
    outbase: 'src',
    tsconfig: './tsconfig.json',
    plugins: [esbuildPluginFilePathExtensions()]
  });
  console.log('Build ESM completado.');

  // 2. Build CommonJS para preload
  console.log('Iniciando build CommonJS para preload...');
  await esbuild.build({
    entryPoints: [preloadPath],
    outfile: 'dist/main/preload.js',
    bundle: false,
    format: 'cjs',
    platform: 'node',
    target: ['node22.16'],
    sourcemap: false,
    minify: true,
    tsconfig: './tsconfig.json',
  });
  console.log('Build CommonJS para preload completado.');

  console.log('✅ Build completo.');
}

build().catch((e) => {
  console.error('❌ Error durante el build:');
  console.error(e);
  process.exit(1);
});
