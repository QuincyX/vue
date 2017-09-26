import axios from 'axios'

export const init = params => {
  return axios.post('/init', params)
}
