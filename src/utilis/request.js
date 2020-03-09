import axios from 'axios'

let Request = axios.create({
    baseURL:'http://ttapi.research.itcast.cn/app/v1_0/'
})

// 添加请求拦截器
Request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
Request.interceptors.response.use(function (response) {
  // 正常响应触发
    console.log('有数据了');
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 响应发送错误
    console.log('响应发送错误');
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  
export default Request;