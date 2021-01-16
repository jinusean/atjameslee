<template>
  <div class="container page-container lg:w-3/4 xl:w-1/2">
    <h1 class="page-heading">{{ project.description }}</h1>

    <TagsList v-if="project.tags" :tags="project.tags" />

    <Tabs v-model="activeTab">
      <Tab name="FaceApi">
        <FaceApiSection />
      </Tab>
      <Tab name="MediaPipe">
        <GoogleMeshSection />
      </Tab>
    </Tabs>

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
import GoogleMeshSection from '@/components/pages/projects/facial-recognition/GoogleMeshSection'
import Tabs from '@/components/base/Tabs'
import Tab from '@/components/base/Tab'
export default {
  name: 'ProjectFacialRecognition',
  components: {
    TagsList,
    FaceApiSection,
    GoogleMeshSection,
    Tabs,
    Tab,
  },
  data() {
    return {
      activeTab: 'FaceApi',
    }
  },
  computed: {
    tabs() {
      return ['FaceApi', 'MediaPipe']
    },
    project() {
      return this.$db.findProject('facial-recognition')
    },

    style() {
      const { width, height } = this
      return {
        width: width + 'px',
        height: height + 'px',
      }
    },
  },
  methods: {
    onImgChange(files) {
      const [file] = files
      const reader = new FileReader()

      reader.onload = (e) => {
        this.image = {
          name: file.name,
          src: e.target.result,
        }
      }

      reader.readAsDataURL(file)
    },
  },
}
</script>

<style scoped></style>
