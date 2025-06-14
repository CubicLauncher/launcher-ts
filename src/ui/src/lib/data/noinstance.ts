import type { Component } from "vue";
import Quilt from "../../assets/icons/minecraft/Quilt.vue";
import FabricIcon from "../../assets/icons/minecraft/fabric.vue";
import { useLanguageStore } from "../../stores/LanguageStore";

export interface INoInstance {
	message: string;
	description: string;
	icon: Component;
}

export const getNoInstanceMessages = (): Record<number, INoInstance> => {
	const languageStore = useLanguageStore();
	const t = languageStore.getTranslation;

	return {
		1: {
			message: t("Launcher.noInstance.1.message"),
			description: t("Launcher.noInstance.1.description"),
			icon: FabricIcon,
		},
		2: {
			message: t("Launcher.noInstance.2.message"),
			description: t("Launcher.noInstance.2.description"),
			icon: Quilt,
		},
		3: {
			message: t("Launcher.noInstance.3.message"),
			description: t("Launcher.noInstance.3.description"),
			icon: FabricIcon,
		},
		4: {
			message: t("Launcher.noInstance.4.message"),
			description: t("Launcher.noInstance.4.description"),
			icon: Quilt,
		},
	};
};
