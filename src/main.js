import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import reqtools from './request.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
// import { fab } from '@fortawesome/free-brands-svg-icons'
// import { far } from '@fortawesome/free-regular-svg-icons'
// import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/app.css'

// library.add(fas, far, fab)
library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(ElementUI)
reqtools.install(Vue)
// Vue.component('font-awesome-layers', FontAwesomeLayers)
// Vue.component('font-awesome-layers-text', FontAwesomeLayersText)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
