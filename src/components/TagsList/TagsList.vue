<template>
  <ul class="tags-list">
    <li
      v-for="tag in tags"
      :key="tag"
      class="tags-list__list-item">
      <Tag :tag="tag"/>
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
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-list {
  .tags-list__list-item {
    display: inline-block;
  }

  .tags-list__list-item:not(:last-child) {
    margin-right: 0.5em;
    margin-bottom: 0.5em;
  }
}
</style>
