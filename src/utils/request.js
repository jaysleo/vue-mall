import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'
import NProgerss from 'nprogress'
import 'nprogress/nprogress.css'
import {getApiUrl} from '@/utils/utils'

// 异常错误
const codeMessage = {
  402: '请求次数限制',
  403: '没有权限访问页面',
  404: '页面不存在',
  401: '跳转登录',
  500: '程序异常'
}
const service = axios.create({
  baseURL: getApiUrl(),
  timeout: 5000
})
// 请求前拦截器
service.interceptors.request.use(config => {
  // 请求头添加token
  NProgerss.start() 
  const token = sessionStorage.getItem('token')
  if (token) {
    // config.headers.Authorization = token
    // config.headers.token = token
    config.headers['X-token'] = token;
  }
  return config
}, error => {
  return Promise.reject(error)
})
// 请求后的拦截器
service.interceptors.response.use(response => {
  NProgerss.done()
  // 异常的处理
  // console.log('response位', response)
  // if (response.status === 200) {
  //   if (response.data)
  // }
  return response
}, error => {
  const data = error.response;
  if (data.status === 401) {
    Message.error('请重新登陆')
    router.push('/login')
  }
  if (data) {
    const msg = codeMessage[data.status] || '未知错误'
    Message.error(msg)
    return Promise.reject(data)
  }
  return Promise.reject(error)
})
export default service
