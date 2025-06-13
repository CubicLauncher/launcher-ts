<template>
  <div class="flex flex-col h-full bg-stone-900 text-stone-200">
    <!-- Header with instance info -->
    <div class="flex items-center p-6 bg-stone-800">
      <img :src="instance.icon" alt="Instance icon" class="w-24 h-24 rounded-lg">
      <div class="ml-6">
        <h1 class="text-3xl font-bold">{{ instance.name }}</h1>
        <p class="text-stone-400">{{ instance.version }}</p>
      </div>
    </div>

    <!-- Main content -->
    <div class="flex-1 p-6">
      <!-- Play button section -->
      <div class="mb-8">
        <button 
          @click="handlePlay"
          class="w-full py-4 px-8 text-lg font-bold rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
          :style="{
            backgroundColor: colors.button,
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
              <span>{{ instance.version }}</span>
            </div>
            <div class="flex justify-between">
              <span>Loader</span>
              <span>{{ instance.loader || 'Vanilla' }}</span>
            </div>
            <div class="flex justify-between">
              <span>Last played</span>
              <span>{{ instance.lastPlayed || 'Never' }}</span>
            </div>
          </div>
        </div>

        <div class="bg-stone-800 p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-2">System Details</h3>
          <div class="space-y-2 text-stone-400">
            <div class="flex justify-between">
              <span>Memory</span>
              <span>{{ instance.memory || '2GB' }}</span>
            </div>
            <div class="flex justify-between">
              <span>Java Version</span>
              <span>{{ instance.javaVersion || 'Java 17' }}</span>
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

const store = useLauncherStore();
const props = defineProps<{
  instance: Instance
}>();

const handlePlay = () => {
  console.log('Starting instance:', props.instance.name);
  // Add logic to launch the instance
};

const handleDelete = async () => {
  if (confirm(`Are you sure you want to delete ${props.instance.name}?`)) {
    await store.deleteInstance(props.instance.name);
  }
};
</script>