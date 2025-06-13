<template>
  <div class="flex flex-col h-full bg-stone-900 text-stone-200">
    <!-- Header with instance info -->
    <div class="header-container">
      <div class="header-pattern flex items-center p-6 bg-stone-800 border-b-stone-600 border-b">
        <Fabric  class="w-20"/>
        <div class="ml-6">
          <h1 class="text-3xl font-bold">{{ instance.name }}</h1>
          <p class="text-stone-400">{{ instance.game.version }}</p>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="flex-1 p-6">
      <!-- Play button section -->
      <div class="mb-8">
        <button
          @click="handlePlay"
          class="w-full py-4 px-8 text-lg font-bold rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer bg-stone-600"
          :style="{
            color: colors.text
          }"
        >
          PLAY
        </button>
      </div>

      <!-- Instance details -->
      <div class="grid grid-cols-2 gap-6">
        <div class="bg-stone-800 p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-2">Version Details</h3>
          <div class="space-y-2 text-stone-400">
            <div class="flex justify-between">
              <span>Minecraft</span>
              <span>{{ instance.game.version }}</span>
            </div>
            <div class="flex justify-between">
              <span>Loader</span>
              <span>Fabric</span>
            </div>
            <div class="flex justify-between">
              <span>Last played</span>
              <span
                >{{
                  instance.lastPlayed
                    ? new Date(instance.lastPlayed).toLocaleString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    : 'Never'
                }}</span
              >
            </div>
          </div>
        </div>

        <div class="bg-stone-800 p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-2">System Details</h3>
          <div class="space-y-2 text-stone-400">
            <div class="flex justify-between">
              <span>Memory</span>
              <span>{{ instance.memory }}</span>
            </div>
            <div class="flex justify-between">
              <span>Java Version</span>
              <span>{{ instance.game.java.java17 || 'Java 17' }}</span>
            </div>
            <div class="flex justify-between">
              <span>Resolution</span>
              <span>{{ instance.resolution || '854x480' }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete button -->
      <div class="mt-6">
        <button
          @click="handleDelete"
          class="w-full py-3 px-6 text-red-400 font-medium rounded-lg border border-red-400 hover:bg-red-400/10 transition-colors"
        >
          Delete Instance
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { colors } from '../../lib/themes/colors';
import type { Instance } from '../../../../shared/types';
import { useLauncherStore } from '../../stores/LauncherStore';
import Fabric from '../../assets/icons/minecraft/fabric.vue';

const store = useLauncherStore();
const props = defineProps<{
  instance: Instance;
}>();

const handlePlay = () => {
  console.log('Starting instance:', props.instance.name);
  // Agrega lógica para lanzar la instancia aquí
};

const handleDelete = async () => {
  if (confirm(`Are you sure you want to delete ${props.instance.name}?`)) {
    await store.deleteInstance(props.instance.name);
  }
};
</script>

<style lang="scss" scoped>
.header-pattern {
  background-image: url('../../assets/backgrounds/cubicPattern.svg');
  background-repeat: repeat;
  animation: pan 60s linear infinite; /* Accelerated from 180s to 60s */
  position: relative;
}

@keyframes pan {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 0%;
  }
}

</style>