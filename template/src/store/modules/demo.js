const state = {
  msg: 'hello quincy',
};
const getters = {
  msg: state => state.msg,
};
const actions = {

};
const mutations = {
  setMsg(state, value) {
    state.msg = value
  },
};
export default {
  state,
  getters,
  actions,
  mutations,
};
