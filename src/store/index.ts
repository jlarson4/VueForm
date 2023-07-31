import Vue from 'vue'
import Vuex from 'vuex'

import { getters, mutations, actions, initialStore } from '../models/store'

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
      state.reference = payload.value
    },
    [mutations.submitForm] (state, payload) {
      state.submitSuccess = payload.value
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
      state.submitSuccess = false
    }
  },
  actions: {
    [actions.submitForm] ({ commit }, payload) {
      // Is unncessary here, but in a real world scenario this would need to go out
      // to an API and await a response for successful storage/mail/usage of data
      return new Promise((resolve: (value: void) => void) => {
        setTimeout(() => {
          commit(mutations.submitForm, payload)
          resolve()
        }, 1000)
      })
    }
  },
  modules: {
  }
})
