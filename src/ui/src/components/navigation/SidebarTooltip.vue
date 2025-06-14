<script setup lang="ts">
defineProps<{
	text: string | null;
}>();
</script>

<template>
  <div
    class="relative ml-2 bg-stone-700 text-white text-xs px-3 py-1 rounded shadow-lg whitespace-nowrap"
  >
    <div class="flex items-center gap-2">
        <span>{{ text? text : "How did u got here?" }}</span>
    </div>
    <!-- Flecha -->
    <div
      class="absolute left-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-8 border-y-transparent border-r-8 border-r-stone-700"
    ></div>
  </div>
</template>
