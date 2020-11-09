<template>
  <ul class="-mr-2 -mb-2">
    <li v-for="tag in tags" :key="tag" class="inline-block mr-2 mb-2">
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
  },
}
</script>
