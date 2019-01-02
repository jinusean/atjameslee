<template>
  <aside class="sidebar">
    <nav>
      <ul>
        <li 
          v-for="section in sections"
          :key="section">
          <nuxt-link 
            :to="section === 'about' ? '/' : `/${section}`"
            :class="getLinkClass(section)"
            class="section-link">
            {{ section }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>
<script>
import JclAvatar from './JclAvatar'

export default {
  name: 'JclSidebar',
  components: { JclAvatar },
  computed: {
    sections() {
      return ['about', 'experiences', 'packages', 'projects', 'contact']
    }
  },
  methods: {
    getLinkClass(section) {
      let { path } = this.$route
      path = path.substr(1, path.length).split('/')[0]

      if (section === 'about') {
        return !path ? 'active' : ''
      }

      return path.includes(section) ? 'active' : ''
    }
  }
}
</script>
<style lang="scss">
.sidebar {
  position: relative;
  width: 100%;

  /* height: 100vh; */

  nav {
    position: sticky;
    top: 12em;

    /* bottom: 0; */

    /* left: 0; */

    /* display: flex; */

    /* flex-direction: column; */

    /* justify-content: center; */

    /* width: inherit; */

    ul {
      padding: 0;
      margin: 0;
      font-size: 1.2em;

      /* text-align: center; */
      list-style: none;

      li {
        margin-bottom: 1em;

        .section-link {
          text-transform: capitalize;
        }
      }
    }
  }
}
</style>
<style lang="scss">
@include media-breakpoint-down(sm) {
  .sidebar {
    display: none;
  }
}
</style>
