<script setup lang="ts">
import { ref } from 'vue'

const isModalOpen = ref(false)

function toggleModal() {
  isModalOpen.value = !isModalOpen.value
}
</script>

<template>
  <button class="open-btn" @click="toggleModal">Abrir Modal</button>

  <transition name="overlay">
    <div v-show="isModalOpen" class="overlay" @click.self="toggleModal">
      <transition name="modal">
        <div v-show="isModalOpen" class="modal bg-stone-800 border border-stone-600">
          <h1>Hola 👋</h1>
          <p>Test de modal.</p>
          <button class="close-btn" @click="toggleModal">Cerrar</button>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped lang="scss">
/* Overlay fade */
.overlay-enter-from, .overlay-leave-to {
  opacity: 0;
}
.overlay-enter-active, .overlay-leave-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Modal animación entrada */
.modal-enter-from {
  opacity: 0;
  transform: translateY(-300px); /* inicia desde abajo */
}
.modal-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Modal animación salida */
.modal-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.modal-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
.modal-leave-to {
  opacity: 0;
  transform: translateY(-300px); /* sube más al cerrar */
}

/* Overlay */
.overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px);
  z-index: 999;
}

/* Modal */
.modal {
  position: absolute;
  top: 35px;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  color: white;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.1),
    2px 6px 10px rgba(0, 0, 0, 0.15),
    4px 12px 20px rgba(0, 0, 0, 0.2);
}

/* Botón Cerrar */
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

/* Botón Abrir */
.open-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}
.open-btn:hover {
  background-color: #0069d9;
}
</style>
