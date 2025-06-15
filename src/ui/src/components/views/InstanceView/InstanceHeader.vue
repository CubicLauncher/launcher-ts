<template>
    <div class="header-container">
      <div class="header-pattern flex items-center p-6 bg-stone-800 border-b-stone-600 border-b">
        <component :is="iconComponent" class="w-20" />
        <div class="ml-6">
          <h1 class="text-3xl font-bold">{{ instance.name }}</h1>
          <p class="text-stone-400">{{ instance.game.version }}</p>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import type { Instance } from "../../../../../shared/types";
import { computed } from "vue";
import { getIcon } from "../../../lib/utils";

const props = defineProps<{
	instance: Instance;
}>();

const iconComponent = computed(() => getIcon(props.instance.loader.loader));
</script>

<style lang="scss" scoped>
.header-pattern {
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0) 0%, rgba(8, 8, 8, 0.651) 70%), url('../../../assets/backgrounds/cubicPattern.svg');
  background-repeat: repeat;
  animation: pan 60s linear infinite;
  position: relative;
}

@keyframes pan {
  0% {
    background-position: 0% 0%;
  }

  100% {
    background-position: 100% 0%;
  }
}
</style>