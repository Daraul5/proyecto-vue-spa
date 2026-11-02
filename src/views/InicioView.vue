<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()

const integrantes = [
  'ELIAS RAZIEL GOMEZ CARRION',
  'REBECA JIMENEZ DIAZ',
  'DAVID RAUL VAZQUEZ YAÑEZ'
]
</script>

<template>
  <div class="welcome-container py-5 px-3">
    <div class="card border-0 shadow-lg rounded-5 p-5 text-center bg-white mx-auto" style="max-width: 700px;">
      
      <!-- Icono principal con fondo decorativo -->
      <div class="hero-icon-wrapper mx-auto mb-4 bg-body-tertiary rounded-circle d-flex align-items-center justify-content-center shadow-sm" style="width: 100px; height: 100px;">
        <span class="fs-1">🛍️</span>
      </div>

      <!-- Título y descripción -->
      <h1 class="fw-bold text-dark display-6 mb-3 tracking-tight">Bienvenido a la SPA de Productos</h1>
      <p class="text-muted mb-4 lead fs-6 mx-auto" style="max-width: 520px;">
        Tienda interactiva con catálogo dinámico, gestión de productos y sincronización en tiempo real con el carrito de compras.
      </p>

      <!-- Tarjeta de integrantes refinada -->
      <div class="card bg-body-tertiary border-0 rounded-4 p-4 mx-auto mb-4 w-100" style="max-width: 480px;">
        <h6 class="text-uppercase text-secondary fw-bold fs-7 mb-3 tracking-wider">
          Integrantes del Proyecto
        </h6>
        <div class="d-flex flex-column gap-2">
          <div 
            v-for="(nombre, index) in integrantes" 
            :key="index"
            class="d-flex align-items-center gap-3 bg-white px-3 py-2.5 rounded-3 shadow-2s"
          >
            <div class="badge-initial bg-dark text-white rounded-circle d-flex align-items-center justify-content-center fw-bold small" style="width: 28px; height: 28px;">
              {{ nombre.charAt(0) }}
            </div>
            <span class="fw-semibold text-dark small text-start">{{ nombre }}</span>
          </div>
        </div>
      </div>

      <!-- Botón de acción principal -->
      <div>
        <button 
          class="btn btn-dark btn-lg px-5 py-3 rounded-pill fw-bold shadow-sm transition-btn border-0"
          @click="router.push('/productos')"
        >
          Explorar Productos y Carrito 
          <span class="ms-2">→</span>
        </button>
      </div>

    </div>
  </div>
</template>

<style scoped>
.tracking-tight {
  letter-spacing: -0.02em;
}
.tracking-wider {
  letter-spacing: 0.05em;
}
.fs-7 {
  font-size: 0.75rem;
}
.shadow-2s {
  box-shadow: 0 1px 2px rgb(0, 0, 0, 0.04);
}
.transition-btn {
  transition: all 0.25s ease-in-out;
  background-color: #0f1111;
  color: #fff;
}
.transition-btn:hover {
  transform: translateY(-2px);
  background-color: #212529;
  box-shadow: 0 6px 15px rgb(0, 0, 0, 0.1) !important;
}
</style>