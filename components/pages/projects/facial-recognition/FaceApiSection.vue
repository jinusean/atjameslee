<template>
  <FRSection ref="section" img="biden.png" model="FaceApi" :options="options">
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
    </template>
  </FRSection>
</template>

<script>
import FRSection from '@/components/pages/projects/facial-recognition/FRSection'

export default {
  name: 'FaceApiSection',
  components: {
    FRSection,
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
  watch: {
    options() {
      this.$refs.section.reloadImg()
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
