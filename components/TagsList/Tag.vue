<template>
  <a
    v-if="tagName"
    class="inline-block text-sm py-1 px-2 text-white rounded bg-gray-600 hover:opacity-75 hover:no-underline"
    :href="link"
    rel="noreferrer"
  >
    {{ tagName }}
  </a>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    tag: {
      type: String,
      required: true,
    },
  },
  computed: {
    tags() {
      return this.$db.find('tags')
    },
    link() {
      return this.tags[this.tagName]
    },
    tagName() {
      const tag = this.tag.toLowerCase()

      for (const tagName in this.tags) {
        if (tagName.toLowerCase() === tag) {
          return tagName
        }
      }

      throw new Error('Tag ' + this.tag + ' does not exist')
    },
  },
}
</script>

<style scoped>
.tag {
  display: inline-block;
  padding: 0.25em;
  color: white;
  text-decoration: none;
  background: gray;
  border-radius: 0.25em;
  opacity: 1;
  transition: all 300ms ease-in;
}

a.tag:hover {
  opacity: 0.7;
}
</style>
