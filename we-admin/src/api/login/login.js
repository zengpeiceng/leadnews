import instance from '@/utils/request.js'

export const login = data => {
    return instance({
        method: 'post',
        url: `/Login/api/v1/login/login_auth`,
        data
    })
}