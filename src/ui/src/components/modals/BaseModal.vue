<template>
  <div class="flex justify-center">
    <transition name="modal">
      <div v-show="modelValue" class="modal bg-stone-800 border border-stone-600">
        <header class="modal-header">
          <h2 class="modal-title">{{ title }}</h2>
            <div class="cursor-pointer" @click="$emit('update:modelValue', false)">
              <close class="w-8 h-8"/>
            </div>
        </header>
        <hr />
        <div>
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import close from '../../assets/icons/close.vue';
defineProps<{ modelValue: boolean, title: string }>()
defineEmits(['update:modelValue'])
</script>

<style scoped lang="scss">
/* Overlay fade */
.overlay-enter-from,
.overlay-leave-to {
  opacity: 0;
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Modal animation */
.modal-enter-from {
  opacity: 0;
  transform: translateY(-300px);
}

.modal-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.modal-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-leave-to {
  opacity: 0;
  transform: translateY(-300px);
}

.modal {
  position: absolute;
  top: 35px;
  padding: 1rem 2rem 2rem 2rem;
  border-radius: 0 0 10px 10px;
  max-width: 960px;
  width: 100%;
  color: white;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.1),
    2px 6px 10px rgba(0, 0, 0, 0.15),
    4px 12px 20px rgba(0, 0, 0, 0.2);
  background-color: #2d2d2d;
  display: flex;
  flex-direction: column;
  text-align: center;
}


/* Header */
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 600;
}

/* Close button in header */
.modal-header .close-btn {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  transition: color 0.2s;
}

.modal-header .close-btn:hover {
  color: #ff5f5f;
}

/* Separador */
hr {
  border: none;
  border-top: 1px solid #555;
  margin: 0.5rem 0 1rem;
}

/* Botón Cerrar (ya no necesario abajo, pero lo dejo por si quieres usarlo) */
.close-btn {
  margin-top: 1rem;
  background-color: #ff5f5f;
  color: white;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background-color: #e14e4e;
}
</style>
