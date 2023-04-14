import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    curDate: []
  },
  mutations: {
    updateCurDate(state, curDate) {
      state.curDate = curDate;
    }
  }
})