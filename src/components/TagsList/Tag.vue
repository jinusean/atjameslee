<template>
  <span>
    <a
      v-if="tagName"
      :href="link"
      :class="className"
      rel="noreferrer">
    {{ tagName }}
  </a>
    <span v-else>{{ tag }}</span>
  </span>
</template>

<script>
import tags from '~/database/tags.yaml'

export default {
  name: 'Tag',
  props: {
    tag: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: 'tag'
    }
  },
  computed: {
    link() {
      return tags[this.tagName]
    },
    tagName() {
      const tag = this.tag.toLowerCase()

      for (const tagName in tags) {
        if (tagName.toLowerCase() === tag) {
          return tagName
        }
      }

      console.warn('Tag ' + this.tag + ' does not exist')
    }
  }
}
</script>

<style lang="scss" scoped>
.tag {
  display: inline-block;
  padding: 0.2em 0.4em;
  color: white;
  text-decoration: none;
  background: lightgrey;
  border-radius: 0.25em;
  opacity: 1;
  transition: all 300ms ease-in;
}

.tag:hover {
  background: grey;
}
</style>
