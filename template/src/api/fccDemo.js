import axios from 'axios'


let http = axios.create({
  baseURL: 'http://api.zzcowboy.com'
})

// 跨域请求携带cookie
// http.defaults.withCredentials = true

// request拦截器
http.interceptors.request.use(config => {
  config.headers['X-Powered-By'] = 'wx:likequincy'
  return config
}, err => {
  console.log('error')
  console.log(err)
  return Promise.reject(err)
})

// response拦截器
http.interceptors.response.use(
  response => {
    if (response.data.errno && response.data.errno !== 0) {
      console.log('%c>>>%c>>>%c>>>%c>>>%c>>>%c>>>%c>>>', 'color: #e74c3c', 'color: #e67e22', 'color: #f1c40f', 'color: #2ecc71', 'color: #1abc9c', 'color: #3498db', 'color: #9b59b6')
      console.log('出错了哦，' + response.data.errmsg)
      return Promise.reject(response.data)
    } else {
      return Promise.resolve(response.data)
    }
  },
  error => {
    console.log('%c>>>%c>>>%c>>>%c>>>%c>>>%c>>>%c>>>', 'color: #e74c3c', 'color: #e67e22', 'color: #f1c40f', 'color: #2ecc71', 'color: #1abc9c', 'color: #3498db', 'color: #9b59b6')
    console.log(error.response)
    return Promise.reject(error)
  }
)

export default http
