import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入vant
import Vant from 'vant';
import 'vant/lib/index.css';

// 注册vant
Vue.use(Vant);

// 导入axios


// 引入字体图标
import '@/style/font.css';
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
