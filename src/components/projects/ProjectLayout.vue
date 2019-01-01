<template functional>
  <div>
    <section class="project">
      <slot/>
    </section>
    <nuxt-link
      class="back-link"
      to="/projects">← See more projects</nuxt-link>
  </div>
</template>
<script>
export default {
  name: 'ProjectLayout'
}
</script>
<style lang="scss">
.back-link {
  display: block;
  font-size: 1.5em;
}
.project {
  margin-bottom: 4em;

  p {
    line-height: 1.5;
  }
}
</style>
