<template>
  <FRSection v-model="image">
    <template slot="header">
      <p class="mt-1">
        <a
          target="_blank"
          href="https://github.com/justadudewhohacks/face-api.js/"
          class="font-extrabold text-2xl"
          >FaceApi.js</a
        >
        is an open-source JavaScript api built on top of tensorflow.js/core.
        With tensorflow.js, FaceApi enables users to track a number of
        facial-recognition features on images, and videos (including webcam).
      </p>
    </template>
    <template slot="options">
      <div v-for="name in filteredOptionNames" :key="name">
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
    </template>

    <template slot="content">
      <div>
        <h3>Detect on image</h3>

        <FaceApiImg
          class="shadow-3xl"
          :src="image.src"
          :options="options"
          :width="width"
        />
      </div>

      <div>
        <h3>Detect on video</h3>
        <FaceApiVideo
          class="shadow-3xl"
          :options="videoOptions"
          :height="height"
          :width="width"
        />
      </div>
    </template>
  </FRSection>
</template>

<script>
import FRSection from '@/components/pages/projects/facial-recognition/FRSection'
import FaceApiVideo from '@/components/detections/FaceApi/FaceApiVideo'
import FaceApiImg from '@/components/detections/FaceApi/FaceApiImg'

export default {
  name: 'FaceApiSection',
  components: {
    FRSection,
    FaceApiImg,
    FaceApiVideo,
  },
  props: {
    height: {
      required: true,
      type: Number,
    },
    width: {
      required: true,
      type: Number,
    },
  },
  data() {
    const imgFilename = 'biden.png'
    return {
      image: {
        name: imgFilename,
        src: this.$utils.getAsset('images/' + imgFilename),
      },
      options: {
        age: true,
        boundingBox: true,
        expression: true,
        gender: true,
        landmarks: true,
        multiple: true,
      },
    }
  },
  computed: {
    filteredOptionNames() {
      return Object.keys(this.options).filter((name) => name !== 'multiple')
    },
    videoOptions() {
      return { ...this.options, mirror: true }
    },
  },
  methods: {
    getOptionName(name) {
      if (name === 'multiple') return 'Multiple faces'
      name = name.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`)
      return name[0].toUpperCase() + name.slice(1)
    },
  },
}
</script>

<style scoped></style>
