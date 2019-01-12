importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/059a39559058508973d6.js",
    "revision": "d8c4fddfe95a542191d56b88bb1873e6"
  },
  {
    "url": "/_nuxt/0d45b040bf162f62c835.js",
    "revision": "10c1b409ed002f27295cf85787dda680"
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
    "url": "/_nuxt/17731fb1f766291c415e.js",
    "revision": "02fa8985f98666e753c68131390abb33"
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
    "url": "/_nuxt/3c64275b1d2263244507.js",
    "revision": "a16520088a5144c70d2677ce7df721ee"
  },
  {
    "url": "/_nuxt/619b06faba455efa3527.js",
    "revision": "4dc3535120f10fd2269f51ba71bd4894"
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
    "url": "/_nuxt/aa586532d362e46c86a4.js",
    "revision": "53ff0076c087a4ff88aae6c01232ea0b"
  },
  {
    "url": "/_nuxt/d95d0a0556b7caf999cf.js",
    "revision": "cb0f472f10955e4add58d45c6ed1d286"
  },
  {
    "url": "/_nuxt/f087d2aa8320301e0d37.js",
    "revision": "ca9a56b1d77428161f5842a39e4104c9"
  },
  {
    "url": "/_nuxt/f4c73b5ef78fc1445efc.js",
    "revision": "be5597a7a24790e8fcb878c8d564cc7b"
  }
], {
  "cacheId": "atjameslee",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
