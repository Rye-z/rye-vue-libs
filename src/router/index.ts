// router/index.js

import type { RouteRecordRaw } from 'vue-router'
import {
  createRouter,
  createWebHistory,
} from 'vue-router'
import useLoginStore from '@/store/useLoginStore.js'

enum RouteTypes {
  Function,
  Demo,
}

const routes: RouteRecordRaw[] = [
  {
    path: '/home',
    alias: '/',
    name: 'HOME',
    component: () => import('@/pages/TheHome.vue'),
  },
  {
    path: '/routes',
    meta: {
      type: RouteTypes.Function,
      des: '全部路由',
    },
    name: 'ROUTES_ADMIN',
    component: () => import('@/pages/demo-system-admin/routes-admin/RoutesAdmin.vue'),
  },
  {
    path: '/demo/anchor',
    name: 'DEMO_ANCHOR',
    meta: {
      type: RouteTypes.Demo,
      des: '锚点跳转/懒加载',
    },
    component: () => import('@/pages/demo-anchor/DemoAnchor.vue'),
    children: [
      {
        path: 'element',
        name: 'DEMO_ANCHOR_ELEMENT',
        meta: {
          type: RouteTypes.Demo,
        },
        component: () => import('@/pages/demo-anchor/components/ScrollInElement.vue'),
      },
      {
        path: 'window',
        name: 'DEMO_ANCHOR_WINDOW',
        meta: {
          type: RouteTypes.Demo,
        },
        component: () => import('@/pages/demo-anchor/components/ScrollInWindow.vue'),
      },
    ],
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
      des: '动态权限',
      type: RouteTypes.Demo,
    },
    component: () => import('@/pages/demo-system-admin/SystemAdmin.vue'),
    children: [
      {
        path: 'user',
        name: 'USER_ADMIN',
        meta: {
          state: 'disable',
        },
        component: () => import('@/pages/demo-system-admin/user-admin/UserAdmin.vue'),
      },
      {
        path: 'menu',
        meta: {
          state: 'disable',
        },
        name: 'MENU_ADMIN',
        component: () => import('@/pages/demo-system-admin/menu-admin/MenuAdmin.vue'),
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

  if (to.path === '/login')
    next()

  if (!isLogin(loginStore))
    next('/login')

  if (
    to.meta.state === 'disable'
    && to.path.startsWith('/admin')
    && !hasPermission(loginStore, to.name)
  )
    next('/401')
  else
    next()
})

export default router
