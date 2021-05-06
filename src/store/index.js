import Vue from 'vue'
import Vuex from 'vuex'
import CityModule from "./CityModule"
import CinemaModule from "./CinemaModule"
import TabbarModule from "./TabbarModule"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
  modules: {
    CityModule, CinemaModule, TabbarModule
  }
})
