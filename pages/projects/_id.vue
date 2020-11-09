<template>
  <Project :project="project" :document="document" />
</template>
<script>
import Project from '~/components/projects/Project'

export default {
  components: { Project },
  async asyncData({ $content, params }) {
    const document = await $content(params.id).fetch()
    return { document }
  },
  computed: {
    project() {
      return this.$db.findProject(this.$route.params.id)
    },
  },
}
</script>
