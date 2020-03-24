import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入vant
import Vant from 'vant';
import 'vant/lib/index.css';

// 注册vant
Vue.use(Vant);
// 导入 lib-flexible
import 'amfe-flexible/index'

// 引入字体图标
import '@/style/font.css';
Vue.config.productionTip = false
// 引入day.js
import dayjs from 'dayjs'
// 用包
dayjs().format();
// 导入相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime';
// 让day.js加载插件
dayjs.extend(relativeTime);
// 导入中文包
import 'dayjs/locale/zh-cn';
// 把day.js设置为使用中文
dayjs.locale('zh-cn');
// 全局过滤器
Vue.filter('dataBefore', function (value) {
  return dayjs().to(value);
});

// 导入我的插件(登录判断)  
import myPlugin from '@/utilis/myPlugin';
Vue.use(myPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
