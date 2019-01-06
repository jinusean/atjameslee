<template>
  <section>
    <!-- component showcase modal START -->
    <nuxt-child/>
    <!-- component showcase modal END -->

    <h1>Packages</h1>

    <component-card
      v-for="component in components"
      :component="component"
      :key="component.id" />
  </section>
</template>

<script>
import components from '~/utils/components.yaml'
import ComponentCard from '../components/font-end/ComponentCard.vue'

export default {
  name: 'Packages',
  components: { ComponentCard },
  computed: {
    components() {
      return components
    }
  }
}
</script>
<style lang="scss">
.component-card {
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
