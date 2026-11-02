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
  <div class="card shadow-sm border-0 rounded-4 p-4 p-md-5">
    <div class="mb-4 pb-2 border-bottom">
      <h2 class="fw-bold text-dark mb-1">
        {{ esEdicion ? '✏️ Editar Producto' : '➕ Crear Nuevo Producto' }}
      </h2>
      <small class="text-muted">
        {{ esEdicion ? 'Actualiza los datos del producto seleccionado' : 'Ingresa la información para dar de alta el producto' }}
      </small>
    </div>

    <form @submit.prevent="guardar">
      <div class="mb-3">
        <label class="form-label fw-semibold text-secondary">Nombre del Producto</label>
        <input
          v-model="formulario.nombre"
          type="text"
          class="form-control form-control-lg fs-6"
          placeholder="Ej. Monitor Gamer 27 pulgadas"
          required
        >
      </div>
      <div class="mb-4">
        <label class="form-label fw-semibold text-secondary">Precio ($ MXN)</label>
        <input
          v-model.number="formulario.precio"
          type="number"
          min="1"
          step="any"
          class="form-control form-control-lg fs-6"
          placeholder="Ej. 4500"
          required
        >
      </div>
      <div class="d-flex gap-2">
        <button type="submit" class="btn btn-primary px-4 py-2 shadow-sm fw-semibold">
          {{ esEdicion ? 'Guardar Cambios' : 'Registrar Producto' }}
        </button>
        <button type="button" class="btn btn-outline-secondary px-4 py-2" @click="router.push('/productos')">
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>