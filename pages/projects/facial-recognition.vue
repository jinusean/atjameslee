<template>
  <div class="container page-container md:w-3/4 lg:w-1/2">
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

    <div class="sm:flex sm:justify-between">
      <div class="mb-8 sm:mb-0 sm:order-1 flex-1 flex justify-center">
        <div class="sm:fixed">
          <h3 class="mb-2">OPTIONS</h3>

          <div class="flex items-center space-x-2">
            <input
              id="imgInput"
              hidden
              type="file"
              accept="image/*"
              @change="onImgChange"
            />
            <SvgIcon icon="photo" />
            <label
              for="imgInput"
              class="cursor-pointer inline-block w-32 truncate"
              ><code>{{ imgFilename }}</code></label
            >
          </div>

          <div v-for="(value, name) in options" :key="name">
            <input
              :id="name"
              v-model="options[name]"
              class="cursor-pointer"
              :name="name"
              type="checkbox"
            />
            <label class="cursor-pointer" :for="name">{{
              getOptionName(name)
            }}</label>
          </div>
        </div>
      </div>

      <div class="flex flex-col items-center children:mb-8">
        <div class="cursor-pointer">
          <h3>Detect on image</h3>

          <FaceApiImg
            class="shadow-3xl"
            :src="imgSrc"
            v-bind="options"
            :height="height"
            :width="width"
          />
        </div>

        <div class="">
          <h3>Detect on video</h3>
          <FaceApiVideo
            class="shadow-3xl"
            :style="style"
            v-bind="options"
            :height="height"
            :width="width"
          />
        </div>
      </div>
    </div>

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
import FaceApiImg from '@/components/detections/FaceApi/FaceApiImg'
import FaceApiVideo from '@/components/detections/FaceApi/FaceApiVideo'
import MeshImg from '@/components/detections/GoogleMesh/MeshImg'
import MeshVideo from '@/components/detections/GoogleMesh/MeshVideo'
import SvgIcon from '@/components/base/SvgIcon'

export default {
  name: 'ProjectFacialRecognition',
  components: {
    FaceApiImg,
    TagsList,
    MeshImg,
    MeshVideo,
    FaceApiVideo,
    SvgIcon,
  },
  data() {
    const size = 320
    const imgFilename = 'biden.png'
    return {
      imgSrc: this.$utils.getAsset('images/' + imgFilename),
      imgFilename,
      options: {
        landmarks: true,
        age: true,
        boundingBox: true,
        gender: true,
        expression: true,
      },
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
  methods: {
    getOptionName(name) {
      name = name.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`)
      return name[0].toUpperCase() + name.slice(1)
    },
    onImgChange({ target }) {
      const { files } = target
      if (!files || files.length < 1) {
        return
      }
      const [file] = files
      const reader = new FileReader()

      reader.onload = (e) => {
        this.imgFilename = file.name
        this.imgSrc = e.target.result
      }

      reader.readAsDataURL(file)
    },
    openFileInputDialog() {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.onchange = (e) => {
        const reader = new FileReader()

        reader.onload = (e) => {
          this.imgSrc = e.target.result
        }

        reader.readAsDataURL(input.files[0])
      }
      input.click()
    },
  },
}
</script>

<style scoped></style>
