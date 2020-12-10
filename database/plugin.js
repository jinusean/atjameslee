import Database from './Database'

const plugin = {
  install(Vue, options) {
    Vue.prototype.$db = new Database()
  },
}

export default plugin
