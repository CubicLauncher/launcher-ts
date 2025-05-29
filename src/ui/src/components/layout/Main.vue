<template>
    <div class="flex h-screen">
      <!-- Sidebar -->
      <Sidebar />
      <!-- Main Section -->
      <div class="flex flex-col flex-1 overflow-hidden">
        <!-- Titlebar -->
        <Titlebar />
  
        <!-- Main Content -->
        <div class="flex-1 overflow-y-auto bg-stone-950">
          <InstanceView v-if="store.CurrentInstance" :instance="store.CurrentInstance" />
          <HomeView v-else />
        </div>  
      </div>
    </div>
  </template>
  
  <script setup>
  import Sidebar from '../navigation/Sidebar.vue'
  import Titlebar from './Titlebar.vue'
  import { useLauncherStore } from '../../stores/LauncherStore';
  import InstanceView from '../views/InstanceView.vue'
  import HomeView from '../views/HomeView.vue'
  const store = useLauncherStore()
  </script>
