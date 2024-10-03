import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDetailsView from '@/views/ProductDetailsView.vue'
import ErrorView from '@/views/ErrorView.vue'

const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
      {
        path: '/product/:id',
        name: 'product',
        component: ProductDetailsView,
        props: castRouteParamsId
      },
      {
        path: '/products',
        name: 'products',
        component: () => import('../views/ProductsView.vue')
      },
        {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue')
      },
    {
      path: '/:pathMatch(.*)*',
      name: 'error',
      component: ErrorView
    }
  ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

function castRouteParamsId(route) {
  return {
    id: Number(route.params.id),
  };
}

export default router