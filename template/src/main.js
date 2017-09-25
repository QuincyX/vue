import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import API from '@/api'
import * as filters from './common/filters'
import * as directives from './common/directives'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key])
})

Vue.prototype.$API = API
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
