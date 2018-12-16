import pkg from './package'
import fs from 'fs'

module.exports = {
  srcDirectory: 'src/',
  mode: 'spa',
  srcDir: 'src/',
  generate: {
    routes: ['/', '/dicks', '/eyes']
  },
  router: {
    // linkExactActiveClass: 'active'
  },
  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  /*
   ** Global CSS
   */
  css: [
    'normalize.css',
    '~/assets/scss/main.scss',
    '~/assets/scss/styles.scss',
    'vue2-animate/dist/vue2-animate.min.css',
    'element-ui/lib/theme-chalk/index.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/index.js'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    [
      'nuxt-sass-resources-loader',
      ['~/assets/scss/variables.scss', '~/assets/bootstrap/variables.scss']
    ]
  ],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, { isClient }) {
      if (isClient) {
        config.devtool = '#source-map'
      }
    }
  }
}
