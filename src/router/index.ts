// router/index.js
import type { RouteRecordRaw } from 'vue-router'
import {
  createRouter,
  createWebHistory,
} from 'vue-router'
import useLoginStore from '@/store/useLoginStore.js'

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    alias: '/',
    name: 'HOME',
    component: () => import('@/pages/system-admin/SystemAdmin.vue'),
  },
  {
    path: '/login',
    name: 'LOGIN',
    component: () => import('@/pages/login/TheLogin.vue'),
  },
  {
    path: '/admin',
    name: 'ADMIN',
    meta: {
      state: 'disable',
      title: '系统管理',
    },
    component: () => import('@/pages/system-admin/SystemAdmin.vue'),
    children: [
      {
        path: 'user',
        name: 'USER_ADMIN',
        meta: {
          state: 'disable',
        },
        component: () => import('@/pages/system-admin/user-admin/UserAdmin.vue'),
      },
      {
        path: 'menu',
        meta: {
          state: 'disable',
        },
        name: 'MENU_ADMIN',
        component: () => import('@/pages/system-admin/menu-admin/MenuAdmin.vue'),
      },
    ],
  },

  // error page
  {
    path: '/401',
    name: 'Error401',
    component: () => import('@/pages/page-error/Error401.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Error404',
    component: () => import('@/pages/page-error/Error404.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

const isLogin = (store) => {
  return !!store.sessionId
}
const hasPermission = (store, routeName) => {
  return !!store.allowRoutes.includes(routeName)
}

router.beforeEach(async (to, from, next) => {
  const loginStore = useLoginStore()
  await loginStore.fetchRoutes()

  if (to.path === '/login')
    next()

  if (!isLogin(loginStore))
    next('/login')

  if (to.meta.state === 'disable' && !hasPermission(loginStore, to.name))
    next('/401')

  next()
})

export default router
