import Database from './database'

const plugin = {
  install(Vue, options) {
    Vue.prototype.$db = new Database()
  },
}

export default plugin
