<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { useCartStore } from './stores/carrito'
import CartPreview from './components/CartPreview.vue'

const cartStore = useCartStore()
const route = useRoute()

// Ocultar la barra lateral izquierda únicamente cuando estamos en la vista completa del carrito
const esVistaCarrito = computed(() => route.path === '/carrito')
</script>

<template>
  <div class="app-layout min-vh-100 bg-light">
    <!-- Navbar moderna estilo e-commerce -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4 shadow-sm sticky-top">
      <div class="container-fluid px-lg-4">
        <RouterLink class="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
          <span class="fs-4">🛍️</span>
          <span>SPA TIENDA</span>
        </RouterLink>

        <div class="navbar-nav flex-row gap-3 ms-auto align-items-center">
          <RouterLink class="nav-link px-2" to="/">Inicio</RouterLink>
          <RouterLink class="nav-link px-2" to="/productos">Productos</RouterLink>
          <RouterLink class="nav-link px-2 d-flex align-items-center gap-1" to="/carrito">
            <span>🛒 Carrito</span>
            <span
              v-if="cartStore.totalArticulos > 0"
              class="badge rounded-pill bg-warning text-dark fw-bold px-2 py-1"
            >
              {{ cartStore.totalArticulos }}
            </span>
          </RouterLink>
        </div>
      </div>
    </nav>

    <!-- Layout principal con vista previa del carrito a la izquierda -->
    <div class="container-fluid px-lg-4 pb-5">
      <!-- Si es la vista completa del carrito, se centra en ancho completo -->
      <div v-if="esVistaCarrito" class="row justify-content-center">
        <div class="col-lg-10 col-xl-8">
          <RouterView />
        </div>
      </div>

      <!-- En las demás vistas (Productos, Inicio, Formularios), muestra la prevista a la izquierda -->
      <div v-else class="row g-4">
        <!-- Columna Izquierda: Vista previa del carrito estilo Amazon / Mercado Libre -->
        <aside class="col-12 col-md-5 col-lg-4 col-xl-3">
          <CartPreview />
        </aside>

        <!-- Columna Derecha: Contenido principal -->
        <main class="col-12 col-md-7 col-lg-8 col-xl-9">
          <RouterView />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-layout {
  background-color: #f5f5f7;
}

.navbar-brand {
  letter-spacing: 0.5px;
}
</style>