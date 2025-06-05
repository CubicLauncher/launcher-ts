<script setup lang="ts">
import SidebarItem from "./SidebarItem.vue";
import logo from '../../assets/logo.svg'
import settings from '../../assets/icons/settings.vue'
import { useLauncherStore } from '../../stores/LauncherStore'

const store = useLauncherStore()

const items = store.Instances.map((instance) => {
    return {
        name: instance.name,
        icon: instance.icon,
        onClick: () => store.CurrentInstance = instance
    }
})
</script>

<template>
    <div class="flex flex-col items-center h-full p-2 border-r border-stone-700">
        <div class="flex-shrink-0 flex items-center gap-2 bg-stone-800 rounded-xl p-2 border border-stone-700 mb-4 cursor-pointer"
            @click="store.CurrentInstance = null">
            <img :src="logo" alt="Logo" class="w-8 h-8">
        </div>

        <div class="flex-1 w-full relative overflow-hidden">
            <div class="h-full overflow-y-auto flex flex-col items-center gap-4 scrollbar-hide py-2">
                <SidebarItem v-for="item in items" :key="item.name" :name="item.name" :icon="item.icon"
                    :onClick="item.onClick" />
            </div>
        </div>

        <div class="flex-shrink-0 w-full flex flex-col items-center">
            <div class="mx-4 my-2 w-full">
                <div class="h-px bg-stone-700"></div>
            </div>
            <div class="bg-stone-800 p-1 rounded-xl border border-stone-700" @click="store.toggleSettingsModel">
                <SidebarItem name="Settings" :icon="settings" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.scrollbar-hide {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari and Opera */
}
</style>