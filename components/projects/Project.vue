<template>
  <div class="container page-container">
    <figure v-if="!project.hideBanner" class="mb-4 flex justify-center">
      <img
        ref="banner"
        :class="project.bannerClass || ''"
        :src="`/images/${project.images.banner}`"
        :alt="project.images.banner"
      />
    </figure>

    <h1 v-if="!project.hideTitle" class="page-heading">
      {{ project.name }}
    </h1>

    <TagsList v-if="project.tags" :tags="project.tags" />
    <hr />
    <nuxt-content v-if="document" :document="document" as />
    <p v-else>COMING SOON!</p>

    <hr />
    <client-only>
      <nuxt-link
        v-scroll-reveal="{ origin: 'left' }"
        class="block"
        to="/projects"
        >← See more projects
      </nuxt-link>
    </client-only>
  </div>
</template>
<script>
import TagsList from '~/components/TagsList'

export default {
  name: 'Project',
  components: { TagsList },
  props: {
    project: {
      type: Object,
      required: true,
    },
    document: {
      type: Object,
      required: true,
    },
  },
}
</script>
