import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
import VueProgressiveImage from 'vue-progressive-image'

Vue.use(VueProgressiveImage, {
  placeholder: '/images/placeholder.png'
})
Vue.use(VueScrollTo)
