import axios from 'axios'

// 引入API模块
import * as moduleAPI from './module'

// 跨域请求携带cookie
axios.defaults.withCredentials = true

// 全局根域名
axios.defaults.baseURL = ''

// request拦截器
axios.interceptors.request.use(config => {
  config.headers['X-Powered-By'] = 'wx:likequincy'
  return config
}, err => {
  console.log('error')
  console.log(err)
  return Promise.reject(err)
})

// response拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.errno !== 0) {
      console.log('%c>>>%c>>>%c>>>%c>>>%c>>>%c>>>%c>>>', 'color: #e74c3c', 'color: #e67e22', 'color: #f1c40f', 'color: #2ecc71', 'color: #1abc9c', 'color: #3498db', 'color: #9b59b6')
      console.log('出错了哦，' + response.data.errmsg)
      return Promise.reject(response.data)
    } else {
      return response
    }
  },
  error => {
    console.log('%c>>>%c>>>%c>>>%c>>>%c>>>%c>>>%c>>>', 'color: #e74c3c', 'color: #e67e22', 'color: #f1c40f', 'color: #2ecc71', 'color: #1abc9c', 'color: #3498db', 'color: #9b59b6')
    console.log(error.response)
    return Promise.reject(error)
  }
)

// 导出各模块合并后的对象
export default Object.assign(moduleAPI)
