<template>
  <div class="card shadow-sm border-0 rounded-4 p-5 text-center">
    <div class="fs-1 mb-2">🛍️</div>
    <h1 class="fw-bold text-dark mb-3">Bienvenido a la SPA de Productos</h1>
    <p class="text-muted mb-4 lead">
      Tienda interactiva con catálogo, formulario de productos y vista previa dinámica del carrito.
    </p>

    <div class="card bg-light border-0 p-3 mx-auto mb-4" style="max-width: 450px;">
      <h6 class="text-secondary fw-bold mb-2">Integrantes del Proyecto:</h6>
      <p class="mb-1 fw-semibold text-dark">ELIAS RAZIEL GOMEZ CARRION</p>
      <p class="mb-1 fw-semibold text-dark">REBECA JIMENEZ DIAZ</p>
      <p class="mb-0 fw-semibold text-dark">DAVID RAUL VAZQUEZ YAÑEZ</p>
    </div>

    <div>
      <router-link to="/productos" class="btn btn-warning fw-bold px-4 py-3 shadow-sm" style="background-color: #ffd814; border-color: #fcd200; color: #0f1111;">
        Explorar Productos y Probar el Carrito ➔
      </router-link>
    </div>
  </div>
</template>