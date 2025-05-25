import { app, BrowserWindow } from "electron";
import path from "node:path";
import { cleanOldLogs, mainLogger } from "./services/logger.js";
import os from "node:os";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";
import { setupAutoUpdater } from "./services/Updater.js";
import { registerHandlers } from "./ipc/handler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let mainWin: BrowserWindow | null = null;

function createMainWindow(): BrowserWindow {
  // Limpiar la referencia anterior si existe
  if (mainWin !== null && !mainWin.isDestroyed()) {
    mainWin.close();
  }

  mainWin = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      webSecurity: true,
      additionalArguments: [
        "--enable-features=ElectronSerialChooser,SharedArrayBuffer",
      ],
    },
    backgroundColor: "#2e2c29",
  });

  // Optimización para renderizado
  mainWin.on("ready-to-show", () => {
    mainWin?.show();
  });

  if (process.env["NODE_ENV"] === "development") {
    // Durante el desarrollo, carga el archivo servido por Vite
    mainWin.loadURL("http://localhost:5173");
  } else {
    // Durante el build, carga el archivo generado
    mainWin.loadFile(path.join(__dirname, "../ui/index.html"));
  }

  // Cerrar la aplicación completamente cuando se cierra la ventana principal
  mainWin.on("closed", () => {
    mainWin = null;
    app.quit();
  });

  return mainWin;
}

app.whenReady().then(async () => {
  setupAutoUpdater({
    owner: "CubicLauncher",
    repo: "CubicLauncher",
    notifyOnUpdates: true,
  });

  try {
    mainLogger.info(
      `Starting CubicMC at ${os.platform()} version ${os.release()} || Release ${app.getVersion()}`,
    );
    registerHandlers();
    createMainWindow();
    // Limpiar logs antiguos en segundo plano
    cleanOldLogs().catch((err) =>
      mainLogger.error(`Error cleaning logs: ${err.message}`),
    );
  } catch (error) {
    mainLogger.error(error);
    app.quit();
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWin === null) {
    createMainWindow();
  }
});
