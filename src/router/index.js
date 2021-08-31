import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Layout from '@/layout'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/home',
    name: 'home',
    // component: Layout,
    component: () => import('@/views/home'),
    children: [
      {
        path: '/category',
        name: 'category',
        component: () => import('@/views/product/category')
      },
      {
        path: '/product',
        name: 'product',
        component: () => import('@/views/product/index')
      },
      {
        path: '/productsEdit',
        name: 'productsEdit',
        component: () => import('@/views/product/productsEdit')
      },
      {
        path: '/banner',
        name: 'banner',
        component: () => import('@/views/banner'),
      },
      {
        path: '/suggest',
        name: 'feedback',
        component: () => import('@/views/merchants/order/feedback')
      },
      {
        path: '/withdrawal',
        name: 'withdrawal',
        component: () => import('@/views/merchants/order/withdrawal')
      },
      {
        path: '/service',
        name: 'service',
        component: () => import('@/views/service/index')
      },
      {
        path: '/sign/shop',
        name: 'signshop',
        component: () => import('@/views/sign/shop'),
      },
      {
        path: '/sign/contract/message',
        name: 'contractmsg',
        component: () => import('@/views/sign/contract/message'),
        meta:{
          contractShow:true
        }
      },
      {
        path: '/sign/welfare/proadd',
        name: 'proadd',
        component: () => import('@/views/sign/welfare/proadd'),
        meta:{
          welfareShow:true
        }
      },
      {
        path: '/sign/welfare',
        name: 'welfare',
        component: () => import('@/views/sign/welfare/index'),
        meta:{
          welfareShow:true
        }
      },
      {
        path: '/sign/welfare/integral',
        name: 'integral',
        component: () => import('@/views/sign/welfare/integral'),
        meta:{
          welfareShow:true
        }
      },
      {
        path: '/sign/welfare/exchange',
        name: 'exchange',
        component: () => import('@/views/sign/welfare/exchange'),
        meta:{
          welfareShow:true
        }
      },
      {
        path: '/sign/contract',
        name: 'contract',
        component: () => import('@/views/sign/contract/index'),
        meta:{
          contractShow:true
        }
      },
      {
        path: '/sign/deposit',
        name: 'signdeposit',
        component: () => import('@/views/sign/deposit'),
      },
      {
        path: '/sign/alisign',
        name: 'alisign',
        component: () => import('@/views/sign/alisign'),
      },
      
      {
        path: '/expressList',
        name: 'expressList',
        component: () => import('@/views/expressList'),
      },
      {
        path: '/notice/message',
        name: 'pushmsg',
        component: () => import('@/views/notice/message')
      },
      {
        path: '/notice',
        name: 'notice',
        component: () => import('@/views/notice')
      },
      {
        path: '/Order/:id',
        name: 'Order',
        component: () => import('@/views/Order'),
        meta: {
          orderShow: true
        }
      },
      {
        path: '/goodscommit',
        name: 'OrderCommit',
        component: () => import('@/views/Order/commit')
      },
      {
        path: '/shopAuthor/author',
        name: 'author',
        component: () => import('@/views/merchants/author/author'),
        meta: {
          authorShow: true
        }
      },
      {
        path: '/shopAuthor/deposit',
        name: 'deposit',
        component: () => import('@/views/merchants/author/deposit'),
        meta: {
          authorShow: true
        }
      },
      {
        path: '/shopOrder/order',
        name: 'shopOrder',
        component: () => import('@/views/merchants/order/order'),
        meta: {
          shopShow: true
        }
      },
      {
        path: '/shopOrder/feedbacks',
        name: 'shopfeedbacks',
        component: () => import('@/views/merchants/order/shopfeedback'),
        meta: {
          shopShow: true
        }
      },
      {
        path: '/shopOrder/gift',
        name: 'gift',
        component: () => import('@/views/merchants/order/gift'),
        meta: {
          shopShow: true
        }
      },
      {
        path: '/shopOrder/invite',
        name: 'invite',
        component: () => import('@/views/merchants/order/invite'),
        meta: {
          shopShow: true
        }
      },
      {
        path: '/shopOrder/feedback',
        name: 'feedbacks',
        component: () => import('@/views/merchants/order/feedback'),
        meta: {
          shopShow: true
        }
      },
      {
        path: '/shopOrder/rechange',
        name: 'rechange',
        component: () => import('@/views/merchants/order/rechange'),
        meta: {
          shopShow: true
        }
      }
    ]
  },
];

const router = new VueRouter({
  routes,
});

// 挂载路由导航守卫,to表示将要访问的路径，from表示从哪里来，next是下一个要做的操作
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const token = sessionStorage.getItem('token')
    if (!token) {
      next('/login')
    } else {
      next()
    }
  }
})


export default router;
