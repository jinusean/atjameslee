import pkg from './package'
import yamljs from 'yamljs'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

const idPaths = ['projects', 'packages'].reduce((paths, path) => {
  return paths.concat(
    yamljs.load(`./src/database/${path}.yaml`).map(({ id }) => `/${path}/${id}`)
  )
}, [])

const imagePaths = fs
  .readdirSync('./src/static/images')
  .map(file => `/images/${file}`)

module.exports = {
  srcDir: 'src/',
  generate: {
    routes: idPaths
  },
  router: {
    linkExactActiveClass: 'exact-active',
    linkActiveClass: 'active'
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'James Lee',
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
    'vue2-animate/dist/vue2-animate.min.css'
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/globals.js',
    '~/plugins/index.js',
    { src: '~/plugins/breakpoints.js', ssr: false },
    { src: '~/plugins/no-ssr.js', ssr: false }
  ],

  /*
   ** Nuxt.js modules
   */
  modules: [
    ['@nuxtjs/pwa'],
    ['@nuxtjs/markdownit'],
    [
      'nuxt-sass-resources-loader',
      [
        '~/assets/scss/variables.scss',
        '~/assets/bootstrap/utilities.scss',
        '~/assets/scss/mixins.scss'
      ]
    ],
    ['@nuxtjs/google-analytics', { id: process.env.GA_TRACKING_ID }]
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

      config.module.rules.push({
        test: /\.y?(a)ml$/,
        use: ['json-loader', 'yaml-loader']
      })
    }
  },
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    use: ['markdown-it-attrs']
  },
  workbox: {
    offlineAssets: imagePaths
  }
}
