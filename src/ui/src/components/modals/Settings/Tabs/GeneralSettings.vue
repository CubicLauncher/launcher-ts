<template>
    <div class="flex-1 pl-8 pr-6">
        <div class="space-y-6">
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <label class="text-stone-400">{{ languageStore.getTranslation('Launcher.settings.general.language') }}</label>
                    <div class="relative">
                        <select 
                            v-model="selectedLanguage"
                            @change="changeLanguage"
                            class="appearance-none w-48 px-4 py-2 bg-stone-800 text-stone-400 rounded-lg border border-stone-600 focus:outline-none focus:border-stone-400 pr-10 cursor-pointer"
                        >
                            <option value="en">English</option>
                            <option value="es">Español</option>
                        </select>
                        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-stone-400">
                            <i class="i-heroicons-chevron-down-20-solid w-5 h-5"></i>
                        </div>
                    </div>
                </div>

                <!-- Launcher Information -->
                <div class="pt-4 border-t border-stone-700">
                    <h3 class="text-lg font-medium text-stone-200 mb-4">{{ languageStore.getTranslation('Launcher.settings.general.about') }}</h3>
                    <div class="space-y-2">
                        <div class="flex justify-between">
                            <span class="text-stone-400">{{ languageStore.getTranslation('Launcher.settings.general.version') }}</span>
                            <span class="text-stone-200">1.0.0</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-stone-400">{{ languageStore.getTranslation('Launcher.settings.general.build') }}</span>
                            <span class="text-stone-200">#1</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-stone-400">{{ languageStore.getTranslation('Launcher.settings.general.platform') }}</span>
                            <span class="text-stone-200">Windows</span>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLanguageStore } from '../../../../stores/LanguageStore';

const languageStore = useLanguageStore();
const selectedLanguage = ref((localStorage.getItem('selectedLanguage') || 'en') as 'en' | 'es');

const changeLanguage = () => {
    languageStore.setCurrentLanguage(selectedLanguage.value);
};
</script>