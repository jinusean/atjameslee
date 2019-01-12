// src/store/index.js
import projects from '../database/projects.yaml'
import skills from '../database/skills.yaml'

export const state = () => ({
  projects,
  skills,
  breakpoint: 'sm'
})

export const mutations = {
  setFoo(state, foo) {
    state.foo = foo
  },
  setBreakpoint(state, breakpoint) {
    state.breakpoint = breakpoint
  }
}

export const getters = {
  getProject(state) {
    return projectId => state.projects.find(project => project.id === projectId)
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
