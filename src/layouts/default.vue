<template>
  <div class="jcl-layout">
    <jcl-navbar class="jcl-navbar"/>
    <!--<jcl-sidebar class="jcl-sidebar"/>-->
    <div class="jcl-main">
      <!--<h1>-->
      <!--<breadcrumbs-nav/>-->
      <!--</h1>-->
      <nuxt />
    </div>
  </div>
</template>

<script>
import JclNavbar from '../components/JclNavbar'
import JclSidebar from '../components/JclSidebar'
import BreadcrumbsNav from '../components/BreadcrumbsNav'
export default {
  components: { BreadcrumbsNav, JclSidebar, JclNavbar }
}
</script>

<style lang="scss" scoped>
.jcl-layout {
  display: grid;
  grid-template-areas:
    'navbar'
    'main';
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr;
  width: 1100px;
  max-width: 100%;
  min-height: 100vh;
  margin: auto;

  .jcl-navbar {
    grid-area: navbar;
    padding: $layout-padding;
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
