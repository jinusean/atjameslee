<template>
  <div v-if="$parent.activeTab === name">
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
    this.$parent.add(this)
  },
  destroyed() {
    if (!this.$parent) return
    this.$parent.remove(this)
  },
  methods: {},
}
</script>

<style scoped></style>
