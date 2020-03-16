import request from '@/utilis/request'

// 获取联想词汇
export function getSuggest(params){
    return request({
        url:'suggestion',
        method:'get',
        params
    })
}

// 获取搜索结果
export function getSearchResult(params){
    return request({
        url:'search',
        method:'get',
        params
    })
}