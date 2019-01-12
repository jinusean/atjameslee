import Vue from 'vue'
import VueScrollReveal from 'vue-scroll-reveal'

Vue.use(VueScrollReveal, {
  duration: Vue.PHI * 500,
  distance: `${Vue.PHI * 2}rem`,
  easing: 'ease-out'
})
