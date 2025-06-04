<script setup lang="ts">
import { ref } from 'vue';
import { noInstanceMessages } from '../../lib/data/noinstance';
import type { INoInstance } from '../../lib/data/noinstance';

const valores = Object.values(noInstanceMessages).map(s => s);

const Mensaje = ref<INoInstance>(valores[Math.floor(Math.random() * valores.length)]);
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <div class="w-24 h-24 mx-auto mb-4 text-stone-400">
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