import { Downloader, NeutronLauncher } from "cubic-neutron";
import type { DownloadEvent } from "../../shared/types.js";
import appPaths from "../utilities/paths.js";

export class Launcher {
	static downloader = new Downloader(appPaths.gameDir);
	static launcher = new NeutronLauncher();

	static async downloadVersion(version: string) {
		this.downloader.download(version);
	}

	static async onDownloadProgress(callback: (progress: DownloadEvent) => void) {
		this.downloader.on("percentDownloaded", (percent) => {
			callback({ version: percent.version, percent: percent.percent });
		});
	}

	static async launchVersion(version: string) {
		await this.launcher.launchVersion({
			username: "rosca",
			uuid: "123",
			accessToken: "123",
			minecraftDir: "C:/Users/Santi/AppData/Local/cubic/Data/.minecraft",
			version: version,
			isCracked: true,
			javaPath: "C:/Program Files/Java/jre1.8.0_451/bin/javaw.exe",
		});
	}
}
