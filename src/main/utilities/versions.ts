import axios from "axios";
import { VersionManifest, MinecraftVersion } from "../../shared/types";

const VERSION_MANIFEST_URL = "https://piston-meta.mojang.com/mc/game/version_manifest_v2.json";

export async function getVersions(): Promise<VersionManifest> {
    const response = await axios.get(VERSION_MANIFEST_URL);
    const versions = response.data.versions as MinecraftVersion[];

    const filteredVersions = versions.filter((version) =>
        version.type === "release" || version.type === "snapshot"
    );

    return {
        latest: response.data.latest,
        versions: filteredVersions,
    };
}
