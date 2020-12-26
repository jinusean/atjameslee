import utils from './utils'

export default ({ app }, inject) => {
  inject('utils', utils)
}
