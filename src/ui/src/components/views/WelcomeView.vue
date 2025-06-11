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
          class="flex items-center justify-center gap-3 px-6 py-4 rounded-lg bg-stone-800 text-stone-200 hover:bg-stone-700 transition-colors"
        >
          <i class="i-heroicons-plus-circle w-6 h-6"></i>
          <span>{{ languageStore.getTranslation('Launcher.welcome.createNew') }}</span>
        </button>
        <button 
          class="flex items-center justify-center gap-3 px-6 py-4 rounded-lg bg-stone-800 text-stone-200 hover:bg-stone-700 transition-colors"
          @click="selectFirstInstance"
        >
          <i class="i-heroicons-play w-6 h-6"></i>
          <span>{{ languageStore.getTranslation('Launcher.welcome.playRecent') }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLauncherStore } from '../../stores/LauncherStore';
import { useLanguageStore } from '../../stores/LanguageStore';
import logo from '../../assets/logo.svg';

const store = useLauncherStore();
const languageStore = useLanguageStore();

const selectFirstInstance = () => {
  if (store.Instances.length > 0) {
    store.setCurrentInstance(store.Instances[0]);
  }
};
</script> 