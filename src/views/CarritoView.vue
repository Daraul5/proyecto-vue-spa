<script setup>
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/carrito'

const cartStore = useCartStore()
const router = useRouter()

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

const procesarPago = () => {
  alert('¡Gracias por tu compra! Tu pedido ha sido procesado')
  cartStore.vaciarCarrito()
  router.push('/productos')
}

</script>

<template>
  <div class="cart-container max-w-7xl mx-auto my-4">
    <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-3 border-bottom gap-3">
      <div class="d-flex align-items-center gap-3">
        <button 
          class="btn btn-light rounded-circle shadow-sm border-0 d-flex align-items-center justify-content-center transition-btn" 
          style="width: 42px; height: 42px;" 
          @click="router.push('/productos')"
          title="Volver a productos"
        >
          <span class="fs-5 text-secondary">←</span>
        </button>
        <div>
          <h2 class="fw-bold mb-0 text-dark tracking-tight">Tu Carrito</h2>
          <p class="text-muted small mb-0">Gestiona los artículos de tu pedido</p>
        </div>
      </div>
      <button 
        class="btn btn-outline-dark rounded-pill px-4 btn-sm fw-medium"
        @click="router.push('/productos')"
      >
        + Seguir comprando
      </button>
    </div>

    <!-- Vista de Carrito Vacío -->
    <div v-if="cartStore.carrito.length === 0" class="text-center py-5 my-5 bg-white rounded-5 shadow-sm p-5 border border-light">
      <div class="empty-icon-wrapper mx-auto mb-4 bg-light rounded-circle d-flex align-items-center justify-content-center" style="width: 90px; height: 90px;">
        <span class="fs-1">🛍️</span>
      </div>
      <h3 class="fw-bold text-dark mb-2">Tu carrito está vacío</h3>
      <p class="text-muted mb-4 mx-auto" style="max-width: 400px;">
        Parece que aún no has añadido productos. Explora nuestro catálogo y encuentra lo que necesitas.
      </p>
      <button 
        class="btn btn-dark px-4 py-2.5 rounded-pill fw-semibold shadow-sm tracking-wide" 
        @click="router.push('/productos')"
      >
        Explorar Catálogo
      </button>
    </div>

    <!-- Vista de Carrito con Productos -->
    <div v-else class="row g-4 align-items-start">
      <!-- Lista de artículos -->
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm rounded-4 overflow-hidden mb-3">
          <div class="list-group list-group-flush">
            <div
              v-for="item in cartStore.itemsAgrupados"
              :key="item.id"
              class="list-group-item p-4 d-flex align-items-center justify-content-between gap-3 border-bottom border-light"
            >
              <!-- Info del producto -->
              <div class="d-flex align-items-center gap-3 min-w-0">
                <div class="product-avatar rounded-4 bg-body-tertiary d-flex align-items-center justify-content-center fs-3 flex-shrink-0" style="width: 64px; height: 64px;">
                  {{ getIcono(item.nombre) }}
                </div>
                <div class="min-w-0">
                  <h6 class="mb-1 fw-bold text-dark text-truncate fs-6">{{ item.nombre }}</h6>
                  <div class="text-muted small mb-1">
                    Precio: <span class="fw-medium text-dark">{{ formatearMoneda(item.precio) }}</span>
                  </div>
                  <div class="text-primary fw-semibold small">
                    Subtotal: {{ formatearMoneda(item.subtotal) }}
                  </div>
                </div>
              </div>

              <!-- Acciones y Controles de cantidad -->
              <div class="d-flex align-items-center gap-3">
                <div class="qty-pill d-flex align-items-center bg-light rounded-pill p-1 border">
                  <button
                    class="btn btn-sm btn-link text-dark text-decoration-none px-2 py-0 fw-bold border-0"
                    title="Disminuir"
                    @click="cartStore.decrementarProducto(item.id)"
                  >
                    -
                  </button>
                  <span class="px-2 fw-bold small text-dark min-w-qty text-center">
                    {{ item.cantidad }}
                  </span>
                  <button
                    class="btn btn-sm btn-link text-dark text-decoration-none px-2 py-0 fw-bold border-0"
                    title="Aumentar"
                    @click="cartStore.addAlCarrito(item)"
                  >
                    +
                  </button>
                </div>

                <button
                  class="btn btn-icon btn-light rounded-circle text-muted p-2 border-0 shadow-none hover-danger"
                  title="Eliminar producto"
                  @click="cartStore.eliminarProductoCompleto(item.id)"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex justify-content-end">
          <button 
            class="btn btn-link text-danger text-decoration-none btn-sm fw-medium px-0" 
            @click="cartStore.vaciarCarrito"
          >
            Vaciar todo el carrito
          </button>
        </div>
      </div>

      <!-- Resumen del Pedido -->
      <div class="col-lg-4">
        <div class="card border-0 shadow-sm rounded-4 p-4 bg-white sticky-top" style="top: 20px;">
          <h5 class="fw-bold text-dark mb-4">Resumen de la orden</h5>

          <div class="d-flex justify-content-between mb-3 text-secondary">
            <span>Productos ({{ cartStore.totalArticulos }})</span>
            <span class="fw-medium text-dark">{{ formatearMoneda(cartStore.total) }}</span>
          </div>
          
          <div class="d-flex justify-content-between mb-3 text-secondary">
            <span>Envío estimado</span>
            <span class="text-success fw-semibold">Gratis</span>
          </div>

          <hr class="my-3 opacity-10" />

          <div class="d-flex justify-content-between align-items-baseline mb-4">
            <span class="fw-bold text-dark fs-5">Total</span>
            <span class="fs-3 fw-bold text-dark tracking-tight">{{ formatearMoneda(cartStore.total) }}</span>
          </div>

          <button
            class="btn btn-dark w-100 py-3 rounded-3 fw-bold shadow-sm mb-3 transition-btn border-0"
            @click="procesarPago"
          >
            Proceder al Pago
          </button>

          <div class="d-flex align-items-center justify-content-center gap-2 text-muted small">
            <span>🔒</span>
            <span>Pago seguro garantizado</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.min-w-qty {
  min-width: 24px;
}
.transition-btn {
  transition: all 0.2s ease-in-out;
}
.transition-btn:hover {
  transform: translateY(-1px);
}
.hover-danger:hover {
  background-color: #fee2e2 !important;
}
</style>