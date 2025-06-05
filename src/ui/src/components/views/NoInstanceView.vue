<script setup lang="ts">
import { computed } from 'vue';
import { getNoInstanceMessages } from '../../lib/data/noinstance';
import { useLanguageStore } from '../../stores/LanguageStore';
import { colors } from '../../lib/themes/colors';

const languageStore = useLanguageStore();
const buttonText = computed(() => languageStore.getTranslation('Launcher.noInstance.createButton'));
const noInstanceMessages = computed(() => getNoInstanceMessages());
const valores = computed(() => Object.values(noInstanceMessages.value));
const Mensaje = computed(() => valores.value[Math.floor(Math.random() * valores.value.length)]);

const handleClick = () => {
  // Here you can add the logic to create a new version of Minecraft
  console.log('HandleClick: Yes');
};

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
      <p class="text-base text-stone-400 mb-4">
        {{ Mensaje.description }}
      </p>
      <button 
        @click="handleClick"
        class="px-6 py-2 rounded-md font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-lg active:shadow-inner"
        :style="{
          backgroundColor: colors.button,
          color: colors.text
        }"
      >
        {{ buttonText }}
      </button>
    </div>
  </div>
</template>