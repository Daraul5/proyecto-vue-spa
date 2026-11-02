import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('carrito', () => {
  const carrito = ref([])
  const ultimoAgregado = ref(null)
  let alertaTimeout = null

  const total = computed(() => {
    return carrito.value.reduce((acc, item) => acc + item.precio, 0)
  })

  const totalArticulos = computed(() => {
    return carrito.value.length
  })

  // Agrupa los productos repetidos mostrando su cantidad acumulada
  const itemsAgrupados = computed(() => {
    const mapa = {}
    for (const item of carrito.value) {
      if (!mapa[item.id]) {
        mapa[item.id] = {
          id: item.id,
          nombre: item.nombre,
          precio: item.precio,
          cantidad: 0,
          subtotal: 0,
          cartIds: []
        }
      }
      mapa[item.id].cantidad++
      mapa[item.id].subtotal += item.precio
      mapa[item.id].cartIds.push(item.cartId)
    }
    return Object.values(mapa)
  })

  const addAlCarrito = (producto) => {
    const nuevoItem = { ...producto, cartId: Date.now() + Math.random() }
    carrito.value.push(nuevoItem)

    // Notificación del último producto agregado
    ultimoAgregado.value = { ...producto, timestamp: Date.now() }
    if (alertaTimeout) clearTimeout(alertaTimeout)
    alertaTimeout = setTimeout(() => {
      ultimoAgregado.value = null
    }, 3500)
  }

  const removeDelCarrito = (cartId) => {
    carrito.value = carrito.value.filter(item => item.cartId !== cartId)
  }

  // Quita una sola unidad del producto
  const decrementarProducto = (productoId) => {
    const index = carrito.value.findIndex(item => item.id === productoId)
    if (index !== -1) {
      carrito.value.splice(index, 1)
    }
  }

  // Elimina todas las unidades de un producto
  const eliminarProductoCompleto = (productoId) => {
    carrito.value = carrito.value.filter(item => item.id !== productoId)
  }

  const vaciarCarrito = () => {
    carrito.value = []
    ultimoAgregado.value = null
  }

  return {
    carrito,
    total,
    totalArticulos,
    itemsAgrupados,
    ultimoAgregado,
    addAlCarrito,
    removeDelCarrito,
    decrementarProducto,
    eliminarProductoCompleto,
    vaciarCarrito
  }
})