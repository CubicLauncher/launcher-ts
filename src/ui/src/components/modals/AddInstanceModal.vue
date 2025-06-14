<template>
  <BaseModal v-model="store.isAddInstanceModalOpen" :title="languageStore.getTranslation('Launcher.addInstance.title')">
    <div class="space-y-4">
      <!-- Instance Name -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-stone-300">
          {{ languageStore.getTranslation('Launcher.addInstance.name') }}
        </label>
        <input v-model="formData.name" type="text"
          class="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-md text-stone-200 focus:outline-none focus:border-stone-500"
          :placeholder="languageStore.getTranslation('Launcher.addInstance.namePlaceholder')">
      </div>

      <!-- Version Selection -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-stone-300">
          {{ languageStore.getTranslation('Launcher.addInstance.version') }}
        </label>
        <select v-model="formData.version"
          class="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-md text-stone-200 focus:outline-none focus:border-stone-500">
          <option value="" disabled>{{ languageStore.getTranslation('Launcher.addInstance.selectVersion') }}</option>
          <option v-for="version in versions" :key="version.id" :value="version.id">
            {{ version.id }}
          </option>
        </select>
      </div>

      <!-- Loader Selection -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-stone-300">
          {{ languageStore.getTranslation('Launcher.addInstance.loader') }}
        </label>
        <div class="grid grid-cols-3 gap-3">
          <button v-for="loader in loaders" :key="loader.id" @click="formData.loader = loader.id"
            class="flex flex-col items-center p-3 border rounded-md transition-colors" :class="[
              formData.loader === loader.id
                ? 'bg-stone-700 border-stone-500 text-stone-200'
                : 'border-stone-600 text-stone-400 hover:bg-stone-700/50'
            ]">
            <component :is="loader.icon" class="w-8 h-8 mb-2" />
            <span class="text-sm">{{ loader.name }}</span>
          </button>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end gap-3 pt-4">
        <button @click="handleCreate"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!isFormValid">
          {{ languageStore.getTranslation('Launcher.addInstance.create') }}
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Loaders } from "../../../../shared/types";
import type { MinecraftVersion } from "../../../../shared/types";
import { GetVersions } from "../../api";
import QuiltIcon from "../../assets/icons/minecraft/Quilt.vue";
import FabricIcon from "../../assets/icons/minecraft/fabric.vue";
import Vanilla from "../../assets/icons/minecraft/vanilla.vue";
import { useLanguageStore } from "../../stores/LanguageStore";
import { useLauncherStore } from "../../stores/LauncherStore";
import BaseModal from "./BaseModal.vue";

const store = useLauncherStore();
const languageStore = useLanguageStore();
const versions = ref<MinecraftVersion[]>([]);

GetVersions().then((d) => {
	versions.value = d;
});

const loaders = [
	{
		id: Loaders.Vanilla,
		name: "Vanilla",
		icon: Vanilla,
		EnumValue: Loaders.Vanilla,
	},
	{
		id: Loaders.Fabric,
		name: "Fabric",
		icon: FabricIcon,
		EnumValue: Loaders.Fabric,
	},
	{
		id: Loaders.Quilt,
		name: "Quilt",
		icon: QuiltIcon,
		EnumValue: Loaders.Quilt,
	},
];

const formData = ref<{
	name: string;
	version: string;
	loader: keyof typeof Loaders; // o directamente: loader: Loaders
}>({
	name: "",
	version: "",
	loader: Loaders.Vanilla,
});


const isFormValid = computed(() => {
	return formData.value.name && formData.value.version;
});

const handleCreate = () => {
	if (!isFormValid.value) return;

	// Create new instance
	store.addInstance({
		name: formData.value.name,
		game: {
			version: formData.value.version,
		},
		loader: {
			loader: formData.value.loader,
			version: "12",
		},
		lastPlayed: "",
	});

	store.toggleAddInstanceModal();
	formData.value = {
		name: "",
		version: "",
		loader: Loaders.Vanilla,
	};
};
</script>