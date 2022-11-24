import instance from '@/utils/request.js'

export const login = data => {
    return instance({
        method: 'post',
        url: "/login",
        data
    })
}