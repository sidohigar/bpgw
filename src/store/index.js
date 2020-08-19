import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    editable: false
  },
  mutations: {
    setEdit (state, edit) {
      state.editable = edit
    }
  },
  actions: {
  },
  modules: {
  }
})
