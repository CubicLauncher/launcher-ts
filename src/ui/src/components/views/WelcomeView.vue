<template>
  <div class="flex items-center justify-center h-full">
    <div class="text-center max-w-2xl">
      <div class="w-24 h-24 mx-auto mb-6">
        <img :src="logo" alt="Logo" class="w-full h-full">
      </div>
      <h1 class="text-3xl text-stone-200 font-bold mb-4">
        {{ languageStore.getTranslation('Launcher.welcome.title') }}
      </h1>
      <p class="text-lg text-stone-400 mb-8">
        {{ languageStore.getTranslation('Launcher.welcome.description') }}
      </p>
      <div class="grid grid-cols-2 gap-6">
        <button 
          @click="store.toggleAddInstanceModal"
          class="flex items-center justify-center p-2 gap-2 bg-stone-800 rounded-xl border border-stone-600 cursor-pointer hover:bg-stone-700 transition-all"
        >
          <PlusSquare />
          <span>{{ languageStore.getTranslation('Launcher.welcome.createNew') }}</span>
        </button>
        <button 
          class="flex items-center justify-center p-2 gap-2 bg-stone-800 rounded-xl border border-stone-600 cursor-pointer hover:bg-stone-700 transition-all"
          @click="selectFirstInstance"
        >
          <controller />
          <span>{{ languageStore.getTranslation('Launcher.welcome.playRecent') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import controller from "../../assets/icons/UI/controller.vue";
import PlusSquare from "../../assets/icons/UI/plus-square.vue";
import logo from "../../assets/logo.svg";
import { useLanguageStore } from "../../stores/LanguageStore";
import { useLauncherStore } from "../../stores/LauncherStore";

const store = useLauncherStore();
const languageStore = useLanguageStore();

const selectFirstInstance = () => {
	if (store.Instances.length > 0) {
		store.setCurrentInstance(store.Instances[0]);
	}
};
</script> 