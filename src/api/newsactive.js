import request from '@/utilis/request'

// 获取频道下的推荐列表
export function activeList(params){
    return request({
        url:'http://ttapi.research.itcast.cn/app/v1_1/articles',
        method:'get',
        params
    })
}