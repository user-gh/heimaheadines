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
