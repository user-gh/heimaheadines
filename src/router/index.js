import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入登录组件
import login from '@/views/login/'
import home from '@/views/home/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'home',
    component: home
  },
]

const router = new VueRouter({
  routes
})

export default router
