<script setup>
import { useCartStore } from '../stores/carrito'
const cartStore = useCartStore()
</script>

<template>
  <div>
    <h2>Resumen del Carrito</h2>
    
    <div v-if="cartStore.carrito.length === 0" class="alert alert-info">
      Tu carrito está vacío.
    </div>
    
    <div v-else>
      <ul class="list-group mb-3">
        <li v-for="item in cartStore.carrito" :key="item.cartId" class="list-group-item d-flex justify-content-between align-items-center">
          {{ item.nombre }} - ${{ item.precio }}
          <button class="btn btn-sm btn-danger" @click="cartStore.removeDelCarrito(item.cartId)">Quitar</button>
        </li>
      </ul>
      
      <h4>Total Acumulado: ${{ cartStore.total }}</h4>
      <button class="btn btn-danger mt-2" @click="cartStore.vaciarCarrito">Vaciar Carrito</button>
    </div>
  </div>
</template>