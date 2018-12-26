// src/store/index.js

export const state = () => ({
  foo: ''
})

export const mutations = {
  setFoo(state, foo) {
    state.foo = foo
  }
}

export const actions = {
  async fetchThis({ commit }) {
    // Will complete after 5000ms
    return new Promise(resolve => {
      setTimeout(() => {
        commit('setFoo', 'bar')
        resolve()
      }, 5000)
    })
  },

  fetchThat() {
    // Will completed immediately
  },

  dontFetch() {
    // Will not be called
  }
}

