import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true,
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]
export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '仪表盘',
      icon: 'dashboard-3-line',
      affix: true,
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index'),
        meta: {
          title: '仪表盘',
          icon: 'dashboard-3-line',
          affix: true,
        },
      },
    ],
  },
  {
    path: '/transaction',
    component: Layout,
    redirect: '/transaction/all',
    alwaysShow: true,
    meta: {
      title: '订单管理',
      icon: 'apps-line',
    },
    children: [
      {
        path: 'all',
        name: 'AllTransaction',
        component: () => import('@/views/transaction/AllTransaction.vue'),
        meta: {
          title: '全部订单',
          icon: 'table-2',
        },
      },
      {
        path: 'send',
        name: 'Send',
        component: () => import('@/views/transaction/SendTransaction.vue'),
        meta: {
          title: '待发货',
          icon: 'truck-line',
        },
      },
      {
        path: 'receive',
        name: 'Receive',
        component: () => import('@/views/transaction/ReceiveTransaction.vue'),
        meta: {
          title: '待签收验机',
          icon: 'store-2-line',
        },
      },
      {
        path: 'compensate',
        name: 'Compensate',
        component: () =>
          import('@/views/transaction/CompensateTransaction.vue'),
        meta: {
          title: '待处理赔偿',
          icon: 'money-cny-circle-line',
        },
      },
    ],
  },
  {
    path: '/item',
    component: Layout,
    redirect: '/item/all',
    alwaysShow: true,
    meta: {
      title: '商品管理',
      icon: 'camera-3-line',
    },
    children: [
      {
        path: 'all',
        name: 'AllItem',
        component: () => import('@/views/item/AllItem.vue'),
        meta: {
          title: '信息管理',
          icon: 'camera-3-line',
        },
      },
      {
        path: '1',
        name: 'ItemDetail',
        component: () => import('@/views/item/ItemDetail.vue'),
        meta: {
          title: '商品详情',
        },
      },
      {
        path: 'comment',
        name: 'Comment',
        component: () => import('@/views/item/AllComment.vue'),
        meta: {
          title: '评论管理',
          icon: 'chat-heart-line',
        },
      },
    ],
  },
  {
    path: '/bulletin',
    component: Layout,
    redirect: '/bulletin',
    meta: {
      title: '公告管理',
      icon: 'notification-3-line',
    },
    children: [
      {
        path: '',
        name: 'Bulletin',
        component: () => import('@/views/bulletin'),
        meta: {
          title: '公告管理',
          icon: 'notification-3-line',
        },
      },
    ],
  },
  {
    path: '/ticket',
    component: Layout,
    redirect: '/ticket',
    meta: {
      title: '工单管理',
      icon: 'ticket-2-line',
    },
    children: [
      {
        path: '',
        name: 'Ticket',
        component: () => import('@/views/ticket'),
        meta: {
          title: '工单管理',
          icon: 'ticket-2-line',
        },
      },
      {
        path: '1',
        name: 'TicketDetail',
        component: () => import('@/views/ticket/TicketDetail'),
        meta: {
          title: '工单详情',
        },
      },
      {
        path: 'create',
        name: ' CreateTicket',
        component: () => import('@/views/ticket/CreateTicket'),
        meta: { title: '创建工单' },
      },
    ],
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user',
    meta: {
      title: '用户管理',
      icon: 'user-3-line',
    },
    children: [
      {
        path: '',
        name: 'User',
        component: () => import('@/views/user'),
        meta: {
          title: '用户管理',
          icon: 'user-3-line',
        },
      },
    ],
  },
  {
    path: '/error',
    name: 'Error',
    component: Layout,
    redirect: '/error/403',
    hidden: true,
    meta: {
      title: '错误页',
      icon: 'error-warning-line',
    },
    children: [
      {
        path: '403',
        name: 'Error403',
        component: () => import('@/views/403'),
        meta: {
          title: '403',
          icon: 'error-warning-line',
        },
      },
      {
        path: '404',
        name: 'Error404',
        component: () => import('@/views/404'),
        meta: {
          title: '404',
          icon: 'error-warning-line',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    hidden: true,
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
})

export default router
