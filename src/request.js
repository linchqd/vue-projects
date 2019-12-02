import axios from 'axios'
import SERVER from './config/server.config'

let httpTools = {
  install: null
}
// 处理response并返回结果
function parseResponse (response, router) {
  if (response.status === 401) {
    router.push({ name: 'login' })
    response['res'] = response.data.message
  } else if (response.status === 403) {
    router.push({ name: 'deny' })
    response['res'] = response.data.message
  } else if (response.status === 404) {
    router.push({ name: 'notFound' })
    response['res'] = response.data.message
  } else if (response.data.hasOwnProperty('message')) {
    response['res'] = response.data.message
  } else if (response.data.hasOwnProperty('data')) {
    response['res'] = response.data.data
    return Promise.resolve(response)
  } else {
    response['res'] = '未知错误'
  }
  return Promise.reject(response)
}

function deepCopy (obj) {
  let result = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        result[key] = deepCopy(obj[key])
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}

// assert login in
function loggedIn () {
  let token = localStorage.getItem('token')
  return token && token.length === 32
}

httpTools.install = function (Vue, router) {
  // 请求前加token
  axios.interceptors.request.use(request => {
    request.headers['X-TOKEN'] = localStorage.getItem('token')
    request.timeout = SERVER.TIMEOUT
    return request
  })
  // 返回结果处理
  axios.interceptors.response.use(response => {
    return parseResponse(response, router)
  }, error => {
    return parseResponse(error.response, router)
  })
  Vue.prototype.$http = axios
  Vue.prototype.$deepCopy = deepCopy
  Vue.prototype.$custom_message = function (type, message) {
    this.$message({
      showClose: true,
      duration: 5000,
      message: message,
      type: type
    })
  }
  Vue.prototype.assert_permission = function (permission) {
    if (localStorage.getItem('is_super') === 'true') {
      return true
    }
  }
  router.beforeEach((to, from, next) => {
    if (['/login', '/deny'].includes(to.path)) {
      next()
    } else if (to.matched.some(record => record.meta.permission)) {
      if (!loggedIn()) {
        next({
          name: 'login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    } else {
      next() // 确保一定要调用 next()
    }
  })
}
export default httpTools
