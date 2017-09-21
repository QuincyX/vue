import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import API from '@/api'
import * as filters from './common/filters'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
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
