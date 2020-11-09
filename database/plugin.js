import database from './database'

const plugin = {
  install(Vue, options) {
    Vue.prototype.$db = database
  },
}

export default plugin
