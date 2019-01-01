<template>
  <div>
    <section class="project">

      <figure class="project__image">
        <img :src="`/images/${project.images.banner}`">
      </figure>

      <h1 class="project__title">{{ project.name }}</h1>

      <TagsList
        :tags="project.tags"
        class="project__tags"/>

      <article
        class="project__article"
        v-html="article"/>
    </section>

    <nuxt-link
      class="back-link"
      to="/projects">← See more projects
    </nuxt-link>
  </div>
</template>

<script>
import TagsList from '~/components/TagsList'

export default {
  components: { TagsList },
  async asyncData({ store, params, error }) {
    const { projectId } = params
    const project = store.getters.getProject(projectId)

    if (!project) {
      return error({
        statusCode: 404,
        message: 'Project not found: ' + projectId
      })
    }
    const article = (await import(`../../articles/projects/${project.id}.md`))
      .default

    return {
      project,
      article
    }
  }
}
</script>

<style lang="scss" scoped>
.back-link {
  display: block;
  font-size: 1.5em;
}

.project {
  margin-bottom: 4em;

  p {
    line-height: 1.5;
  }
}
</style>
