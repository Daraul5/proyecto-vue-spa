<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
    <div class="container">
      <span class="navbar-brand">Mi Tienda SPA</span>
      <div class="navbar-nav">
        <RouterLink class="nav-link" to="/">Inicio</RouterLink>
        <RouterLink class="nav-link" to="/productos">Productos</RouterLink>
        <RouterLink class="nav-link" to="/carrito">Carrito</RouterLink>
      </div>
    </div>
  </nav>
  <div class="container">
    <RouterView />
  </div>
</template>