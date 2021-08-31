import service from '../utils/request'

// login 登录
export function login (data) {
  return service({
    url: 'admin_auth/login',
    method: 'post',
    data
  })
}
