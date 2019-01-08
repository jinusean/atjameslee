<template>
  <div class="jcl-navbar-container">
    <div class="jcl-navbar-desktop">
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
    </div>
  </div>
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
.jcl-navbar-container {
  width: 100%;
  height: $navbar-height;
}

.jcl-navbar-desktop {
  position: fixed;
  left: 0;
  z-index: $zindex-header;
  width: 100%;
  background: white;
  border-bottom: 1px solid $gray-200;
}

.jcl-navbar {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  max-width: $layout-width;
  height: $navbar-height;
  padding: 0 $layout-padding;
  margin: 0 auto;
  font-size: 1.2em;
  font-weight: 600;
  text-transform: capitalize;

  .jcl-navbar__links {
    display: flex;
    align-items: center;

    .jcl-navbar__link:not(:last-child) {
      margin-right: 1em;
    }

    .jcl-navbar__link {
      a {
        position: relative;
        display: block;
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
      }
    }
  }
}
</style>
