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