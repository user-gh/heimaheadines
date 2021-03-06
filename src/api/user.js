import request from '@/utilis/request'

// 关注用户
export function followUser(data) {
    return request({
        url: 'user/followings',
        method: 'post',
        data
    })
}

// 取消用户关注
export function cancelUser(data) {
    return request({
        url: `user/followings/${data.aut_id}`,
        method: 'delete'
    })
}

// 获取用户自己的信息
export function getInfo() {
    return request({
        url: 'user',
        method: 'get'
    })
}

// 获取用户自己的其他信息
export function getProfile() {
    return request({
        url: 'user/profile',
        method: 'get'
    })
}

// 上传图片的接口
export function uploadPhoto(data) {
    // 创建FormData对象
    let fm = new FormData();
    // key叫photo,值就用我们刚刚传过来的图片
    fm.append('photo', data.photo)
    return request({
        url: 'user/photo',
        method: 'patch',
        data: fm
    })
}

// 编辑用户个人资料
export function editInfo(data) {
    return request({
        url: 'user/profile',
        method: 'patch',
        data
    })
}