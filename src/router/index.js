import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductDetailsView from '@/views/ProductDetailsView.vue'
import ProductInsertView from '@/views/ProductInsertView.vue'
import ErrorView from '@/views/ErrorView.vue'
import AdminView from '@/views/AdminView.vue';
import LoginView from '@/views/LoginView.vue';
import { useUserStore } from '@/stores/user';

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
        path: '/product/insert',
        name: 'productInsert',
        component: ProductInsertView
      },
      {
        path: '/products',
        name: 'products',
        component: () => import('../views/ProductsView.vue')
      },
      {
        path: '/admin',
        name: 'admin',
        component: AdminView,
        meta: { requiresAuth: true }
      },
      {
        path: '/login',
        name: 'login',
        component: LoginView
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

router.beforeEach((to) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.isLoggedIn) return '/login'
})

function castRouteParamsId(route) {
  return {
    id: Number(route.params.id),
  };
}

export default router