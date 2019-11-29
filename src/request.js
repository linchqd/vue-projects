import axios from 'axios'
import SERVER from './config/server.config'

let reqtools = {
  install: null
}
reqtools.install = function (Vue) {
  axios.interceptors.request.use(request => {
    // if (request.url.startsWith('/api/')) {
    //   request.headers['X-TOKEN'] = localStorage.getItem('token')
    // }
    request.headers['X-TOKEN'] = localStorage.getItem('token')
    request.timeout = SERVER.TIMEOUT
    return request
  })
  Vue.prototype.$http = axios
}
export default reqtools
