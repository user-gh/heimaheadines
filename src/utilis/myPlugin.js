import store from '@/store/'
import router from '@/router/'
// 按需导入toast
import { Toast } from 'vant';

let myPlugin = {
    // 判断是否登录封装函数
    checkLogin() {
        if (store.state.token) {
            return true;
        } else {
            Toast.fail("请先登录!");
            router.push("/checklogin");
            return false;
        }
    },
    // 一般插件内的对象要提供一个install方法
    install(Vue) {
        // 判断登录的方法给vue的原型
        Vue.prototype.checkLogin = myPlugin.checkLogin;
    }
}
// 暴露出去
// module.exports = myPlugin;
export default myPlugin;