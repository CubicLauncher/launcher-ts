<template>
  <div class="flex flex-col h-full bg-stone-900 text-stone-200">
    <InstanceHeader :instance="instance" />
    <!-- Main content -->
    <div class="flex-1 p-6">
      <!-- Play button section -->
      <button @click="handlePlay" class="w-full mb-6 flex items-center justify-center p-4 gap-2 bg-stone-800 rounded-lg 
        border border-stone-600 cursor-pointer hover:bg-stone-700 transition-all" :style="{
          color: colors.text
        }">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        </svg>
        <span class="text-lg font-medium">{{ languageStore.getTranslation("Launcher.views.InstanceView.PlayBtn")
          }}</span>
      </button>

      <InstanceDetails :instance="instance" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Instance } from "../../../../shared/types";
import { colors } from "../../lib/themes/colors";
import { useLanguageStore } from "../../stores/LanguageStore";
const languageStore = useLanguageStore();
import InstanceDetails from "./InstanceView/InstanceDetails.vue";
import InstanceHeader from "./InstanceView/InstanceHeader.vue";

const props = defineProps<{
  instance: Instance;
}>();

const handlePlay = () => {
  console.log("Starting instance:", props.instance.name);
  // Agrega lógica para lanzar la instancia aquí
};

// const handleDelete = async () => {
//   if (confirm(`Are you sure you want to delete ${props.instance.name}?`)) {
//     // await store.deleteInstance(props.instance.name);
//   }
// };
</script>