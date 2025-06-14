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
      <div class="grid grid-cols-2 gap-6">
        <div class="bg-stone-800 p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-2">Version Details</h3>
          <div class="space-y-2 text-stone-400">
            <div class="flex justify-between">
              <span>Minecraft</span>
              <span>{{ instance.game.version }}</span>
            </div>
            <div class="flex justify-between">
              <span>{{ languageStore.getTranslation("Launcher.views.InstanceView.Loader") }}</span>
              <span>{{ instance.loader.loader }}</span>
            </div>
            <div class="flex justify-between">
              <span>{{ languageStore.getTranslation("Launcher.views.InstanceView.LastPlayed") }}</span>
              <span>{{
                instance.lastPlayed
                  ? new Date(instance.lastPlayed).toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })
                  : 'Never'
              }}</span>
            </div>
          </div>
        </div>

        <div class="bg-stone-800 p-4 rounded-lg">
          <h3 class="text-lg font-semibold mb-2">System Details</h3>
          <div class="space-y-2 text-stone-400">
            <div class="flex justify-between">
              <span>Memory</span>
            </div>
            <div class="flex justify-between">
              <span>Java Version</span>
            </div>
            <div class="flex justify-between">
              <span>Resolution</span>
              <span>854x480</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Delete button -->
      <div class="mt-6">
        <button @click="handleDelete"
          class="w-full py-3 px-6 text-red-400 font-medium rounded-lg border border-red-400 hover:bg-red-400/10 transition-colors">
          Delete Instance
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