import { Downloader, NeutronLauncher } from "cubic-neutron";
import type { DownloadEvent } from "../../shared/types.js";
import appPaths from "../utilities/paths.js";

const downloader = new Downloader(appPaths.gameDir);
const launcher = new NeutronLauncher();

export async function downloadVersion(version: string) {
	downloader.download(version);
}

export async function onDownloadProgress(
	callback: (progress: DownloadEvent) => void,
) {
	downloader.on("percentDownloaded", (percent) => {
		callback({ version: percent.version, percent: percent.percent });
	});
}

export async function launchVersion(version: string) {
	await launcher.launchVersion({
		username: "rosca",
		uuid: "123",
		accessToken: "123",
		minecraftDir: "C:/Users/Santi/AppData/Local/cubic/Data/.minecraft",
		version: version,
		isCracked: true,
		javaPath: "C:/Program Files/Java/jre1.8.0_451/bin/javaw.exe",
	});
}
