<template>
  <div class="container page-container lg:w-3/4 xl:w-1/2">
    <h1 class="page-heading">{{ project.description }}</h1>

    <TagsList v-if="project.tags" :tags="project.tags" />
    <p class="mt-1">
      <a
        target="_blank"
        href="https://github.com/justadudewhohacks/face-api.js/"
        class="font-extrabold text-2xl"
        >FaceApi.js</a
      >
      is an open-source JavaScript api built on top of tensorflow.js/core. With
      tensorflow.js, FaceApi enables users to track a number of
      facial-recognition features on images, and videos (including webcam).
    </p>

    <FaceApiSection :height="height" :width="width" />

    <hr />
    <client-only>
      <nuxt-link
        v-scroll-reveal="{ origin: 'left' }"
        class="block"
        to="/projects"
      >
        ← See more projects
      </nuxt-link>
    </client-only>
  </div>
</template>

<script>
import TagsList from '@/components/TagsList/TagsList'
import FaceApiSection from '@/components/pages/projects/facial-recognition/FaceApiSection'

export default {
  name: 'ProjectFacialRecognition',
  components: {
    TagsList,
    FaceApiSection,
  },
  data() {
    const size = 320
    return {
      height: size,
      width: size,
    }
  },
  computed: {
    project() {
      return this.$db.findProject('facial-recognition')
    },
    components() {
      return {
        FaceApi: {
          img: FaceApiImg,
          video: FaceApiVideo,
          imgSrc: this.$utils.getAsset('images/biden.png'),
        },
        // 'Google Facemesh': {
        //   img: MeshImg,
        //   video: MeshVideo,
        //   imgSrc: this.$utils.getAsset('images/trump.png'),
        // },
      }
    },
    style() {
      const { width, height } = this
      return {
        width: width + 'px',
        height: height + 'px',
      }
    },
  },
}
</script>

<style scoped></style>
