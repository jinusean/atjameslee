<template>
  <Project :project="project" :document="parsedDocument" />
</template>
<script>
import Project from '@/components/pages/projects/Project'
import parseContentDocument from '@/mixins/parseContentDocument'

export default {
  components: { Project },
  mixins: [parseContentDocument],
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
