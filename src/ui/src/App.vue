<script setup lang="ts">
import { onMounted } from "vue";
import Main from "./components/layout/Main.vue";
import { useLauncherStore } from "./stores/LauncherStore";

const store = useLauncherStore();

onMounted(async () => {
	await store.loadInstances();
});
</script>

<template>
    <Main />
</template>