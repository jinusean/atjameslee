<template>
  <ProjectLayout>
    <figure>
      <img src="/images/mooketplace.jpg">
    </figure>
    <h1>Mooketplace</h1>

    <TagsList :tags="tags"/>

    <article v-html="article"/>
  </ProjectLayout>
</template>

<script>
import article from '../../articles/projects/mooketplace.md'
import TagsList from '~/components/TagsList'
import ProjectLayout from '~/components/projects/ProjectLayout'

export default {
  name: 'MooketplacePage',
  components: { TagsList, ProjectLayout },
  computed: {
    article() {
      return article
    },
    tags() {
      return this.$store.getters.getProject('mooketplace').tags
    }
  }
}
</script>

<style scoped>
</style>
