<script setup lang="ts">
import { ref } from 'vue'
import logo from '../../assets/logo.svg'
import { useLauncherStore } from '../../stores/LauncherStore'
import { useLanguageStore } from '../../stores/LanguageStore'
import Settings from '../../assets/icons/UI/settings.vue'
import PlusSquare from '../../assets/icons/UI/plus-square.vue'
import SidebarItem from './SidebarItem.vue'

const store = useLauncherStore()
const languageStore = useLanguageStore()

// Tooltip logic
const tooltipVisible = ref(false)
const tooltipX = ref(0)
const tooltipY = ref(0)
const tooltipText = ref('')

const showTooltip = (event: MouseEvent, translationKey: string, customText?: string) => {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  tooltipX.value = rect.right + 8
  tooltipY.value = rect.top + rect.height / 2
  tooltipText.value = customText || languageStore.getTranslation(translationKey)
  tooltipVisible.value = true
}

const hideTooltip = () => {
  tooltipVisible.value = false
}
</script>

<template>
  <div class="flex flex-col items-center h-full p-2 border-r border-stone-700">
    <!-- Logo -->
    <div 
      class="flex-shrink-0 flex items-center gap-2 bg-stone-800 rounded-xl p-2 border border-stone-700 mb-4 cursor-pointer"
      @click="store.CurrentInstance = null"
    >
      <img :src="logo" alt="Logo" class="w-8 h-8">
    </div>

    <!-- Main Navigation -->
    <div class="flex-1 w-full relative overflow-hidden">
      <div class="h-full overflow-y-auto flex flex-col items-center gap-2 scrollbar-hide">
        <!-- Separator -->
        <div class="w-8 h-px bg-stone-700 my-1"></div>

        <!-- Instances -->
        <SidebarItem 
          v-for="instance in store.Instances" 
          :key="instance.name"
          :name="instance.name"
          :icon="instance.icon.icon"
          @click="store.CurrentInstance = instance"
        />
      </div>
    </div>

    <!-- Footer -->
    <div class="flex-shrink-0 w-full flex flex-col items-center gap-2">
      <div class="w-8 h-px bg-stone-700 mb-1"></div>
      
      <!-- Add Instance Button -->
      <div 
        class="w-10 h-10 flex items-center justify-center bg-stone-800 rounded-xl border border-stone-700 cursor-pointer hover:bg-stone-700 transition-colors relative"
        @click="store.toggleAddInstanceModal"
        @mouseenter="showTooltip($event, 'Launcher.sidebar.addInstance')"
        @mouseleave="hideTooltip"
      >
        <PlusSquare/>
      </div>

      <!-- Settings Button -->
      <div 
        class="w-10 h-10 flex items-center justify-center bg-stone-800 rounded-xl border border-stone-700 cursor-pointer hover:bg-stone-700 transition-colors relative"
        @click="store.toggleSettingsModel"
        @mouseenter="showTooltip($event, 'Launcher.sidebar.settings')"
        @mouseleave="hideTooltip"
      >
        <Settings />
      </div>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>