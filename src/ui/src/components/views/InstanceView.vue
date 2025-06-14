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
      <div class="mb-8">
        <button @click="handlePlay"
          class="w-full py-4 px-8 text-lg font-bold rounded-lg transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer bg-stone-600 PlayBtn"
          :style="{
          color: colors.text
          }"
          >
          {{ languageStore.getTranslation("Launcher.views.InstanceView.PlayBtn") }}
        </button>
      </div>

      <!-- Instance details -->
      <div class="bg-stone-800 rounded-lg overflow-hidden border border-stone-700">
        <div class="p-6 space-y-6">
          <!-- Header section -->
          <div class="flex items-center justify-between border-b border-stone-700 pb-4">
            <div>
              <h3 class="text-xl font-bold bg-gradient-to-r from-stone-200 to-stone-400 bg-clip-text text-transparent">
                {{ languageStore.getTranslation("Launcher.views.InstanceView.title") }}
              </h3>
              <p class="text-stone-500 text-sm mt-1">{{ languageStore.getTranslation("Launcher.views.InstanceView.subtitle") }}</p>
            </div>
            <div class="px-3 py-1 rounded-full bg-stone-700/50 text-stone-400 text-sm">
              {{ instance.loader.loader }}
            </div>
          </div>

          <!-- Details grid -->
          <div class="grid grid-cols-2 gap-6">
            <!-- Left column -->
            <div class="space-y-4">
              <!-- Minecraft Version -->
              <div class="group">
                <div class="text-sm text-stone-500 mb-1">{{ languageStore.getTranslation("Launcher.views.InstanceView.details.minecraftVersion") }}</div>
                <div class="text-stone-300 font-medium group-hover:text-stone-200 transition-colors">
                  {{ instance.game.version }}
                </div>
              </div>

              <!-- Java Version -->
              <div class="group">
                <div class="text-sm text-stone-500 mb-1">{{ languageStore.getTranslation("Launcher.views.InstanceView.details.javaVersion") }}</div>
                <div class="text-stone-300 font-medium group-hover:text-stone-200 transition-colors">
                  Java 17
                </div>
              </div>
            </div>

            <!-- Right column -->
            <div class="space-y-4">
              <!-- Last Played -->
              <div class="group">
                <div class="text-sm text-stone-500 mb-1">{{ languageStore.getTranslation("Launcher.views.InstanceView.LastPlayed") }}</div>
                <div class="text-stone-300 font-medium group-hover:text-stone-200 transition-colors">
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
            </div>
          </div>
        </div>
      </div>

      <!-- Delete button -->
      <div class="mt-6">
        <button @click="handleDelete"
          class="w-full py-3 px-6 text-red-400 font-medium rounded-lg border border-red-400 hover:bg-red-400/10 transition-colors">
          {{ languageStore.getTranslation("Launcher.views.InstanceView.deleteBtn") }}
        </button>
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
  /* Accelerated from 180s to 60s */
  position: relative;
}

.PlayBtn {
  transition-property: all;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
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