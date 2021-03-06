import generate from './configs/generate'
require('dotenv').config()
const isDev = process.env.NODE_ENV !== 'production'
export default {
  generate,
  server: {
    port: process.env.PORT,
    host: process.env.HOST,
  },
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'James Lee: Fullstack Developer',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/styles/site.css',
    '@/assets/styles/site.dark.css',
    '@/assets/styles/main.css',
  ],

  // Plugins to startTracking before rendering page (https://go.nuxtjs.dev/config-plugins)
  // plugins with `<filename>.client.js` will only be installed on client
  plugins: [
    '@/plugins/plugins.js',
    '@/plugins/plugins.client.js',
    '@/plugins/plugins.server.js',
    '@/plugins/globals.client.js',
    '@/plugins/database',
    // '@/plugins/faceDetection.client.js',
    '@/plugins/isMobile.client.js',
    '@/plugins/utils',
    '@/plugins/lumin.client.js',
  ],

  // Auto import base (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/google-analytics',
    ['@nuxtjs/eslint-module', { emitWarning: true }],
    '@nuxtjs/tailwindcss',
    '@nuxtjs/svg',
  ],

  modules: [
    '@nuxt/http',
    '@nuxtjs/pwa',
    '@nuxt/content',
    [
      'nuxt-rollbar-module',
      {
        clientAccessToken: process.env.ROLLBAR_CLIENT_ACCESS_TOKEN,
        config: {
          captureUncaught: true,
          captureUnhandledRejections: true,
          enabled: process.env.NODE_ENV === 'production',
          environment: process.env.NODE_ENV,
        },
      },
    ],
  ],

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  build: {
    stats: 'verbose',
    extend(config, { isClient, loaders }) {
      config.stats = 'verbose'
      config.module.rules.push({
        test: /\.y?(a)ml$/,
        use: ['js-yaml-loader'],
      })

      if (isClient && isDev) {
        config.devtool = 'eval'
      }

      config.node = {
        fs: 'empty',
      }
    },
    devMiddleware: {
      headers: {
        'Cache-Control': 'no-store',
        Vary: '*',
      },
    },
  },
  publicRuntimeConfig: {
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID,
      // dev: isDev,
    },
  },
}
