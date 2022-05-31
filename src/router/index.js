import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Pedidos from '../views/Pedidos.vue'
import MeusPedidos from '../views/MeusPedidos.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/pedidos',
      name: 'pedido',
      component: Pedidos
    },
    {
      path: '/meus-pedidos',
      name: 'meusPedidos',
      component: MeusPedidos
    }
  ]
})

export default router
