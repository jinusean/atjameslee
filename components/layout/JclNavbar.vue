<template>
  <div
    class="w-full border-b overflow-x-scroll bg-white bg-opacity-75 fixed top-0"
  >
    <nav
      class="h-16 w-container flex justify-center sm:justify-between items-center capitalize min-w-max-content sm:container"
    >
      <nuxt-link to="/" class="hidden sm:block">
        <img class="h-8" src="/icon.png" alt="james lee" />
      </nuxt-link>

      <ul class="w-full sm:w-auto flex items-center justify-between space-x-4">
        <li v-for="link in links" :key="link" class="inline-block">
          <nuxt-link
            :class="getLinkClass(link)"
            :to="`/${link === 'about' ? '' : link}`"
          >
            {{ link }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'JclNavbar',
  computed: {
    links() {
      return ['about', 'experiences', 'packages', 'projects']
    },
  },
  methods: {
    getLinkClass(link) {
      let { path } = this.$route
      path = path.substr(1, path.length).split('/')[0]

      if (link === 'about') {
        return !path ? 'nav-active' : ''
      }

      return path.includes(link) ? 'nav-active' : ''
    },
  },
}
</script>

<style scoped>
.navbar-icon {
  background-size: contain;
  background: url('/icon.png') no-repeat;
}

a.nav-active {
  font-weight: bold;
}

a.nav-active {
  text-decoration: none;
}

/*a {*/
/*  position: relative;*/
/*  display: block;*/
/*}*/
/*a::before {*/
/*  position: absolute;*/
/*  bottom: 0;*/
/*  width: 100%;*/
/*  height: 0;*/
/*  content: ' ';*/
/*  background: #800080;*/
/*  transition: transform 300ms ease-in;*/
/*}*/
/*a.nav-active::before {*/
/*  height: 2px;*/
/*  content: ' ';*/
/*  transform: translateY(3px);*/
/*}*/
/*.jcl-navbar__links {*/
/*  display: flex;*/
/*  align-items: center;*/
/*}*/

/*.jcl-navbar__link:not(:last-child) {*/
/*  margin-right: 1em;*/
/*}*/

/*.jcl-navbar__link {*/
/*}*/
/*a {*/
/*  position: relative;*/
/*  display: block;*/
/*}*/

/*a.nav-active {*/
/*  text-decoration: none;*/
/*}*/

/*a::before {*/
/*  position: absolute;*/
/*  bottom: 0;*/
/*  width: 100%;*/
/*  height: 0;*/
/*  content: ' ';*/
/*  background: $ link-color;*/
/*  transition: transform 300ms ease-in;*/
/*}*/

/*a.nav-active::before {*/
/*  height: 2px;*/
/*  content: ' ';*/
/*  transform: translateY(3px);*/
/*}*/
</style>
