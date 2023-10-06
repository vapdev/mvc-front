import { createRouter, createWebHistory } from 'vue-router'
import AlunosView from '../views/AlunosView.vue'

import route_guard from '@/router/route_guard.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { auth: true },
      component: AlunosView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

router.beforeEach(route_guard);

export default router
