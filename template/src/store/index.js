import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

// import vuex modules
import modulesDemo from './modules/demo'

Vue.use(Vuex);

const state = {

};

export default new Vuex.Store({
  modules: {
    modulesDemo
  },
  actions,
  getters,
  mutations,
});
