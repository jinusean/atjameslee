export const state = () => ({
  isWebView: undefined,
})

export const getters = {
  setIsWebView(state, isWebView) {
    state.isWebView = isWebView
  },
}

export const actions = {
  nuxtClientInit({ commit }, context) {
    let isWebView = false
    const userAgent = window.navigator.userAgent.toLowerCase()
    const safari = /safari/.test(userAgent)
    const ios = /iphone|ipod|ipad/.test(userAgent)
    if (ios) {
      isWebView = !safari
    } else {
      // not iOS
    }

    commit('isWebView', isWebView)
  },
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
