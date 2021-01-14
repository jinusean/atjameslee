<template>
  <ul class="-mr-2 -mb-2">
    <li v-for="tag in sortedTags" :key="tag" class="inline-block mr-2 mb-2">
      <Tag :tag="tag" />
    </li>
  </ul>
</template>

<script>
import Tag from './Tag'

export default {
  name: 'TagsList',
  components: { Tag },
  props: {
    tags: {
      type: Array,
      required: true,
    },
    sort: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    sortedTags() {
      if (!this.sort) return this.tags
      return this.tags.concat().sort((a, b) => {
        return a.toLowerCase() < b.toLowerCase() ? -1 : 1
      })
    },
  },
}
</script>
