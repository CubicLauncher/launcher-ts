<template>
    <BaseModal v-model="rosquilla.isSettingsModalOpen" title="Settings">
      <div class="mt-6 space-y-6">
        <!-- Language Settings -->
        <div class="space-y-2">
          <h3 class="text-lg font-medium text-stone-200">Language</h3>
          <select 
            v-model="languageStore.CurrentLanguage"
            @change="languageStore.setCurrentLanguage(languageStore.CurrentLanguage)"
            class="w-full px-4 py-2 bg-stone-800 text-stone-400 rounded-lg border border-stone-600 focus:outline-none focus:border-stone-400"
          >
            <option v-for="lang in languages" :key="lang.code" :value="lang.code">
              {{ lang.name }}
            </option>
          </select>
        </div>

        <!-- Game Settings -->
        <div class="space-y-2">
          <h3 class="text-lg font-medium text-stone-200">Game Settings</h3>
          <div class="space-y-4">
            <!-- RAM Settings -->
            <div class="flex items-center justify-between">
              <label class="text-stone-400">Allocated RAM</label>
              <div class="flex items-center space-x-2">
                <input 
                  type="range" 
                  v-model="gameSettings.ram"
                  min="1"
                  max="16"
                  class="w-32"
                />
                <span class="text-stone-400 w-12">{{ gameSettings.ram }} GB</span>
              </div>
            </div>

            <!-- Game Directory -->
            <div class="flex items-center justify-between">
              <label class="text-stone-400">Game Directory</label>
              <div class="flex space-x-2">
                <input 
                  type="text" 
                  v-model="gameSettings.gameDirectory"
                  class="px-4 py-2 bg-stone-800 text-stone-400 rounded-lg border border-stone-600 focus:outline-none focus:border-stone-400 w-64"
                  placeholder="C:\Users\...\AppData\Roaming\.minecraft"
                />
                <button class="px-3 py-2 bg-stone-700 text-stone-300 rounded-lg hover:bg-stone-600">
                  Browse
                </button>
              </div>
            </div>

            <!-- Java Settings -->
            <div class="flex items-center justify-between">
              <label class="text-stone-400">Java Path</label>
              <div class="flex space-x-2">
                <input 
                  type="text" 
                  v-model="gameSettings.javaPath"
                  class="px-4 py-2 bg-stone-800 text-stone-400 rounded-lg border border-stone-600 focus:outline-none focus:border-stone-400 w-64"
                  placeholder="Auto-detect"
                />
                <button class="px-3 py-2 bg-stone-700 text-stone-300 rounded-lg hover:bg-stone-600">
                  Browse
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Launcher Settings -->
        <div class="space-y-2">
          <h3 class="text-lg font-medium text-stone-200">Launcher Settings</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <label class="text-stone-400">Keep launcher open while playing</label>
              <input 
                type="checkbox" 
                v-model="launcherSettings.keepOpen"
                class="w-4 h-4 text-blue-600 bg-stone-800 border-stone-600 rounded focus:ring-blue-500"
              />
            </div>
            <div class="flex items-center justify-between">
              <label class="text-stone-400">Check for updates automatically</label>
              <input 
                type="checkbox" 
                v-model="launcherSettings.autoUpdate"
                class="w-4 h-4 text-blue-600 bg-stone-800 border-stone-600 rounded focus:ring-blue-500"
              />
            </div>
            <div class="flex items-center justify-between">
              <label class="text-stone-400">Show news in launcher</label>
              <input 
                type="checkbox" 
                v-model="launcherSettings.showNews"
                class="w-4 h-4 text-blue-600 bg-stone-800 border-stone-600 rounded focus:ring-blue-500"
              />
            </div>
            <div class="flex items-center justify-between">
              <label class="text-stone-400">Show snapshots</label>
              <input 
                type="checkbox" 
                v-model="launcherSettings.showSnapshots"
                class="w-4 h-4 text-blue-600 bg-stone-800 border-stone-600 rounded focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
</template>

<script setup lang="ts">
import { useLanguageStore } from '../../stores/LanguageStore';
import { useLauncherStore } from '../../stores/LauncherStore';
import BaseModal from '../modals/BaseModal.vue';
import { ref } from 'vue';

const rosquilla = useLauncherStore()
const languageStore = useLanguageStore();

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' }
];

const gameSettings = ref({
  ram: 4,
  gameDirectory: '',
  javaPath: '',
  resolution: {
    width: 854,
    height: 480
  }
});

const launcherSettings = ref({
  keepOpen: true,
  autoUpdate: true,
  showNews: true,
  showSnapshots: false
});
</script>