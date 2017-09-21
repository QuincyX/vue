import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

// 引入vuex的模块
import moduleDemo from './modules/module'

Vue.use(Vuex)

// 全局状态
const state = {}

export default new Vuex.Store({
  modules: {
    moduleDemo
  },
  actions,
  getters,
  mutations,
});
