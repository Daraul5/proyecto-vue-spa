<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../stores/productos'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()

const formulario = ref({ nombre: '', precio: 0 })
const esEdicion = ref(false)

onMounted(() => {
  if (route.params.id) {
    esEdicion.value = true
    const productoExistente = productStore.productos.find(p => p.id === parseInt(route.params.id))
    if (productoExistente) {
      formulario.value = { ...productoExistente }
    }
  }
})

const guardar = () => {
  if (esEdicion.value) {
    productStore.editProducto(route.params.id, formulario.value)
  } else {
    productStore.addProducto(formulario.value)
  }
  router.push('/productos')
}
</script>

<template>
  <div class="card p-4">
    <h2 v-if="esEdicion">Editar Producto</h2>
    <h2 v-else>Crear Producto</h2>
    
    <form @submit.prevent="guardar">
      <div class="mb-3">
        <label>Nombre del Producto</label>
        <input v-model="formulario.nombre" type="text" class="form-control" required>
      </div>
      <div class="mb-3">
        <label>Precio</label>
        <input v-model.number="formulario.precio" type="number" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Guardar</button>
      <button type="button" class="btn btn-secondary ms-2" @click="router.push('/productos')">Cancelar</button>
    </form>
  </div>
</template>