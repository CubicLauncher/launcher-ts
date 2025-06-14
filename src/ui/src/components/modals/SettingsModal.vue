<template>
  <BaseModal v-model="rosquilla.isSettingsModalOpen" :title="languageStore.getTranslation('Launcher.settings.title')">
    <div class="flex">
      <!-- Vertical Tabs -->
      <div class="w-56 border-r border-[#272727ff]">
        <nav class="flex flex-col space-y-0.5" aria-label="Tabs">
          <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" :class="[
            activeTab === tab.id
              ? 'bg-[#272727ff] text-[#d6d2d2ff] border-l-2 border-[#78716c]'
              : 'text-[#d6d2d2ff]/60 hover:text-[#d6d2d2ff] hover:bg-[#272727ff]',
            'w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center gap-2'
          ]">
            <i :class="tab.icon" class="w-5 h-5"></i>
            {{ languageStore.getTranslation(`Launcher.settings.tabs.${tab.id}`) }}
          </button>
        </nav>
      </div>

      <!-- Tab Content -->
      <div class="flex-1 pl-8 pr-6">
        <!-- General Settings Tab -->
        <div v-if="activeTab === 'general'" class="space-y-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <label class="text-stone-400">{{ languageStore.getTranslation('Launcher.settings.general.language')
                }}</label>
              <div class="relative">
                <select v-model="languageStore.CurrentLanguage"
                  @change="languageStore.setCurrentLanguage(languageStore.CurrentLanguage)"
                  class="appearance-none w-48 px-4 py-2 bg-stone-800 text-stone-400 rounded-lg border border-stone-600 focus:outline-none focus:border-stone-400 pr-10 cursor-pointer">
                  <option v-for="lang in languages" :key="lang.code" :value="lang.code">
                    {{ lang.name }}
                  </option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-stone-400">
                  <i class="i-heroicons-chevron-down-20-solid w-5 h-5"></i>
                </div>
              </div>
            </div>

            <!-- Launcher Information -->
            <div class="pt-4 border-t border-stone-700">
              <h3 class="text-lg font-medium text-stone-200 mb-4">{{
                languageStore.getTranslation('Launcher.settings.general.about') }}</h3>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-stone-400">{{ languageStore.getTranslation('Launcher.settings.general.version')
                    }}</span>
                  <span class="text-stone-200">1.0.0</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-stone-400">{{ languageStore.getTranslation('Launcher.settings.general.build')
                    }}</span>
                  <span class="text-stone-200">#42</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-stone-400">{{ languageStore.getTranslation('Launcher.settings.general.platform')
                    }}</span>
                  <span class="text-stone-200">{{ getSystemDetails().os }} {{ getSystemDetails().processor.architecture
                    }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Game Settings Tab -->
        <div v-if="activeTab === 'game'" class="space-y-6">
          <div class="space-y-4">
            <!-- RAM Settings -->
            <div class="space-y-4">
              <!-- Minimum RAM -->
              <div class="flex items-center justify-between">
                <label class="text-stone-400">{{ languageStore.getTranslation('Launcher.settings.game.minRam')
                  }}</label>
                <div class="flex items-center space-x-2">
                  <button @click="gameSettings.minRam = Math.max(1, gameSettings.minRam - 1)"
                    class="w-8 h-8 flex items-center justify-center bg-stone-700 hover:bg-stone-600 text-stone-300 rounded-lg transition-colors">
                    -
                  </button>
                  <div
                    class="w-16 h-8 flex items-center justify-center bg-stone-800 text-stone-200 rounded-lg border border-stone-600">
                    {{ gameSettings.minRam }}GB
                  </div>
                  <button @click="gameSettings.minRam = Math.min(16, gameSettings.minRam + 1)"
                    class="w-8 h-8 flex items-center justify-center bg-stone-700 hover:bg-stone-600 text-stone-300 rounded-lg transition-colors">
                    +
                  </button>
                </div>
              </div>

              <!-- Maximum RAM -->
              <div class="flex items-center justify-between">
                <label class="text-stone-400">{{ languageStore.getTranslation('Launcher.settings.game.maxRam')
                  }}</label>
                <div class="flex items-center space-x-2">
                  <button @click="gameSettings.maxRam = Math.max(1, gameSettings.maxRam - 1)"
                    class="w-8 h-8 flex items-center justify-center bg-stone-700 hover:bg-stone-600 text-stone-300 rounded-lg transition-colors">
                    -
                  </button>
                  <div
                    class="w-16 h-8 flex items-center justify-center bg-stone-800 text-stone-200 rounded-lg border border-stone-600">
                    {{ gameSettings.maxRam }}GB
                  </div>
                  <button @click="gameSettings.maxRam = Math.min(16, gameSettings.maxRam + 1)"
                    class="w-8 h-8 flex items-center justify-center bg-stone-700 hover:bg-stone-600 text-stone-300 rounded-lg transition-colors">
                    +
                  </button>
                </div>
              </div>
            </div>

            <!-- Game Directory -->
            <div class="flex items-center justify-between">
              <label class="text-stone-400">{{ languageStore.getTranslation('Launcher.settings.game.gameDirectory')
                }}</label>
              <div class="flex space-x-2">
                <input type="text" v-model="gameSettings.gameDirectory"
                  class="px-4 py-2 bg-stone-800 text-stone-400 rounded-lg border border-stone-600 focus:outline-none focus:border-stone-400 w-64"
                  placeholder="C:\Users\...\AppData\Roaming\.minecraft" readonly />
                <button class="px-3 py-2 bg-stone-700 text-stone-300 rounded-lg hover:bg-stone-600">
                  {{ languageStore.getTranslation('Launcher.settings.game.browse') }}
                </button>
              </div>
            </div>

            <!-- Java Settings -->
            <div class="flex items-center justify-between">
              <label class="text-stone-400">{{ languageStore.getTranslation('Launcher.settings.game.javaPath')
                }}</label>
              <div class="flex space-x-2">
                <input type="text" v-model="gameSettings.javaPath"
                  class="px-4 py-2 bg-stone-800 text-stone-400 rounded-lg border border-stone-600 focus:outline-none focus:border-stone-400 w-64"
                  placeholder="Auto-detect" />
                <button class="px-3 py-2 bg-stone-700 text-stone-300 rounded-lg hover:bg-stone-600">
                  {{ languageStore.getTranslation('Launcher.settings.game.browse') }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Launcher Settings Tab -->
        <div v-if="activeTab === 'launcher'" class="space-y-6">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <label class="text-stone-400">{{ languageStore.getTranslation('Launcher.settings.launcher.keepOpen')
                }}</label>
              <input type="checkbox" v-model="launcherSettings.keepOpen"
                class="w-4 h-4 text-[#4a7b9dff] bg-stone-800 border-stone-600 rounded focus:ring-blue-500" />
            </div>
            <div class="flex items-center justify-between">
              <label class="text-stone-400">{{ languageStore.getTranslation('Launcher.settings.launcher.autoUpdate')
                }}</label>
              <input type="checkbox" v-model="launcherSettings.autoUpdate"
                class="w-4 h-4 text-[#4a7b9dff] bg-stone-800 border-stone-600 rounded focus:ring-blue-500" />
            </div>
          </div>
        </div>

        <!-- Accounts Tab -->
        <div v-if="activeTab === 'accounts'" class="space-y-6">
          <div class="bg-stone-800/30 rounded-lg p-4">
            <div class="flex items-center space-x-4 mb-4">
              <div class="w-16 h-16 rounded-lg bg-stone-700 flex items-center justify-center">
                <i class="i-heroicons-user-circle w-12 h-12 text-stone-500"></i>
              </div>
              <div class="flex-1">
                <h3 class="text-lg font-medium text-stone-200">
                  {{ accountSettings.username || languageStore.getTranslation('Launcher.settings.accounts.noUsername') }}
                </h3>
                <p class="text-stone-400">{{ languageStore.getTranslation('Launcher.settings.accounts.offlineAccount') }}</p>
              </div>
            </div>

            <div class="flex space-x-2">
              <input v-model="accountSettings.username"
                     type="text"
                     class="flex-1 px-4 py-2 bg-stone-800 text-stone-200 rounded-lg border border-stone-600 focus:outline-none focus:border-[#4a7b9dff]"
                     :placeholder="languageStore.getTranslation('Launcher.settings.accounts.usernamePlaceholder')" />
              <button @click="accountSettings.username = ''"
                      v-if="accountSettings.username"
                      class="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                {{ languageStore.getTranslation('Launcher.settings.accounts.clear') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getSystemDetails } from "../../lib/data/os";
import { useLanguageStore } from "../../stores/LanguageStore";
import { useLauncherStore } from "../../stores/LauncherStore";
import BaseModal from "../modals/BaseModal.vue";

const rosquilla = useLauncherStore();
const languageStore = useLanguageStore();

const activeTab = ref("general");

const tabs = [
  { id: "general", name: "General", icon: "i-heroicons-cog-6-tooth" },
  { id: "game", name: "Game", icon: "i-heroicons-gamepad" },
  { id: "launcher", name: "Launcher", icon: "i-heroicons-window" },
  { id: "accounts", name: "Accounts", icon: "i-heroicons-user-circle" },
];

const languages = ref<Array<{ code: string; name: string }>>([]);

// Load available languages from locales directory
const loadLanguages = async () => {
  try {
    const localeFiles = import.meta.glob("../../lib/locales/*.json", {
      eager: true,
    });

    for (const path in localeFiles) {
      const code = path.split("/").pop()?.replace(".json", "") || "";
      if (code) {
        const localeData = localeFiles[path] as any;
        const languageName = localeData.language?.name || code;
        languages.value.push({
          code,
          name: languageName,
        });
      }
    }
  } catch (error) {
    console.error("Error loading languages:", error);
  }
};

// Call loadLanguages when component is mounted
onMounted(() => {
  loadLanguages();
});

const gameSettings = ref({
  minRam: 2,
  maxRam: 4,
  gameDirectory: "",
  javaPath: "",
  minecraftUsername: "",
});

const launcherSettings = ref({
  keepOpen: true,
  autoUpdate: true,
  showNews: true,
  showSnapshots: false,
});

const accountSettings = ref({
  username: ''
});
</script>