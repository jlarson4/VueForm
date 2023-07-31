import Vue from 'vue'
import Vuex from 'vuex'

import { mutations, getters, initialStore } from '../models/store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: initialStore,
  getters: {
    [getters.description] (state) {
      return state.description
    },
    [getters.fullname] (state) {
      return state.name
    },
    [getters.telephone] (state) {
      return state.telephone
    },
    [getters.interest] (state) {
      return state.interest
    },
    [getters.reference] (state) {
      return state.reference
    }
  },
  mutations: {
    [mutations.description] (state, payload) {
      state.description = payload.value
    },
    [mutations.fullname] (state, payload) {
      state.name = payload.value
    },
    [mutations.telephone] (state, payload) {
      state.telephone = payload.value
    },
    [mutations.interest] (state, payload) {
      state.interest = payload.value
    },
    [mutations.reference] (state, payload) {
      const valueIndex = state.reference.indexOf(payload.value)
      if (valueIndex > -1) {
        state.reference.splice(valueIndex, 1)
      } else {
        state.reference.push(payload.value)
      }
    },
    [mutations.validateField] (state) {
      state.validFields++
    },
    [mutations.invalidateField] (state) {
      state.validFields--
    },
    [mutations.clearForm] (state) {
      state.validFields = 0
      state.description = ''
      state.name = ''
      state.telephone = ''
      state.interest = ''
      state.reference = []
    }
  },
  actions: {
  },
  modules: {
  }
})
