import Vue from 'vue'
import { VuePlugin as dbPlugin } from '@/database'
import utils from './utils'

Vue.use(dbPlugin)
Vue.use(utils)
