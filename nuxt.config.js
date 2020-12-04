require('dotenv').config()

export default {
  server: {
    port: 8080, // default: 3000
    host: '0.0.0.0', // default: localhost
  },
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'James Lee',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/styles/site.css', '@/assets/styles/main.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  // plugins with `<filename>.client.js` will only be installed on client
  plugins: ['@/plugins/plugins.js', '@/plugins/plugins.client.js'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    ['@nuxtjs/eslint-module', { emitWarning: true }],
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    'nuxt-client-init-module',
    // https://go.nuxtjs.dev/axios
    '@nuxt/http',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
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

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Content module configuration (https://go.nuxtjs.dev/config-content)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    stats: 'verbose',
    extend(config, { isClient, loaders }) {
      config.stats = 'verbose'
      config.module.rules.push({
        test: /\.y?(a)ml$/,
        use: ['js-yaml-loader'],
      })

      if (isClient) {
        // config.devtool = 'eval'
      }

      config.watchOptions = {
        ignored: '/components/EatMe/brfv5_js_tk121020_v5.2.0_trial.js',
      }

      config.node = {
        fs: 'empty',
      }
    },
  },
}
