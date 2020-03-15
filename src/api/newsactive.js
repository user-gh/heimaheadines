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
