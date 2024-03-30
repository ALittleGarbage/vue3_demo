import { createRouter, createWebHistory } from 'vue-router'
import { useTokenStore } from '@/stores/token'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/LoginPage.vue')
    },
    {
      path: '/',
      name: 'Index',
      meta: {
        requiresAuth: true
      },
      component: () => import('@/views/LayoutView.vue'),
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/pages/HomePage.vue')
        },
        {
          path: '/user',
          name: 'User',
          component: () => import('@/pages/UserPage.vue')
        },
        {
          path: '/:xxx(.*)*',
          name: 'NotFound',
          component: () => import('@/pages/NotFoundPage.vue')
        }
      ]
    }
  ]
})

// 登录状态检查
router.beforeEach((to, from, next) => {
  if (to.matched.some((r) => r.meta?.requiresAuth)) {
    const tokenStore = useTokenStore()
    if (!tokenStore.getToken?.access_token) {
      // 跳转到登录界面，并且登录后跳转到原来页面
      next({ name: 'Login', query: {redirect: to.fullPath} })
      return
    }
  }
  // 放行
  next()
})

export default router
