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
        <NoInstanceView v-else />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLauncherStore } from "../../stores/LauncherStore";
import AddInstanceModal from "../modals/AddInstanceModal.vue";
import SettingsModal from "../modals/SettingsModal.vue";
import Sidebar from "../navigation/Sidebar.vue";
import InstanceView from "../views/InstanceView.vue";
import NoInstanceView from "../views/NoInstanceView.vue";
import Titlebar from "./Titlebar.vue";
const store = useLauncherStore();
</script>
