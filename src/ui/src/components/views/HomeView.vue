<script setup lang="ts">
import { colors } from '../../lib/themes/colors';
</script>

<template>
    <div class="p-2" :style="{ backgroundColor: colors.background, color: colors.text }">
        <div class="p-4 rounded">
            <h1 class="text-2xl mb-4">Home View Test</h1>
            <button 
                class="px-4 py-2 rounded" 
                :style="{ backgroundColor: colors.button }"
            >
                Test Button
            </button>
        </div>
    </div>
</template>