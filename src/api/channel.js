import request from '@/utilis/request'

// 获取用户频道
export function channelList(){
    return request({
        url:'user/channels',
        method:'get'
    })
}