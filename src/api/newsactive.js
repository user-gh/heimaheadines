import request from '@/utilis/request'

// 获取频道下的推荐列表
export function activeList(params){
    return request({
        url:'http://ttapi.research.itcast.cn/app/v1_1/articles',
        method:'get',
        params
    })
}

// 对文章不喜欢
export function activedislike(data){
    return request({
        url:'article/dislikes',
        method:'post',
        data
    })
}

// 举报文章
export function activereports(data){
    return request({
        url:'article/reports',
        method:'post',
        data
    })
}

// 获取文章详情
export function articleDetail(params){
    return request({
        url:`articles/${params.article_id}`,
        method:'get'
    })
}

// 对文章点赞
export function articleLike(data){
    return request({
        url:'article/likings',
        method:'post',
        data
    })
}

// 对文章取消点赞
export function articleunLike(data){
    return request({
        url:`article/likings/${data.art_id}`,
        method:'delete',
    })
}

// 对文章不喜欢
export function articleNotLike(data){
    return request({
        url:'article/dislikes',
        method:'post',
        data
    })
}

// 对文章取消不喜欢
export function articleunNotLike(data){
    console.log(data)
    return request({
        url:`article/dislikes/${data.target}`,
        method:'delete',
    })
}