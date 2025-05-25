import { Downloader } from "cubic-neutron";
import appPaths from "../utilities/paths.js";
import { DownloadEvent } from "../../shared/types.js";

export class Launcher {
    static downloader = new Downloader(appPaths.gameDir);
  
    static async downloadVersion(version: string) {
      this.downloader.download(version);
    }
  
    static async onDownloadProgress(callback: (progress: DownloadEvent) => void) {
      this.downloader.on("percentDownloaded", (percent) => {
        callback({ version: percent.version, percent: percent.percent });
      });
    }
  }
  