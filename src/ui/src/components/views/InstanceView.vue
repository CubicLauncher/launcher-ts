<template>
  <div class="flex flex-col h-full bg-stone-900 text-stone-200">
    <!-- Header with instance info -->
    <div class="header-container">
      <div class="header-pattern flex items-center p-6 bg-stone-800 border-b-stone-600 border-b">
        <component :is="iconComponent" class="w-20" />
        <div class="ml-6">
          <h1 class="text-3xl font-bold">{{ instance.name }}</h1>
          <p class="text-stone-400">{{ instance.game.version }}</p>
        </div>
      </div>
    </div>

    <!-- Main content -->
    <div class="flex-1 p-6">
      <!-- Play button section -->
      <button @click="handlePlay"
        class="w-full mb-6 flex items-center justify-center p-4 gap-2 bg-stone-800 rounded-lg 
        border border-stone-600 cursor-pointer hover:bg-stone-700 transition-all"
        :style="{
          color: colors.text
        }"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        </svg>
        <span class="text-lg font-medium">{{ languageStore.getTranslation("Launcher.views.InstanceView.PlayBtn") }}</span>
      </button>

      <!-- Instance details -->
      <div class="bg-stone-800 rounded-lg border border-stone-600">
        <div class="border-b border-stone-600 p-4">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-medium">{{ languageStore.getTranslation("Launcher.views.InstanceView.title") }}</h3>
            <div class="px-2 py-1 rounded bg-stone-700 text-stone-400 text-sm">
              {{ instance.loader.loader }}
            </div>
          </div>
        </div>

        <div class="p-4 space-y-4">
          <!-- Minecraft Version -->
          <div class="flex justify-between items-center">
            <div class="text-stone-400">{{ languageStore.getTranslation("Launcher.views.InstanceView.details.minecraftVersion") }}</div>
            <div class="text-stone-200">{{ instance.game.version }}</div>
          </div>

          <!-- Java Version -->
          <div class="flex justify-between items-center">
            <div class="text-stone-400">{{ languageStore.getTranslation("Launcher.views.InstanceView.details.javaVersion") }}</div>
            <div class="text-stone-200">Java 17</div>
          </div>

          <!-- Last Played -->
          <div class="flex justify-between items-center">
            <div class="text-stone-400">{{ languageStore.getTranslation("Launcher.views.InstanceView.LastPlayed") }}</div>
            <div class="text-stone-200">
              {{
                instance.lastPlayed
                  ? new Date(instance.lastPlayed).toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                  : 'Never'
              }}
            </div>
          </div>

          <!-- Delete button -->
          <div class="pt-4 border-t border-stone-600">
            <button @click="handleDelete"
              class="w-full flex items-center justify-center p-3 gap-2 bg-stone-700 rounded-lg 
              hover:bg-stone-600 hover:text-red-400 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>{{ languageStore.getTranslation("Launcher.views.InstanceView.deleteBtn") }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Instance } from "../../../../shared/types";
import { colors } from "../../lib/themes/colors";
import { useLanguageStore } from "../../stores/LanguageStore";
const languageStore = useLanguageStore();
import { computed } from "vue";
import { getIcon } from "../../lib/utils";

const props = defineProps<{
	instance: Instance;
}>();

const iconComponent = computed(() => getIcon(props.instance.loader.loader));

const handlePlay = () => {
	console.log("Starting instance:", props.instance.name);
	// Agrega lógica para lanzar la instancia aquí
};

const handleDelete = async () => {
	if (confirm(`Are you sure you want to delete ${props.instance.name}?`)) {
		// await store.deleteInstance(props.instance.name);
	}
};
</script>

<style lang="scss" scoped>
.header-pattern {
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0) 0%, rgba(8, 8, 8, 0.651) 70%), url('../../assets/backgrounds/cubicPattern.svg');
  background-repeat: repeat;
  animation: pan 60s linear infinite;
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