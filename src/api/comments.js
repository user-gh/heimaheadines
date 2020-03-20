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

//对评论点赞
export function CommentLike(data){
    return request({
        url:'comment/likings',
        method:'post',
        data
    })
}

// 取消评论点赞
export function CommentunLike(data){
    return request({
        url:`comment/likings/${data.target}`,
        method:'delete'
    })
}