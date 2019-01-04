<template>
  <div v-if="project">
    <section :class="`project project-${projectId}`">

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
        v-if="article"
        class="project__article"
        v-html="article"/>
      <p
        v-else
        class="project__article-coming-soon">
        COMING SOON!
      </p>
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
    try {
      this.article = (await import(`../../articles/projects/${
        this.projectId
      }.md`)).default
    } catch (error) {
      console.warn(error)
    }
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

  // img captions
  em {
    font-size: 0.8em;
    font-style: normal;
  }

  img {
    display: block;
    width: 100%;
    max-width: 100%;
    margin: auto;
  }

  .project__footer {
    margin-top: 4em;
  }
}

@include media-breakpoint-up(md) {
  .img-md {
    // p tag
    width: 75%;
    margin: auto;
  }
}
</style>

<style lang="scss">
.project.project-tagalong {
  .project__banner {

    img {
      height: 8em;
      width: auto;
    }
  }
}
</style>
