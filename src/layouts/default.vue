<template>
  <div class="jcl-layout">
    <jcl-sidebar class="jcl-sidebar"/>
    <jcl-main class="jcl-main"/>
  </div>
</template>

<script>
import JclSidebar from '../components/JclSidebar'
import JclMain from '../components/JclMain'
export default {
  components: { JclMain, JclSidebar }
}
</script>

<style lang="scss" scoped>
.jcl-layout {
  display: grid;
  grid-template-areas: 'sidebar main';
  grid-template-columns: auto 1fr;

  > * {
    box-sizing: border-box;
    height: 100vh;
    padding: 2em;
  }

  .jcl-sidebar {
    grid-area: sidebar;
  }

  .jcl-main {
    grid-area: main;
  }
}
</style>
