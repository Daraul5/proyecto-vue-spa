<script setup>
import { useProductStore } from '../stores/productos'
import { useCartStore } from '../stores/carrito'
import { useRouter } from 'vue-router'

const productStore = useProductStore()
const cartStore = useCartStore()
const router = useRouter()

const editar = (id) => router.push(`/productos/${id}`)

const confirmarEliminar = (id, nombre) => {
  if (confirm(`¿Estás seguro de que deseas eliminar "${nombre}"?`)) {
    productStore.deleteProducto(id)
  }
}

const getCantidadEnCarrito = (productoId) => {
  const item = cartStore.itemsAgrupados.find(i => i.id === productoId)
  return item ? item.cantidad : 0
}

const getIcono = (nombre) => {
  const n = (nombre || '').toLowerCase()
  if (n.includes('laptop') || n.includes('portátil') || n.includes('computadora')) return '💻'
  if (n.includes('teclado')) return '⌨️'
  if (n.includes('mouse') || n.includes('raton')) return '🖱️'
  if (n.includes('monitor') || n.includes('pantalla')) return '🖥️'
  if (n.includes('audifono') || n.includes('auricular') || n.includes('headset')) return '🎧'
  if (n.includes('celular') || n.includes('telefono') || n.includes('smartphone')) return '📱'
  if (n.includes('camara')) return '📷'
  return '📦'
}

const formatearMoneda = (valor) => {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2
  }).format(valor || 0)
}
</script>

<template>
  <div>
    <!-- Encabezado de la sección -->
    <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
      <div>
        <h2 class="fw-bold mb-1 text-dark">Catálogo de Productos</h2>
        <p class="text-muted small mb-0">Explora los productos disponibles y agrégalos a tu carrito</p>
      </div>
      <button class="btn btn-primary d-flex align-items-center gap-2 shadow-sm" @click="router.push('/productos/crear')">
        <span>➕</span>
        <span>Crear Nuevo Producto</span>
      </button>
    </div>

    <!-- Si no hay productos -->
    <div v-if="productStore.productos.length === 0" class="alert alert-light text-center py-5 border shadow-sm">
      <span class="fs-1 d-block mb-2">📦</span>
      <h5 class="fw-bold text-secondary">No hay productos registrados</h5>
      <p class="text-muted small mb-3">Comienza creando el primer producto para tu tienda.</p>
      <button class="btn btn-primary btn-sm" @click="router.push('/productos/crear')">
        Crear Producto
      </button>
    </div>

    <!-- Cuadrícula de tarjetas de productos -->
    <div v-else class="row g-3">
      <div
        v-for="producto in productStore.productos"
        :key="producto.id"
        class="col-12 col-sm-6 col-xl-4"
      >
        <div class="card product-card h-100 shadow-sm border-0 position-relative">
          <!-- Badge indicador de cantidad en carrito -->
          <span
            v-if="getCantidadEnCarrito(producto.id) > 0"
            class="badge bg-success position-absolute top-0 end-0 m-2 shadow-sm"
          >
            En carrito: {{ getCantidadEnCarrito(producto.id) }}
          </span>

          <div class="card-body d-flex flex-column p-4">
            <!-- Icono / Imagen del producto -->
            <div class="product-icon-container bg-light rounded d-flex align-items-center justify-content-center mb-3">
              <span class="product-emoji">{{ getIcono(producto.nombre) }}</span>
            </div>

            <!-- Título y precio -->
            <h5 class="card-title fw-bold text-dark mb-1 text-truncate" :title="producto.nombre">
              {{ producto.nombre }}
            </h5>
            <div class="fs-4 fw-bold text-danger mb-3">
              {{ formatearMoneda(producto.precio) }}
            </div>

            <!-- Botón principal: Agregar al carrito estilo Amazon/Mercado Libre -->
            <button
              class="btn btn-warning btn-add-cart w-100 fw-bold py-2 mb-3 shadow-sm d-flex justify-content-center align-items-center gap-2"
              @click="cartStore.addAlCarrito(producto)"
            >
              <span>🛒</span>
              <span>Al carrito</span>
            </button>

            <!-- Acciones secundarias: Editar / Eliminar -->
            <div class="mt-auto pt-2 border-top d-flex justify-content-end gap-2">
              <button
                class="btn btn-sm btn-outline-secondary d-flex align-items-center gap-1"
                title="Editar este producto"
                @click="editar(producto.id)"
              >
                <span>✏️</span>
                <span>Editar</span>
              </button>
              <button
                class="btn btn-sm btn-outline-danger d-flex align-items-center gap-1"
                title="Eliminar este producto"
                @click="confirmarEliminar(producto.id, producto.nombre)"
              >
                <span>🗑️</span>
                <span>Eliminar</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  border-radius: 12px;
  background-color: #ffffff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1) !important;
}

.product-icon-container {
  height: 120px;
}

.product-emoji {
  font-size: 3.5rem;
}

.btn-add-cart {
  background-color: #ffd814;
  border-color: #fcd200;
  color: #0f1111;
  border-radius: 20px;
  transition: all 0.15s ease;
}

.btn-add-cart:hover {
  background-color: #f7ca00;
  border-color: #f2ba00;
  transform: scale(1.02);
}

.btn-add-cart:active {
  transform: scale(0.98);
}
</style>