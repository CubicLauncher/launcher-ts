import { Loaders } from "../../../shared/types";
import Quilt from "../assets/icons/minecraft/Quilt.vue";
import Fabric from "../assets/icons/minecraft/fabric.vue";
import Vanilla from "../assets/icons/minecraft/vanilla.vue";

const iconMap = {
	[Loaders.Vanilla]: Vanilla,
	[Loaders.Fabric]: Fabric,
	[Loaders.Forge]: Quilt,
	[Loaders.Quilt]: Quilt,
	[Loaders.NeoForge]: Quilt,
} as const;

type LoaderKey = keyof typeof iconMap; // "Vanilla" | "Fabric" | "Forge"

export function getIcon(loader: LoaderKey) {
	return iconMap[loader];
}
