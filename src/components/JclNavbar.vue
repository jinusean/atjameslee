<template>
  <nav class="jcl-navbar">
    <nuxt-link 
      to="/" 
      class="jcl-navbar__logo">James C. Lee</nuxt-link>

    <ul class="jcl-navbar__links">
      <li
        v-for="link in links"
        :key="link"
        class="jcl-navbar__link">
        <nuxt-link
          :class="getLinkClass(link)"
          :to="`/${link === 'about' ? '' : link}`">
          {{ link }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'JclNavbar',
  computed: {
    links() {
      return ['about', 'experiences', 'packages', 'projects', 'contact']
    }
  },
  methods: {
    getLinkClass(link) {
      let { path } = this.$route
      path = path.substr(1, path.length).split('/')[0]

      if (link === 'about') {
        return !path ? 'nav-active' : ''
      }

      return path.includes(link) ? 'nav-active' : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.jcl-navbar {
  display: flex;
  justify-content: space-between;
  text-transform: capitalize;

  .jcl-navbar__links {
    display: flex;
    margin: 0;

    .jcl-navbar__link:not(:last-child) {
      margin-right: 1em;
    }

    .jcl-navbar__link {
      a {
        position: relative;
      }

      a.nav-active {
        text-decoration: none;
      }

      a::before {
        position: absolute;
        content: ' ';
        bottom: 0;
        width: 100%;
        height: 0;
        background: $link-color;
        transition: transform 300ms ease-in;
      }

      a.nav-active::before {
        content: ' ';
        height: 2px;
        transform: translateY(2px);
        /*transition: all 1000ms linear;*/
      }
    }
  }
}
</style>
