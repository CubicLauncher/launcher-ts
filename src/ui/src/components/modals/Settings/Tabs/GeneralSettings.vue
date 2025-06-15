<template>
    <div class="flex-1 pl-8 pr-6">
        <div class="space-y-6">
            <div class="space-y-4">
                <div class="flex items-center justify-between">
                    <label class="text-stone-400">{{ languageStore.getTranslation('Launcher.settings.general.language') }}</label>
                    <div class="relative">
                        <select 
                            v-model="selectedLanguage"
                            class="appearance-none w-48 px-4 py-2 bg-stone-800 text-stone-400 rounded-lg border border-stone-600 focus:outline-none focus:border-stone-400 pr-10 cursor-pointer"
                        >
                            <option v-for="language in availableLanguages" :value="language.code">{{ language.name }}</option>
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
import { ref, onMounted, watch } from 'vue';
import { useLanguageStore } from '../../../../stores/LanguageStore';

const languageStore = useLanguageStore();
const availableLanguages = ref<{ code: string; name: string }[]>([]);
const selectedLanguage = ref(languageStore.CurrentLanguage);

const fetchLanguages = async () => {
    // @ts-ignore: Vite import.meta.globEager
    const modules = import.meta.glob('../../../../lib/locales/*.json', { eager: true });
    availableLanguages.value = Object.entries(modules).map(([path, mod]: any) => {
        const code = path.match(/([a-zA-Z0-9_-]+)\.json$/)?.[1] || '';
        const name = mod.default?.language?.name || code;
        return {
            code,
            name,
        };
    });
};

onMounted(fetchLanguages);

// Sincroniza el selector con el store automáticamente
watch(
    () => languageStore.CurrentLanguage,
    (newLang) => {
        if (selectedLanguage.value !== newLang) {
            selectedLanguage.value = newLang;
        }
    }
);

// Cambia el idioma automáticamente al cambiar el selector
watch(selectedLanguage, (newLang) => {
    if (languageStore.CurrentLanguage !== newLang) {
        languageStore.setCurrentLanguage(newLang);
    }
});
</script>