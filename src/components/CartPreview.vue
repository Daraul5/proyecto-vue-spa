<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/carrito'

const cartStore = useCartStore()
const router = useRouter()

// Asigna un icono representativo según el nombre del producto
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

const irAlCarrito = () => {
  router.push('/carrito')
}
</script>

<template>
  <div class="cart-preview card shadow-sm border-0 sticky-top">
    <!-- Encabezado estilo Mercado Libre / Amazon -->
    <div class="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center gap-2">
        <span class="fs-4">🛒</span>
        <div>
          <h6 class="mb-0 fw-bold text-dark">Mi Carrito</h6>
          <small class="text-muted">Vista previa</small>
        </div>
      </div>
      <span class="badge rounded-pill bg-warning text-dark px-2 py-1 fw-bold">
        {{ cartStore.totalArticulos }} {{ cartStore.totalArticulos === 1 ? 'artículo' : 'artículos' }}
      </span>
    </div>

    <div class="card-body p-3">
      <!-- Notificación animada de producto recién agregado -->
      <transition name="fade">
        <div
          v-if="cartStore.ultimoAgregado"
          class="alert alert-success d-flex align-items-center gap-2 py-2 px-3 mb-3 shadow-sm border-0"
          role="alert"
        >
          <span class="fs-5">✅</span>
          <div class="small lh-sm text-truncate">
            <strong class="d-block text-success">¡Agregado al carrito!</strong>
            <span class="text-dark">{{ cartStore.ultimoAgregado.nombre }}</span>
          </div>
        </div>
      </transition>

      <!-- Estado cuando el carrito tiene productos -->
      <div v-if="cartStore.itemsAgrupados.length > 0">
        <!-- Resumen de Subtotal y Botón de Compra -->
        <div class="p-3 mb-3 rounded bg-light border">
          <div class="d-flex justify-content-between align-items-baseline mb-1">
            <span class="text-muted small">Subtotal:</span>
            <span class="fs-5 fw-bold text-danger">{{ formatearMoneda(cartStore.total) }}</span>
          </div>
          <small class="text-muted d-block mb-3" style="font-size: 0.75rem;">
            Envío gratis disponible en compras elegibles
          </small>

          <button
            class="btn btn-warning w-100 fw-bold btn-pagar mb-2 shadow-sm d-flex justify-content-center align-items-center gap-2"
            @click="irAlCarrito"
          >
            <span>Ver Carrito / Pagar</span>
            <span class="small">➔</span>
          </button>

          <button
            class="btn btn-outline-secondary btn-sm w-100"
            @click="cartStore.vaciarCarrito"
          >
            Vaciar Carrito
          </button>
        </div>

        <!-- Lista scrollable de productos agregados -->
        <h6 class="text-muted text-uppercase mb-2" style="font-size: 0.75rem; letter-spacing: 0.5px;">
          Productos en carrito ({{ cartStore.itemsAgrupados.length }})
        </h6>

        <div class="cart-items-scroll pe-1">
          <transition-group name="list" tag="div" class="d-flex flex-column gap-2">
            <div
              v-for="item in cartStore.itemsAgrupados"
              :key="item.id"
              class="cart-item-card p-2 rounded border bg-white d-flex align-items-center gap-2"
            >
              <!-- Icono del producto -->
              <div class="product-thumb rounded d-flex align-items-center justify-content-center bg-light border">
                <span class="fs-4">{{ getIcono(item.nombre) }}</span>
              </div>

              <!-- Detalles del producto -->
              <div class="flex-grow-1 min-w-0">
                <div class="fw-semibold text-truncate small text-dark" :title="item.nombre">
                  {{ item.nombre }}
                </div>
                <div class="text-muted" style="font-size: 0.78rem;">
                  {{ formatearMoneda(item.precio) }} c/u
                </div>
                <div class="fw-bold text-success small">
                  Subtotal: {{ formatearMoneda(item.subtotal) }}
                </div>
              </div>

              <!-- Controles de Cantidad -->
              <div class="d-flex flex-column align-items-end gap-1">
                <div class="btn-group btn-group-sm border rounded" role="group">
                  <button
                    class="btn btn-light px-2 py-0 border-0 fw-bold text-secondary"
                    title="Disminuir unidad"
                    @click="cartStore.decrementarProducto(item.id)"
                  >
                    -
                  </button>
                  <span class="px-2 py-0 d-flex align-items-center small fw-bold bg-white">
                    {{ item.cantidad }}
                  </span>
                  <button
                    class="btn btn-light px-2 py-0 border-0 fw-bold text-secondary"
                    title="Aumentar unidad"
                    @click="cartStore.addAlCarrito(item)"
                  >
                    +
                  </button>
                </div>
                <button
                  class="btn btn-link text-danger p-0 text-decoration-none"
                  style="font-size: 0.72rem;"
                  title="Eliminar este producto"
                  @click="cartStore.eliminarProductoCompleto(item.id)"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </transition-group>
        </div>
      </div>

      <!-- Estado cuando el carrito está vacío -->
      <div v-else class="text-center py-4 px-2">
        <div class="empty-icon-circle mx-auto mb-3 d-flex align-items-center justify-content-center bg-light rounded-circle">
          <span class="fs-1 text-muted">🛒</span>
        </div>
        <h6 class="fw-bold text-secondary mb-1">Tu carrito está vacío</h6>
        <p class="text-muted small mb-0">
          Haz clic en <strong>"Al carrito"</strong> en cualquiera de los productos para ver la vista previa aquí.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-preview {
  top: 1rem;
  border-radius: 12px;
  background-color: #ffffff;
  z-index: 100;
}

.cart-items-scroll {
  max-height: 380px;
  overflow-y: auto;
}

.cart-items-scroll::-webkit-scrollbar {
  width: 5px;
}

.cart-items-scroll::-webkit-scrollbar-thumb {
  background-color: #dee2e6;
  border-radius: 4px;
}

.cart-item-card {
  transition: all 0.2s ease;
}

.cart-item-card:hover {
  background-color: #f8f9fa !important;
  border-color: #ced4da !important;
}

.product-thumb {
  width: 44px;
  height: 44px;
  min-width: 44px;
}

.btn-pagar {
  background-color: #ffd814;
  border-color: #fcd200;
  color: #0f1111;
  transition: background-color 0.15s ease, transform 0.1s ease;
}

.btn-pagar:hover {
  background-color: #f7ca00;
  border-color: #f2ba00;
  color: #0f1111;
  transform: translateY(-1px);
}

.btn-pagar:active {
  transform: translateY(0);
}

.empty-icon-circle {
  width: 72px;
  height: 72px;
}

/* Transición para la notificación */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* Transición para los items de la lista */
.list-enter-active,
.list-leave-active {
  transition: all 0.25s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-15px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(15px);
}
</style>
