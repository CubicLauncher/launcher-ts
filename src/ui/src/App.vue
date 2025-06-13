<script setup lang="ts">
import Main from "./components/layout/Main.vue";
import { useLauncherStore } from "./stores/LauncherStore";
import { onMounted } from "vue";

const store = useLauncherStore();

onMounted(async () => {
  await store.loadInstances();
});
</script>

<template>
    <Main />
</template>