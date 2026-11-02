import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '../views/InicioView.vue'
import ProductosView from '../views/ProductosView.vue'
import ProductoFormView from '../views/ProductoFormView.vue'
import CarritoView from '../views/CarritoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'inicio', component: InicioView },
    { path: '/productos', name: 'productos', component: ProductosView },
    { path: '/productos/crear', name: 'crear-producto', component: ProductoFormView },
    { path: '/productos/:id', name: 'editar-producto', component: ProductoFormView },
    { path: '/carrito', name: 'carrito', component: CarritoView }
  ]
})

export default router