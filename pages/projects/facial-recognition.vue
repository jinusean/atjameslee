<template>
  <div>
    <!--    <TagsList v-if="project.tags" :tags="project.tags" />-->

    <FaceApiUpload />

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
import TagsList from '@/components/TagsList/TagsList'
import FaceApiUpload from '@/components/detections/face-api/FaceApiUpload'

export default {
  name: 'ProjectFacialRecognition',
  components: { FaceApiUpload, TagsList },
  computed: {
    project() {
      return this.$db.findProject(this.$route.params.id)
    },
  },
}
</script>

<style scoped></style>
