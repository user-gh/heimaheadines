import request  from '@/utilis/request'

// 关注用户
export function followUser(data){
    return request({
        url:'user/followings',
        method:'post',
        data
    })
}

// 取消用户关注
export function cancelUser(data){
    return request({
        url:`user/followings/${data.aut_id}`,
        method:'delete'
    })
}

// 获取用户自己的信息
export function getInfo(){
    return request({
        url:'user',
        method:'get'
    })
}

// 获取用户自己的其他信息
export function getProfile(){
    return request({
        url:'user/profile',
        method:'get'
    })
}