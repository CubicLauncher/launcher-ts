<template>
    <!-- Instance details -->
    <div class="bg-stone-800 rounded-lg border border-stone-600">
        <div class="border-b border-stone-600 p-4">
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-medium">{{ languageStore.getTranslation("Launcher.views.InstanceView.title") }}
                </h3>
                <div class="px-2 py-1 rounded bg-stone-700 text-stone-400 text-sm">
                    {{ instance.loader.loader }}
                </div>
            </div>
        </div>

        <div class="p-4 space-y-4">
            <!-- Minecraft Version -->
            <div class="flex justify-between items-center">
                <div class="text-stone-400">{{
                    languageStore.getTranslation("Launcher.views.InstanceView.details.minecraftVersion") }}</div>
                <div class="text-stone-200">{{ instance.game.version }}</div>
            </div>

            <!-- Java Version -->
            <div class="flex justify-between items-center">
                <div class="text-stone-400">{{
                    languageStore.getTranslation("Launcher.views.InstanceView.details.javaVersion") }}</div>
                <div class="text-stone-200">Java 17</div>
            </div>

            <!-- Last Played -->
            <div class="flex justify-between items-center">
                <div class="text-stone-400">{{ languageStore.getTranslation("Launcher.views.InstanceView.LastPlayed") }}
                </div>
                <div class="text-stone-200">
                    {{
                        instance.lastPlayed
                            ? new Date(instance.lastPlayed).toLocaleString('en-US', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit'
                            })
                            : 'Never'
                    }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type Instance } from '../../../../../shared/types';
import { useLanguageStore } from "../../../stores/LanguageStore";
const languageStore = useLanguageStore();

defineProps<{
    instance: Instance;
}>();
</script>