<template>
  <div class="jcl-layout">
    <jcl-sidebar class="jcl-sidebar"/>
    <div class="jcl-main">
      <!--<h1>-->
      <!--<breadcrumbs-nav/>-->
      <!--</h1>-->
      <nuxt />
    </div>
  </div>
</template>

<script>
import JclSidebar from '../components/JclSidebar'
import BreadcrumbsNav from '../components/BreadcrumbsNav'
export default {
  components: { BreadcrumbsNav, JclSidebar }
}
</script>

<style lang="scss" scoped>
.jcl-layout {
  display: grid;
  grid-template-areas: 'sidebar main';
  grid-template-columns: auto 1fr;
  width: 1100px;
  max-width: 100%;
  min-height: 100vh;
  margin: auto;

  > * {
    /* box-sizing: border-box; */

    /* height: 100vh; */
  }

  .jcl-sidebar {
    grid-area: sidebar;
  }

  .jcl-main {
    grid-area: main;
    padding: 2em;

    h1 {
      text-transform: uppercase;
    }
  }
}

@include media-breakpoint-down(sm) {
  .jcl-layout {
    grid-template-areas: 'main';
    grid-template-columns: 100%;
    /* display: block; */
    overflow: hidden;
  }
}
</style>
