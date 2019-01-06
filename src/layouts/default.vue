<template>
  <div class="container">
    <div class="jcl-layout">
      <jcl-navbar class="jcl-navbar"/>

      <div class="jcl-main">
        <nuxt />
      </div>
    </div>
    <jcl-footer/>
  </div>
</template>

<script>
import JclNavbar from '../components/JclNavbar'
import JclSidebar from '../components/JclSidebar'
import JclFooter from '../components/JclFooter'
export default {
  components: { JclSidebar, JclNavbar, JclFooter }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
}
.jcl-layout {
  display: grid;
  flex: 1;
  grid-template-areas:
    'navbar'
    'main';
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
  width: 1100px;
  max-width: 100%;
  margin: auto;

  .jcl-navbar {
    grid-area: navbar;
  }

  .jcl-sidebar {
    grid-area: sidebar;
    width: 200px;
    padding: $layout-padding;
  }

  .jcl-main {
    grid-area: main;
    width: 100%;
    padding: $layout-padding;

    h1 {
      text-transform: uppercase;
    }
  }
}

@include media-breakpoint-down(sm) {
  .jcl-layout {
    grid-template-areas:
      'navbar'
      'main';
    grid-template-columns: 100%;

    /* display: block; */
    overflow: hidden;
  }
}
</style>
