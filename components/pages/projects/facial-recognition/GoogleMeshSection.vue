<template>
  <FRSection ref="section" img="trump.png" model="FaceMesh" :options="options">
    <template slot="header">
      <p class="mt-1">
        <a
          target="_blank"
          href="https://google.github.io/mediapipe/"
          class="font-extrabold text-2xl"
          >Google's MediaPipe
        </a>
        offers cross-platform, customizable ML solutions for live and streaming
        media.
        <a
          href="https://drive.google.com/file/d/1VFC_wIpw4O7xBOiTgUldl79d9LA-LsnA/view"
          target="_blank"
          >MediaPipe Face Mesh</a
        >
        is a lightweight package predicting 486 3D facial landmarks to infer the
        approximate surface geometry of a human face (<a
          href="https://arxiv.org/pdf/1907.06724.pdf"
          target="_blank"
          >paper</a
        >).
        <a
          href="https://drive.google.com/file/d/1bsWbokp9AklH2ANjCfmjqEzzxO1CNbMu/view"
          target="_blank"
          >MediaPipe Iris</a
        >
        is a 3 megabyte model to predict 2D eye, eyebrow and iris geometry from
        monocular video captured by a front-facing camera on a smartphone in
        real time.
      </p>
    </template>
    <template slot="options">
      <div v-for="(value, name) in options" :key="name">
        <input
          :id="name"
          v-model="options[name]"
          class="cursor-pointer"
          :name="name"
          :type="name === 'maxFaces' ? 'number' : 'checkbox'"
          max="10"
          min="1"
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
  name: 'GoogleMeshSection',
  components: {
    FRSection,
  },
  data() {
    const imgFilename = 'trump.png'
    return {
      image: {
        name: imgFilename,
        src: this.$utils.getAsset('images/' + imgFilename),
      },
      options: {
        boundingBox: true,
        triangulate: true,
        iris: true,
        maxFaces: 1,
      },
    }
  },
  methods: {
    getOptionName(name) {
      name = name.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`)
      return name[0].toUpperCase() + name.slice(1)
    },
  },
}
</script>
