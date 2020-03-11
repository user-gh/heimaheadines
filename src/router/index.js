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
    component: login,
    meta:{
      title:'登录'
    }
  },
  {
    path: '/home',
    name: 'home',
    component: home,
    meta:{
      title:'首页'
    }
  },
]

const router = new VueRouter({
  routes
})

// 跳转之后调用 
router.afterEach((to) => {
  // 取出当前要去的页面的标签设置给title
  document.title = to.meta.title;
})

export default router
