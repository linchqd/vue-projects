import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import VueTablePagination from 'vue-table-pagination'
import httpTools from './request.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/app.css'

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(ElementUI)
Vue.use(VueTablePagination)
httpTools.install(Vue, router)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
