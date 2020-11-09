export const state = () => ({})

export const mutations = {}

export const getters = {}

export const actions = {
  fetchThis({ commit }) {
    // Will complete after 5000ms
    return new Promise((resolve) => {
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
  },
}
