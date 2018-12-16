<template>
  <div class="jcl-main">
    <h1>{{ section }}</h1>
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'JclMain',
  computed: {
    section() {
      const path = this.$route.path.substr(1).split('/')[0]
      return path ? path : 'about'
    }
  }
}
</script>

<style lang="scss" scoped>
.jcl-main {
  overflow: auto;

  > h1 {
    color: black;
    text-transform: capitalize;
  }
}
</style>
