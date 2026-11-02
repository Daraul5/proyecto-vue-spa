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
</script>

<template>
  <div class="card shadow-sm border-0 rounded-4 p-4">
    <!-- Encabezado con navegación rápida -->
    <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-3 border-bottom gap-2">
      <div class="d-flex align-items-center gap-3">
        <button class="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center" style="width: 36px; height: 36px;" @click="router.push('/productos')">
          ←
        </button>
        <div>
          <h2 class="fw-bold mb-0 text-dark">Carrito de Compras</h2>
          <small class="text-muted">Revisa tus artículos antes de finalizar el pedido</small>
        </div>
      </div>
      <button class="btn btn-outline-primary btn-sm" @click="router.push('/productos')">
        + Seguir comprando
      </button>
    </div>

    <!-- Si el carrito está vacío -->
    <div v-if="cartStore.carrito.length === 0" class="text-center py-5">
      <div class="fs-1 mb-3">🛒</div>
      <h4 class="fw-bold text-secondary mb-2">Tu carrito está vacío</h4>
      <p class="text-muted mb-4">No tienes ningún artículo agregado por el momento.</p>
      <button class="btn btn-warning px-4 py-2 fw-bold shadow-sm" @click="router.push('/productos')">
        Ver Catálogo de Productos
      </button>
    </div>

    <!-- Lista completa de artículos y total -->
    <div v-else class="row g-4">
      <!-- Columna izquierda: Lista detallada de productos agrupados -->
      <div class="col-lg-8">
        <div class="list-group shadow-sm border-0 rounded-3">
          <div
            v-for="item in cartStore.itemsAgrupados"
            :key="item.id"
            class="list-group-item p-3 d-flex align-items-center justify-content-between gap-3 border-light-subtle"
          >
            <div class="d-flex align-items-center gap-3 min-w-0">
              <div class="rounded bg-light d-flex align-items-center justify-content-center p-2 fs-3" style="width: 54px; height: 54px;">
                {{ getIcono(item.nombre) }}
              </div>
              <div class="min-w-0">
                <h6 class="mb-1 fw-bold text-dark text-truncate">{{ item.nombre }}</h6>
                <div class="text-muted small">
                  Precio unitario: {{ formatearMoneda(item.precio) }}
                </div>
                <div class="text-success fw-bold small">
                  Subtotal ({{ item.cantidad }} u.): {{ formatearMoneda(item.subtotal) }}
                </div>
              </div>
            </div>

            <!-- Controles de cantidad -->
            <div class="d-flex align-items-center gap-3">
              <div class="btn-group border rounded" role="group">
                <button
                  class="btn btn-light px-3 py-1 fw-bold text-secondary"
                  title="Disminuir unidad"
                  @click="cartStore.decrementarProducto(item.id)"
                >
                  -
                </button>
                <span class="px-3 py-1 d-flex align-items-center fw-bold bg-white">
                  {{ item.cantidad }}
                </span>
                <button
                  class="btn btn-light px-3 py-1 fw-bold text-secondary"
                  title="Aumentar unidad"
                  @click="cartStore.addAlCarrito(item)"
                >
                  +
                </button>
              </div>

              <button
                class="btn btn-outline-danger btn-sm"
                title="Eliminar este producto"
                @click="cartStore.eliminarProductoCompleto(item.id)"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>

        <div class="mt-3 d-flex justify-content-end">
          <button class="btn btn-outline-danger btn-sm" @click="cartStore.vaciarCarrito">
            Vaciar Carrito Completo
          </button>
        </div>
      </div>

      <!-- Columna derecha: Resumen del pedido -->
      <div class="col-lg-4">
        <div class="card bg-light border-0 rounded-4 p-4 shadow-sm">
          <h5 class="fw-bold text-dark mb-3">Resumen de Compra</h5>

          <div class="d-flex justify-content-between mb-2 small text-muted">
            <span>Productos ({{ cartStore.totalArticulos }}):</span>
            <span>{{ formatearMoneda(cartStore.total) }}</span>
          </div>
          <div class="d-flex justify-content-between mb-3 small text-muted">
            <span>Costo de envío:</span>
            <span class="text-success fw-bold">Gratis</span>
          </div>

          <hr />

          <div class="d-flex justify-content-between align-items-baseline mb-4">
            <span class="fw-bold fs-5 text-dark">Total:</span>
            <span class="fs-4 fw-bold text-danger">{{ formatearMoneda(cartStore.total) }}</span>
          </div>

          <button
            class="btn btn-warning w-100 py-3 fw-bold shadow-sm mb-2"
            style="background-color: #ffd814; border-color: #fcd200; color: #0f1111; font-size: 1.05rem;"
            @click="alert('¡Gracias por tu compra! Tu pedido ha sido procesado de forma simulada.'); cartStore.vaciarCarrito(); router.push('/productos');"
          >
            Proceder al Pago
          </button>

          <small class="text-muted text-center d-block">
            🔒 Compra protegida y segura
          </small>
        </div>
      </div>
    </div>
  </div>
</template>