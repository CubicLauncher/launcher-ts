<script setup lang="ts">
import { ref } from 'vue'
import logo from '../../assets/logo.svg'
import { useLauncherStore } from '../../stores/LauncherStore'
import { useLanguageStore } from '../../stores/LanguageStore'
import Settings from '../../assets/icons/settings.vue'
import PlusSquare from '../../assets/icons/plus-square.vue'

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
      <div class="h-full overflow-y-auto flex flex-col items-center gap-2 scrollbar-hide py-2">
        <!-- Library Items -->
        <div 
          class="w-10 h-10 flex items-center justify-center bg-stone-800 rounded-xl border border-stone-700 cursor-pointer hover:bg-stone-700 transition-colors group relative"
          @click="store.CurrentInstance = null"
          @mouseenter="showTooltip($event, 'Launcher.sidebar.allInstances')"
          @mouseleave="hideTooltip"
        >
          <i class="i-heroicons-squares-2x2 w-6 h-6 text-stone-400"></i>
        </div>

        <div 
          class="w-10 h-10 flex items-center justify-center bg-stone-800 rounded-xl border border-stone-700 cursor-pointer hover:bg-stone-700 transition-colors group relative"
          @mouseenter="showTooltip($event, 'Launcher.sidebar.recent')"
          @mouseleave="hideTooltip"
        >
          <i class="i-heroicons-clock w-6 h-6 text-stone-400"></i>
        </div>

        <!-- Separator -->
        <div class="w-8 h-px bg-stone-700 my-1"></div>

        <!-- Instances -->
        <div 
          v-for="instance in store.Instances" 
          :key="instance.name"
          @click="store.CurrentInstance = instance"
          class="w-10 h-10 flex items-center justify-center rounded-xl border cursor-pointer transition-colors relative"
          :class="[
            store.CurrentInstance?.name === instance.name 
              ? 'bg-stone-700 border-stone-600' 
              : 'bg-stone-800 border-stone-700 hover:bg-stone-700'
          ]"
          @mouseenter="showTooltip($event, '', instance.name)"
          @mouseleave="hideTooltip"
        >
          <img 
            :src="instance.icon" 
            :alt="instance.name" 
            class="w-8 h-8 rounded"
          >
        </div>
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

    <!-- Tooltip -->
    <Teleport to="body">
      <transition name="fade">
        <div
          v-if="tooltipVisible"
          class="fixed z-50 px-3 py-1.5 bg-stone-800 text-stone-200 text-sm rounded shadow-lg whitespace-nowrap"
          :style="{ left: tooltipX + 'px', top: tooltipY + 'px', transform: 'translateY(-50%)' }"
        >
          <div class="flex items-center gap-2">
            <span>{{ tooltipText }}</span>
          </div>
          <!-- Arrow -->
          <div
            class="absolute left-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-r-[6px] border-r-stone-800"
          ></div>
        </div>
      </transition>
    </Teleport>
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