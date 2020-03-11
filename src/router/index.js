import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入登录组件
import login from '@/views/login/'
import layout from '@/views/layout/'
import home from '@/views/home/'
import question from '@/views/question/'
import video from '@/views/video/'
import mine from '@/views/mine/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/layout',
    name: 'layout',
    component: layout,
    children: [
      {
        path: '/home',
        name: 'home',
        component: home,
        meta: {
          title: '首页'
        }
      },
      {
        path: '/question',
        name: 'question',
        component: question,
        meta: {
          title: '问答'
        }
      },
      {
        path: '/video',
        name: 'video',
        component: video,
        meta: {
          title: '视频'
        }
      },
      {
        path: '/mine',
        name: 'mine',
        component: mine,
        meta: {
          title: '我的'
        }
      },
    ]
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
