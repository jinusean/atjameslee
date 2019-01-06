<template>
  <nav class="jcl-navbar">
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
      return ['about', 'experiences', 'packages', 'projects']
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
  justify-content: flex-end;
  padding: 0 2em;
  overflow: scroll;
  font-size: 1.2em;
  text-transform: capitalize;

  .jcl-navbar__links {
    display: flex;

    /* margin: 1em 0; */

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
        bottom: 0;
        width: 100%;
        height: 0;
        content: ' ';
        background: $link-color;
        transition: transform 300ms ease-in;
      }

      a.nav-active::before {
        height: 2px;
        content: ' ';
        transform: translateY(3px);

        /* transition: all 1000ms linear; */
      }
    }
  }
}

@include media-breakpoint-down(sm) {
  .jcl-navbar {


    .jcl-navbar__links {
      overflow-x: scroll;
    }

  }
}
</style>
