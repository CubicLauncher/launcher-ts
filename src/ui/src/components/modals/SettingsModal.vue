<template>
    <BaseModal v-model="rosquilla.isSettingsModalOpen" title="hola">
      <div class="mt-6">
        <select 
          v-model="languageStore.CurrentLanguage"
          @change="languageStore.setCurrentLanguage(languageStore.CurrentLanguage)"
          class="px-4 py-2 bg-stone-800 text-stone-400 rounded-lg border border-stone-600 focus:outline-none focus:border-stone-400"
        >
          <option v-for="lang in languages" :key="lang.code" :value="lang.code">
            {{ lang.name }}
          </option>
        </select>
      </div>
    </BaseModal>
</template>

<script setup lang="ts">
import { useLanguageStore } from '../../stores/LanguageStore';
import { useLauncherStore } from '../../stores/LauncherStore';
import BaseModal from '../modals/BaseModal.vue';

const rosquilla = useLauncherStore()
const languageStore = useLanguageStore();

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' }
];
</script>