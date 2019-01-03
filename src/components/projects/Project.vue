<template>
  <div v-if="project">
    <section :class="`project project__${projectId}`">

      <div 
        ref="header" 
        class="project__header">
        <figure class="project__banner">
          <img
            ref="banner"
            :src="`/images/${project.images.banner}`">
        </figure>

        <h1
          ref="title"
          class="project__title">{{ project.name }}</h1>
      </div>


      <TagsList
        :tags="project.tags"
        class="project__tags"/>

      <article
        class="project__article"
        v-html="article"/>
    </section>

    <nuxt-link
      v-scroll-reveal="{origin: 'left' }"
      class="back-link"
      to="/projects">← See more projects
    </nuxt-link>
  </div>
</template>
<script>
import TagsList from '~/components/TagsList'

export default {
  name: 'Project',
  components: { TagsList },
  props: {
    projectId: {
      type: String,
      required: true
    }
  },
  data() {
    return { article: null }
  },
  computed: {
    project() {
      return this.$store.getters.getProject(this.projectId)
    }
  },
  async created() {
    if (!this.project) {
      return $nuxt.error({
        statusCode: 404,
        message: 'Project not found: ' + projectId
      })
    }
    this.article = (await import(`../../articles/projects/${
      this.projectId
    }.md`)).default
  }
}
</script>
<style lang="scss">
.back-link {
  display: block;
  font-size: 1.5em;
}

.project {
  margin-bottom: 4em;

  p {
    line-height: 1.5;
  }

  img {
    max-width: 100%;
  }
}
</style>
