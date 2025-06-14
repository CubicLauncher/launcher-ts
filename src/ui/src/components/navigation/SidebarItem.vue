<script setup lang="ts">
import { type Component, ref } from "vue";
import SidebarTooltip from "./SidebarTooltip.vue";

const TooltipShow = ref(false);
const tooltipX = ref(0);
const tooltipY = ref(0);

defineProps<{
	name?: string;
	icon: Component | string;
	onClick?: () => void;
}>();

const showTooltip = (event: MouseEvent) => {
	const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
	tooltipX.value = rect.right + 8;
	tooltipY.value = rect.top + rect.height / 2;
	TooltipShow.value = true;
};

const hideTooltip = () => {
	TooltipShow.value = false;
};

// Helper para verificar si es un string (URL de imagen)
const isImageUrl = (icon: Component | string): icon is string => {
	return typeof icon === "string";
};
</script>

<template>
  <div
    class="flex-shrink-0 flex items-center gap-2 bg-stone-800 rounded-xl p-1 border border-stone-700 cursor-pointer"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    @click="onClick"
  >
    <!-- Renderizar imagen si es string -->
    <img 
      v-if="isImageUrl(icon)" 
      :src="icon" 
      alt="Icon" 
      class="w-10 h-10 rounded-xl" 
    />
    
    <!-- Renderizar componente si no es string -->
    <component 
      v-else 
      :is="icon" 
      class="w-10 h-10 rounded-xl" 
    />

    <transition name="fade">
      <div
        v-if="TooltipShow"
        class="fixed z-50"
        :style="{ left: tooltipX + 'px', top: tooltipY + 'px', transform: 'translateY(-50%)' }"
      >
        <SidebarTooltip :text="name? name : 'Instance'" />
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>