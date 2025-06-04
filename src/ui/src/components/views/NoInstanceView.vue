<script setup lang="ts">
import { ref } from 'vue';

// 1. Define una interfaz para los valores del saludo
interface ISaludo {
    message: string;
    description: string
}

const saludos: Record<number, ISaludo> = {
    1: { message: "Parece que no tienes instancias descargadas.", description: "Descarga una aquí!" },
    2: { message: "Ejemplo 2", description: "Ejemplo 2" },
    3: { message: "Ejemplo 3", description: "Ejemplo 3" },
};

const valores = Object.values(saludos).map(s => s);

const Saludo = ref(valores[Math.floor(Math.random() * valores.length)]);
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <h1 class="text-2xl text-stone-400 font-semibold">
        {{ Saludo.message }}
      </h1>
      <p class="text-base text-stone-400">
        {{ Saludo.description }}
      </p>
    </div>
  </div>
</template>