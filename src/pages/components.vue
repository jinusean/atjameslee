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
import components from '~/utils/components'
import ComponentCard from '../components/ComponentCard'
export default {
  name: 'ComponentsPage',
  components: { ComponentCard },
  computed: {
    components() {
      return components
    }
  }
}
</script>
<style lang="scss">
</style>
