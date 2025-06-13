import esbuild from 'esbuild';
import path from 'path';
import fs from 'fs';
import { esbuildPluginFilePathExtensions } from 'esbuild-plugin-file-path-extensions';

// Función para obtener todos los archivos TS dentro de src, excluyendo preload y ui
function getAllEntries(dir: string, excludePaths: string[]): string[] {
  const entries: string[] = [];
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);

    // Excluir rutas que contengan cualquiera de las rutas de exclusión
    if (excludePaths.some(exclude => fullPath.includes(exclude))) {
      continue;
    }

    if (file.isDirectory()) {
      entries.push(...getAllEntries(fullPath, excludePaths));
    } else if (file.isFile() && file.name.endsWith('.ts')) {
      entries.push(fullPath);
    }
  }
  return entries;
}

async function build() {
  const srcDir = path.resolve(__dirname, 'src');
  const preloadPath = path.resolve(srcDir, 'main/preload.ts');

  // Excluir preload y todo dentro de ui
  const excludePaths = ['main/preload', 'ui'];

  // 1. Build ESM para todos menos preload y ui
  const esmEntries = getAllEntries(srcDir, excludePaths);

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

  // 2. Build CommonJS para preload
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

  console.log('Build completo.');
}

build().catch((e) => {
  console.error(e);
  process.exit(1);
});
