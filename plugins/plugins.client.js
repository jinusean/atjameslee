import Vue from 'vue'
import VueScrollReveal from 'vue-scroll-reveal'
import { VuePlugin as vueraPlugin } from 'vuera'
import VueRecord from '@codekraft-studio/vue-record'

Vue.use(VueRecord)
Vue.use(vueraPlugin)
Vue.use(VueScrollReveal, {
  duration: 1000,
  distance: `1rem`,
  easing: 'ease-out',
})
