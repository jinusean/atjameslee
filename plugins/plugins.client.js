import Vue from 'vue'
import VueScrollReveal from 'vue-scroll-reveal'
import { VuePlugin as vueraPlugin } from 'vuera'

Vue.use(vueraPlugin)
Vue.use(VueScrollReveal, {
  duration: Vue.PHI * 500,
  distance: `${Vue.PHI * 2}rem`,
  easing: 'ease-out',
})
