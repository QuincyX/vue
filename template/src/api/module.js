import axios from 'axios'

// 分别定义api并且导出
export const testGet = params => {
  return axios.get('/api/demo', {
    params: params
  })
}
export const testPost = params => {
  return axios.post('/api/demo', params)
}
