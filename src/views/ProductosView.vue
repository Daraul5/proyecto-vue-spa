<script setup>
import { useProductStore } from '../stores/productos'
import { useCartStore } from '../stores/carrito'
import { useRouter } from 'vue-router'

const productStore = useProductStore()
const cartStore = useCartStore()
const router = useRouter()

const editar = (id) => router.push(`/productos/${id}`)
</script>

<template>
  <div>
    <h2>Lista de Productos</h2>
    <button class="btn btn-primary mb-3" @click="router.push('/productos/crear')">Crear Nuevo Producto</button>
    
    <div class="row">
      <div v-for="producto in productStore.productos" :key="producto.id" class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ producto.nombre }}</h5>
            <p class="card-text">Precio: ${{ producto.precio }}</p>
            <button class="btn btn-sm btn-success me-2" @click="cartStore.addAlCarrito(producto)">Al carrito</button>
            <button class="btn btn-sm btn-warning me-2" @click="editar(producto.id)">Editar</button>
            <button class="btn btn-sm btn-danger" @click="productStore.deleteProducto(producto.id)">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>