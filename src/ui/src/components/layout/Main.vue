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
        <SettingsModal />
        <AddInstanceModal />
        <InstanceView v-if="store.CurrentInstance" :instance="store.CurrentInstance" />
        <WelcomeView v-else />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLauncherStore } from "../../stores/LauncherStore";
import AddInstanceModal from "../modals/AddInstanceModal.vue";
import SettingsModal from "../modals/Settings/SettingsModal.vue";
import Sidebar from "../navigation/Sidebar.vue";
import InstanceView from "../views/InstanceView.vue";
import WelcomeView from "../views/WelcomeView.vue";
import Titlebar from "./Titlebar.vue";
const store = useLauncherStore();
</script>
