<template>
  <FRSection :image="image">
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
          type="checkbox"
        />
        <label class="capitalize cursor-pointer" :for="name">{{ name }}</label>
      </div>
    </template>
    <template slot="content">
      <div>
        <h3>Detect on an image</h3>
        <FaceImg
          :src="image.src"
          class="shadow-3xl"
          :width="width"
          :options="options"
          model="FaceMesh"
        />
      </div>

      <div>
        <h3>Detect on a video/webcam</h3>
        <FaceVideo
          camera
          model="FaceMesh"
          class="shadow-3xl"
          :height="height"
          :width="width"
          :options="options"
        />
        <!--        <MeshVideo-->
        <!--          class="shadow-3xl"-->
        <!--          :height="height"-->
        <!--          :width="width"-->
        <!--          :options="options"-->
        <!--          camera-->
        <!--        />-->
      </div>
    </template>
  </FRSection>
</template>

<script>
import FRSection from '@/components/pages/projects/facial-recognition/FRSection'
import MeshImg from '@/components/detections/GoogleMesh/MeshImg'
import FaceImg from '@/components/detections/components/FaceImg'
import MeshVideo from '@/components/detections/GoogleMesh/MeshVideo'
export default {
  name: 'GoogleMeshSection',
  components: {
    FRSection,
    MeshVideo,
    MeshImg,
    FaceImg,
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
    const imgFilename = 'trump.png'
    return {
      image: {
        name: imgFilename,
        src: this.$utils.getAsset('images/' + imgFilename),
      },
      options: {
        triangulate: true,
        iris: true,
        maxFaces: 10,
      },
    }
  },
}
</script>

<style scoped></style>
