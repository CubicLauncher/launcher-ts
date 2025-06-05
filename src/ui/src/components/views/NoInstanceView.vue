<script setup lang="ts">
import { computed } from 'vue';
import { getNoInstanceMessages } from '../../lib/data/noinstance';
import { useLanguageStore } from '../../stores/LanguageStore';

const languageStore = useLanguageStore();
const noInstanceMessages = computed(() => getNoInstanceMessages());
const valores = computed(() => Object.values(noInstanceMessages.value));
const Mensaje = computed(() => valores.value[Math.floor(Math.random() * valores.value.length)]);

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' }
];
</script>

<template>
  <div class="flex items-center justify-center h-full">
    <div class="text-center">
      <div class="w-20 h-20 mx-auto mb-4 text-stone-400">
        <component :is="Mensaje.icon" />
      </div>
      <h1 class="text-2xl text-stone-400 font-semibold">
        {{ Mensaje.message }}
      </h1>
      <p class="text-base text-stone-400">
        {{ Mensaje.description }}
      </p>
      
      <!-- Language Selector -->
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
    </div>
  </div>
</template>