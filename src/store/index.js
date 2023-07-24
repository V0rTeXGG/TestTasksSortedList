import { createStore } from 'vuex'

export default createStore({
  state: {
    isChecked: false,
  },
  getters: {
  },
  mutations: {
    toggleChecked(state, value) {
      state.isChecked = value;
    },
  },
  actions: {
  },
  modules: {
  }
})
