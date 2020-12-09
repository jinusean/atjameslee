import Vue from 'vue'
import VueScrollReveal from 'vue-scroll-reveal'
import { VuePlugin as vueraPlugin } from 'vuera'

Vue.use(vueraPlugin)
Vue.use(VueScrollReveal, {
  duration: 1000,
  distance: `1rem`,
  easing: 'ease-out',
})
