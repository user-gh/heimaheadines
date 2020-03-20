import axios from 'axios'
import store from '@/store/'
import JSONBig from 'json-bigint'
import { setLocal } from '@/utilis/local'
let Request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/',

  transformResponse: [function (data) {
    try {
      return JSONBig.parse(data);
    } catch (error) {
      return data;
    }
    // return JSONBig.parse(data);
  }]
})

// 添加请求拦截器
Request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 请求头里带token
  if (store.state.token) {
    config.headers.Authorization = 'Bearer ' + store.state.token;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 准备一个新的对象
let tempReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0/',
})

// 添加响应拦截器
Request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, async function (error) {
  // 响应发送错误
  console.log('响应发送错误 ');
  try {
    console.log('进入了');
    // console.dir(error)
    // 判断token是否过期,过期则请求刷新token
    if (error.response && error.response.status == 401) {
      let res = await  tempReq({
        url: "authorizations",
        method: "put",
        headers: {
          // 注意：Bearer后面跟一个空格，然后再接refresh_token就行了
          Authorization: 'Bearer ' + store.state.refresh_token  
        }
      })
      // 更新到vuex
      store.commit('changeToken', res.data.data.token);
      // 存储到本地存储
      // 所以我们先准备一个对象
      let obj = {
        token: res.data.data.token,
        refresh_token: store.state.refresh_token
      }
      setLocal('tokenInfo', JSON.stringify(obj));
      // 再次发送请求(完成上一次发生错误的请求 )
      let result = await request(error.config);
      // 根据最新的token拿到上一次错误请求后的数据了 ，为了让调用请求时也能拿到这个值
      // 所以return出去
      return result;
    } else {
      // 对响应错误做点什么
      console.log("响应错误")
      return Promise.reject(error);
    }
  } catch (error) {
    console.log(error);
  }
});
export default Request;