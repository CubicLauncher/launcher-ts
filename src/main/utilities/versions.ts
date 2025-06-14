import axios from "axios";
import { MinecraftVersion, BackendRes } from "../../shared/types";

const VERSION_MANIFEST_URL =
	"https://piston-meta.mojang.com/mc/game/version_manifest_v2.json";

export async function getVersions(): Promise<BackendRes> {
	const response = await axios.get(VERSION_MANIFEST_URL);
	const versions = response.data.versions as MinecraftVersion[];

	const filteredVersions = versions.filter(
		(version) => version.type === "release" || version.type === "snapshot",
	);

	return {
		success: true,
		data: {
			latest: response.data.latest,
			versions: filteredVersions,
		},
	} as BackendRes;
}
