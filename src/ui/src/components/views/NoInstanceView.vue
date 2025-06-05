<script setup lang="ts">
import { computed } from 'vue';
import { getNoInstanceMessages } from '../../lib/data/noinstance';
import { useLanguageStore } from '../../stores/LanguageStore';

const languageStore = useLanguageStore();
const noInstanceMessages = computed(() => getNoInstanceMessages());
const valores = computed(() => Object.values(noInstanceMessages.value));
const Mensaje = computed(() => valores.value[Math.floor(Math.random() * valores.value.length)]);
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
    </div>
  </div>
</template>