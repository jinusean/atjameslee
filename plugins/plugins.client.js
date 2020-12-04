import Vue from 'vue'
import VueScrollReveal from 'vue-scroll-reveal'
import { VuePlugin as vueraPlugin } from 'vuera'
import VueHtml2pdf from 'vue-html2pdf'

Vue.use(VueHtml2pdf)
Vue.use(vueraPlugin)
Vue.use(VueScrollReveal, {
  duration: 1000,
  distance: `1rem`,
  easing: 'ease-out',
})
