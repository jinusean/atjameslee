<template>
  <div v-show="$parent.activeTab === name">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Tab',
  props: {
    name: {
      type: String,
      required: true,
    },
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
