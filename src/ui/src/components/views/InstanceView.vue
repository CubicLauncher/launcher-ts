<template>
    <p>
        InstanceView pending
    </p>
    <button class="open-btn" @click="mostrar = true">Abrir Modal</button>
    <BaseModal v-model="mostrar" title="hola">
    </BaseModal>
</template>

<script setup lang="ts">
import type { Instance } from '../../../../shared/types';
import BaseModal from '../modals/BaseModal.vue';
import { ref } from 'vue';

let mostrar = ref(false);

defineProps<{
    instance: Instance
}>()
</script>