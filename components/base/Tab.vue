<template>
  <div v-show="$parent.activeTab === name">
    <slot />
  </div>
</template>

<script>
import Tabs from '@/components/base/Tabs'
export default {
  name: 'Tab',
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  beforeCreate() {
    if (!this.$parent || !this.$parent instanceof Tabs) {
      throw new Error('Parent must be an instance of Tabs')
    }
  },
  created() {
    this.$parent.add(this.name)
  },
  destroyed() {
    if (!this.$parent) return
    this.$parent.remove(this.name)
  },
}
</script>

<style scoped></style>
