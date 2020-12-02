<template>
  <section class="container page-container">
    <h1 class="page-heading">Projects</h1>
    <projects-list :projects="projects" />
  </section>
</template>

<script>
import ProjectsList from '@/components/pages/projects/ProjectsList.vue'

export default {
  components: {
    ProjectsList,
  },
  computed: {
    projects() {
      return this.$db.find('projects')
    },
  },
}
</script>
