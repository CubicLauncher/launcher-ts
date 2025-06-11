<template>
  <BaseModal v-model="store.isAddInstanceModalOpen" :title="languageStore.getTranslation('Launcher.addInstance.title')">
    <div class="mt-6 space-y-6">
      <!-- Instance Name -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-stone-300">
          {{ languageStore.getTranslation('Launcher.addInstance.name') }}
        </label>
        <input
          v-model="formData.name"
          type="text"
          class="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-md text-stone-200 focus:outline-none focus:border-stone-500"
          :placeholder="languageStore.getTranslation('Launcher.addInstance.namePlaceholder')"
        >
      </div>

      <!-- Version Selection -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-stone-300">
          {{ languageStore.getTranslation('Launcher.addInstance.version') }}
        </label>
        <select
          v-model="formData.version"
          class="w-full px-3 py-2 bg-stone-700 border border-stone-600 rounded-md text-stone-200 focus:outline-none focus:border-stone-500"
        >
          <option value="" disabled>{{ languageStore.getTranslation('Launcher.addInstance.selectVersion') }}</option>
          <option v-for="version in versions" :key="version" :value="version">
            {{ version }}
          </option>
        </select>
      </div>

      <!-- Loader Selection -->
      <div class="space-y-2">
        <label class="block text-sm font-medium text-stone-300">
          {{ languageStore.getTranslation('Launcher.addInstance.loader') }}
        </label>
        <div class="grid grid-cols-3 gap-3">
          <button
            v-for="loader in loaders"
            :key="loader.id"
            @click="formData.loader = loader.id"
            class="flex flex-col items-center p-3 border rounded-md transition-colors"
            :class="[
              formData.loader === loader.id
                ? 'bg-stone-700 border-stone-500 text-stone-200'
                : 'border-stone-600 text-stone-400 hover:bg-stone-700/50'
            ]"
          >
            <component :is="loader.icon" class="w-8 h-8 mb-2" />
            <span class="text-sm">{{ loader.name }}</span>
          </button>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end gap-3 pt-4">
        <button
          @click="store.toggleAddInstanceModal"
          class="px-4 py-2 text-stone-300 hover:text-stone-200"
        >
          {{ languageStore.getTranslation('Launcher.addInstance.cancel') }}
        </button>
        <button
          @click="handleCreate"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="!isFormValid"
        >
          {{ languageStore.getTranslation('Launcher.addInstance.create') }}
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import BaseModal from './BaseModal.vue';
import { useLauncherStore } from '../../stores/LauncherStore';
import { useLanguageStore } from '../../stores/LanguageStore';
import FabricIcon from '../../assets/icons/fabric.vue';
import QuiltIcon from '../../assets/icons/Quilt.vue';

const store = useLauncherStore();
const languageStore = useLanguageStore();

// Mock data - replace with actual data from your backend
const versions = ['1.20.4', '1.20.2', '1.19.4', '1.19.2', '1.18.2', '1.17.1', '1.16.5'];
const loaders = [
  { id: 'vanilla', name: 'Vanilla', icon: 'i-heroicons-cube-transparent' },
  { id: 'fabric', name: 'Fabric', icon: FabricIcon },
  { id: 'quilt', name: 'Quilt', icon: QuiltIcon }
];

const formData = ref({
  name: '',
  version: '',
  loader: 'vanilla',
  minMemory: 2048,
  maxMemory: 4096
});

const isFormValid = computed(() => {
  return formData.value.name && 
         formData.value.version && 
         formData.value.minMemory > 0 && 
         formData.value.maxMemory >= formData.value.minMemory;
});

const handleCreate = () => {
  if (!isFormValid.value) return;

  // Create new instance
  store.addInstance({
    name: formData.value.name,
    version: formData.value.version,
    loader: formData.value.loader,
    modded: formData.value.loader !== 'vanilla',
    icon: formData.value.loader === 'vanilla' 
      ? '/path/to/vanilla/icon.png' 
      : `/path/to/${formData.value.loader}/icon.png`,
    java: {
      java8: '',
      java17: '',
      java21: ''
    },
    memory: `${formData.value.minMemory}-${formData.value.maxMemory}MB`,
    lastPlayed: '',
    javaVersion: 'Java 17',
    resolution: '854x480'
  });

  // Close modal and reset form
  store.toggleAddInstanceModal();
  formData.value = {
    name: '',
    version: '',
    loader: 'vanilla',
    minMemory: 2048,
    maxMemory: 4096
  };
};
</script> 