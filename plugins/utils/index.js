import utils from './utils'

export default {
  install(Vue, options) {
    Vue.prototype.$utils = utils
  },
}
