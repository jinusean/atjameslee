importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/059a39559058508973d6.js",
    "revision": "d8c4fddfe95a542191d56b88bb1873e6"
  },
  {
    "url": "/_nuxt/06bd1cc17958ed280c0e.js",
    "revision": "29be807b677351cdd220012f0e71400a"
  },
  {
    "url": "/_nuxt/0d45b040bf162f62c835.js",
    "revision": "10c1b409ed002f27295cf85787dda680"
  },
  {
    "url": "/_nuxt/12c244e983e98f3837e5.js",
    "revision": "78852b019d791a51822d8fcdeda8ccf1"
  },
  {
    "url": "/_nuxt/14c0e7446a4da8c1f27b.js",
    "revision": "bdb2a2079d9c6f8be3da43e50e6683a9"
  },
  {
    "url": "/_nuxt/15f18298a65d984e33bf.js",
    "revision": "83246226fc764c42953c07aeedf62f85"
  },
  {
    "url": "/_nuxt/3425ca735de29a736e65.js",
    "revision": "3659d71af753b754140d64609f6eeb7b"
  },
  {
    "url": "/_nuxt/3a87aa6ddc59022f17ce.js",
    "revision": "2c9121ae878f70d699a6462a13a7925a"
  },
  {
    "url": "/_nuxt/6aca7d2ea13bcaec7b56.js",
    "revision": "e7f636d6506ac0d40b09e10113c4bf5c"
  },
  {
    "url": "/_nuxt/6b0e1f622425ca76c4dc.js",
    "revision": "e2b743eff4bcd8cf134a56fd591fba7b"
  },
  {
    "url": "/_nuxt/72bc553a5665443d6fe9.js",
    "revision": "28b96d89a08e3c71d03c371922642803"
  },
  {
    "url": "/_nuxt/7dab86ab0fa8617e243c.js",
    "revision": "2b52d8d77c75c647ad753ce52dd9b4ff"
  },
  {
    "url": "/_nuxt/8515937a289020d1cb62.js",
    "revision": "be32470f4ecd0dffa0ece97f7ae085f4"
  },
  {
    "url": "/_nuxt/98cf5f326a9553df6312.js",
    "revision": "28b4d8b13235adf5be983afb6ef9e973"
  },
  {
    "url": "/_nuxt/99028ff7a409693fe34c.js",
    "revision": "0c4935625ecdb249109a905d0fdba45f"
  },
  {
    "url": "/_nuxt/9d7c8381740aa377daca.js",
    "revision": "b770d5ddfa6865fa108ed6e343d49494"
  },
  {
    "url": "/_nuxt/9f1d6afde5177efb47ba.js",
    "revision": "d3c9c07f5078f1f2c9a905bad301105b"
  },
  {
    "url": "/_nuxt/aa586532d362e46c86a4.js",
    "revision": "53ff0076c087a4ff88aae6c01232ea0b"
  },
  {
    "url": "/_nuxt/b2ac43a90e8f732271e8.js",
    "revision": "2dfabb3e390a6bc1c14288a5a928e989"
  },
  {
    "url": "/_nuxt/d95d0a0556b7caf999cf.js",
    "revision": "cb0f472f10955e4add58d45c6ed1d286"
  }
], {
  "cacheId": "atjameslee",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.precaching.precacheAndRoute(['/images/beauty-quotient_different-ratios.jpg', '/images/beauty-quotient_golden-rectangle.png', '/images/beauty-quotient_golden-spiral.png', '/images/beauty-quotient_megan-fox.png', '/images/beauty-quotient_mona-lisa.jpg', '/images/bitcoin.png', '/images/bittionaire-banner.jpg', '/images/bittionaire-electron.png', '/images/bittionaire-web.png', '/images/bittionaire-with-margins.png', '/images/bittionaire.png', '/images/cover-page-golden-ratio.png', '/images/eslint-plugin-jinusean.png', '/images/eslint-plugin-vue.png', '/images/imac.png', '/images/import-genius-logo.png', '/images/import-genius-site.png', '/images/import-genius.png', '/images/james.jpg', '/images/mooketplace-logo.jpg', '/images/mooketplace.jpg', '/images/node-event-loop.png', '/images/nyc', '/images/placeholder.png', '/images/react-photo-uploader.png', '/images/swaychat-banner.png', '/images/swaychat-logo.png', '/images/swaychat-site.png', '/images/swaychat.png', '/images/tagalong-banner.png', '/images/tagalong-logo.png', '/images/tagalong.png', '/images/vue-date-input.png', '/images/vuex-actions-states-devtools1.png', '/images/vuex-actions-states-devtools2.png', '/images/vuex-actions-states-store.png', '/images/vuex-actions-states.png', '/images/white-shirt.png'])

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
