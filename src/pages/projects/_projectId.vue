<template>
  <Project :project-id="$route.params.projectId"/>
</template>

<script>
import Project from '~/components/projects/Project'

export default {
  components: { Project }
}
</script>
