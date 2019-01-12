import Vue from 'vue'
import VueScrollReveal from 'vue-scroll-reveal'

Vue.use(VueScrollReveal, {
  duration: Vue.PHI * 1000,
  distance: `${Vue.PHI * 2}rem`
})

