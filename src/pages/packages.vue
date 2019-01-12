<template>
  <section>
    <!-- component showcase modal START -->
    <no-ssr>
      <nuxt-child/>
    </no-ssr>
    <!-- component showcase modal END -->

    <h1>Packages</h1>

    <package-card
      v-for="p in packages"
      :data="p"
      :key="p.id" />
  </section>
</template>

<script>
import PackageCard from '../components/font-end/PackageCard.vue'

export default {
  name: 'Packages',
  components: { PackageCard },
  computed: {
    packages() {
      return this.$store.state.packages
    }
  }
}
</script>
<style lang="scss">
.package-card {
  margin-bottom: 2em;
}

// used in modal
.modal-row {
  margin-bottom: 1.5em;

  h3 {
    margin: 0 0 1em 0;
    font-style: italic;
  }

  .modal-row__content {
    display: grid;
    grid-template-columns: 9em auto;
    grid-gap: 2em;

    img {
      max-width: 100%;
      max-height: 16em;
    }

    p {
      max-width: 30em;
      margin: 0;
    }
  }
}
</style>
