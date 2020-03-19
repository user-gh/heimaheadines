import request from '@/utilis/request'

// 获取评论或评论回复
export function getComments(params){
    return request({
        url:'comments',
        method:'get',
        params
    })
}

// 添加评论或评论回复
export function AddComments(data){
    return request({
        url:'comments',
        method:'post',
        data
    })
}

