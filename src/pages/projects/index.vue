<template>
  <section class="projects">
    <h1>Projects</h1>
    <projects-list :projects="projects"/>
  </section>
</template>

<script>
import ProjectCard from '../../components/projects/ProjectCard.vue'
import ProjectsList from '../../components/projects/ProjectsList.vue'

export default {
  components: {
    ProjectsList,
    ProjectCard
  },
  computed: {
    projects() {
      return this.$store.state.projects
    }
  }
}
</script>

<style lang="scss" scoped>
.projects {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
</style>
