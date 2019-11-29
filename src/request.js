import axios from 'axios'
import SERVER from './config/server.config'

let reqtools = {
  install: null
}

// function handleResponse (response, router) {
//   if (response.status === 401) {
//     router.push({ name: 'login' })
//     response['result'] = '请登录'
//     // return Promise.reject(response)
//   }
//   // } else if (response.data.hasOwnProperty('data') && response.data.hasOwnProperty('message')) {
//   //   if (response.data.message) {
//   //     response['result'] = response.data.message
//   //   } else {
//   //     response['result'] = response.data.data;
//   //     return Promise.resolve(response)
//   //   }
//   // } else {
//   //   response['result'] = '无效的数据格式'
//   // }
//   return Promise.resolve(response)
// }

reqtools.install = function (Vue, router) {
  axios.interceptors.request.use(request => {
    request.headers['X-TOKEN'] = localStorage.getItem('token')
    request.timeout = SERVER.TIMEOUT
    return request
  })
  axios.interceptors.response.use(response => {
    return response
  }, error => {
    if (error.response.status === 401) {
      return Promise.reject(error.response)
    }
    return Promise.reject(error)
  })
  Vue.prototype.$http = axios
}
export default reqtools
