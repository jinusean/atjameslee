<template>
  <div v-if="project">
    <section :class="`project project-${projectId}`">

      <div
        v-if="!$slots.header"
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
      <slot name="header"/>


      <TagsList
        v-if="project.tags"
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

    <no-ssr>
      <nuxt-link
        v-scroll-reveal="{origin: 'left' }"
        class="back-link"
        to="/projects">← See more projects
      </nuxt-link>
    </no-ssr>
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
  margin-bottom: calc(1.6 * 1.6rem);
  font-size: 1.5em;
}

.project {
  min-height: 100vh;
  margin-bottom: 4rem;

  p {
    line-height: 1.5;
  }

  li {
    margin-bottom: 0.5em;
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
    margin-top: 4rem;
  }

  .img-site {
    border: 1px solid $gray-200;
  }
}

@include media-breakpoint-up(md) {
  .img-md {
    // p tag
    width: 75%;
    margin: auto;
  }

  .img-sm {
    // p tag
    width: 50%;
    margin: auto;
  }
}
</style>
<style src="~/assets/scss/projects/swaychat.scss" lang="scss">
</style>
<style src="~/assets/scss/projects/tagalong.scss" lang="scss"/>
<style src="~/assets/scss/projects/beauty-quotient.scss" lang="scss"/>
<style src="~/assets/scss/projects/import-genius.scss" lang="scss"/>
<style src="~/assets/scss/projects/panas.scss" lang="scss" />