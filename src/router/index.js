import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '@/views/layout/index'
import home from '@/views/layout/home'
import cart from '@/views/layout/cart'
import user from '@/views/layout/user'
import category from '@/views/layout/category'

import store from '@/store'
// import { getInfo } from '@/utils/storage'
// 路由懒加载：优化，在需要打开相应页面时再加载
const prodetail = () => import('@/views/prodetail')
const login = () => import('@/views/login')
const order = () => import('@/views/order')
const pay = () => import('@/views/pay')
const search = () => import('@/views/search')
const list = () => import('@/views/search/list')

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: layout,
      children: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: home },
        { path: '/cart', component: cart },
        { path: '/user', component: user },
        { path: '/category', component: category, name: 'CategoryPage' }
      ]
    },
    // 动态路由传参，来确认是哪个商品，路由参数携带 id
    { path: '/prodetail/:id', component: prodetail },
    { path: '/login', component: login },
    { path: '/order', component: order },
    { path: '/pay', component: pay },
    { path: '/search', component: search },
    { path: '/list', component: list }
  ]
})

// 全局前置守卫，判断是否登录，如果未登录，则跳转到登录页面
const forbidPath = ['/pay', '/order']
router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  if (!forbidPath.includes(to.path)) {
    next() // 放行
    return
  }
  // 权限页面需要token
  const token = store.getters.token
  // const token = getInfo().token
  // console.log(token)
  // 或许是我的浏览器的vue工具版本问题，ta无法在控制台显示token，而是Download the Vue Devtools extension for a better development experience://https://github.com/vuejs/vue-devtools
  if (token) {
    next() // 放行
  } else {
    next('/login') // 跳转到登录页面
  }
})

export default router
