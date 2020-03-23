import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入登录组件
import login from '@/views/login/'
import layout from '@/views/layout/'
import home from '@/views/home/'
import question from '@/views/question/'
import video from '@/views/video/'
import mine from '@/views/mine/'
import search from '@/views/search/'
import searchResult from '@/views/searchResult/'
import details from '@/views/details/'
import profile from '@/views/profile/'
import robot from '@/views/robot/'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    // 路由重定向
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/checklogin',
    name: 'login',
    component: login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/search',
    name: 'search',
    component: search,
    meta: {
      title: '搜索'
    }
  },
  {
    path: '/details/:art_id',
    name: 'details',
    component:details,
    meta: {
      title: '文章详情'
    }
  },
  {
    /*
      动态路由匹配
      路由:
        path:'/路径/:参数'
      传递:
        $router.push(`/路径/${要传的参数}`)
      接收:
        {{$route.params.参数}}
      注意:
        路由的参数和接收的参数要一致
    */
    path: '/searchResult/:key',
    name: 'searchResult',
    component: searchResult,
    meta: {
      title: '搜索结果'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component:profile,
    meta: {
      title: '个人信息'
    }
  },
  {
    path: '/robot',
    name: 'robot',
    component:robot,
    meta: {
      title: '小智机器人'
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
