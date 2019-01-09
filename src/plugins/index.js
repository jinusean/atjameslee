import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
import VueProgressiveImage from 'vue-progressive-image'
import VueScrollReveal from 'vue-scroll-reveal'

Vue.use(VueScrollReveal, {
  duration: Vue.PHI * 1000,
  distance: `${Vue.PHI * 2}rem`,
})
Vue.use(VueProgressiveImage, {
  placeholder: '/images/placeholder.png'
})
Vue.use(VueScrollTo)
