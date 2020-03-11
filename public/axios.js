// import axios from 'axios'
// import config from "./config"

// class public {
//     /**
//      * 
//      * 服务封装方法
//      * 
//      * method       请求类型
//      * params       get参数
//      * data         post参数对象
//      * 
//      */
//     async AXIOS(obj) {
//         !obj.method ? obj.method = "GET" : false;
//         !obj.data ? obj.data = {} : false;
//         !obj.params ? obj.params = {} : false;
//         // obj.type == "login"
//         let token = await this.getToken();
//         let result = await axios({
//             url: config.url,
//             method: obj.method,
//             params: obj.params,
//             data: obj.data
//         })
//         if (result.code == 200) {
//             return result.data
//         } else if (result.code == 404) {
//             console.log("请求地址错误")
//         } else if (result.code == 500) {
//             console.log("服务错误")
//         }
//     }
//     async getToken() {
//         let token = window.localStorage.getItem("token");
//         if (!token) {
            
//         }
//         return token;
//     }
// }
// module.exports = public

