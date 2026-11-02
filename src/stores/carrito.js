import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('carrito', () => {
  const carrito = ref([])

  const total = computed(() => {
    return carrito.value.reduce((acc, item) => acc + item.precio, 0)
  })

  const addAlCarrito = (producto) => {
    carrito.value.push({ ...producto, cartId: Date.now() + Math.random() })
  }

  const removeDelCarrito = (cartId) => {
    carrito.value = carrito.value.filter(item => item.cartId !== cartId)
  }

  const vaciarCarrito = () => {
    carrito.value = []
  }

  return { carrito, total, addAlCarrito, removeDelCarrito, vaciarCarrito }
})