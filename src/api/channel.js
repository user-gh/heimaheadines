import request from '@/utilis/request'

// 获取用户频道
export function channelList(){
    return request({
        url:'user/channels',
        method:'get'
    })
}

// 获取全部频道列表
export function AllchannelList(){
    return request({
        url:'channels',
        method:'get'
    })
}

// 修改指定用户频道列表
export function savechannelList(data){
    return request({
        url:'user/channels',
        method:'put',
        data
    })
}

// 批量删除用户频道列表
export function channelDel(data){
    return request({
        url:'user/channels',
        method:'DELETE',
        data
    })
}