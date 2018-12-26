<template>
  <div>
    <nuxt-child/>
    <component-card
      v-for="component in components"
      :component="component"
      :key="component.id" />
  </div>
</template>

<script>
import components from '~/utils/components.yaml'
import ComponentCard from '../components/font-end/ComponentCard.vue'

export default {
  name: 'FrontEndPage',
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
  margin-bottom: 1.5em;
}
</style>
