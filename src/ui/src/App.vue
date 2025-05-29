<script setup lang="ts">
import Main from "./components/layout/Main.vue";
import { useLauncherStore } from "./stores/LauncherStore";

const store = useLauncherStore()

</script>

<template>
    <Main />
</template>