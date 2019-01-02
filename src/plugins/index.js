import Vue from 'vue'
import VueScrollTo from 'vue-scrollto'
import VueProgressiveImage from 'vue-progressive-image'
import VueScrollReveal from 'vue-scroll-reveal';

Vue.use(VueScrollReveal, {
  duration: 600,
  distance: '4em'
})
Vue.use(VueProgressiveImage, {
  placeholder: '/images/placeholder.png'
})
Vue.use(VueScrollTo)
