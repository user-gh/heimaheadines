import request from '@/utilis/request.js'

// 登录
export function login(data){
    return request({
        url:'authorizations',
        method:'post',
        data
    })
}