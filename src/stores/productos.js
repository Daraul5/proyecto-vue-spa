import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('productos', () => {
  const productos = ref([
    { id: 1, nombre: 'Laptop HP', precio: 12000 },
    { id: 2, nombre: 'Teclado Mecánico', precio: 1500 }
  ])

  const addProducto = (producto) => {
    productos.value.push({ ...producto, id: Date.now() })
  }

  const editProducto = (id, dataAct) => {
    const index = productos.value.findIndex(p => p.id === parseInt(id))
    if (index !== -1) productos.value[index] = { ...dataAct, id: parseInt(id) }
  }

  const deleteProducto = (id) => {
    productos.value = productos.value.filter(p => p.id !== id)
  }

  return { productos, addProducto, editProducto, deleteProducto }
})