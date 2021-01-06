<template>
  <div class="relative inline-block">
    <img
      ref="image"
      :src="src"
      alt="image"
      :height="height"
      :width="width"
      :style="imgStyle"
      @load="load"
    />

    <canvas ref="canvas" class="absolute top-0" />

    <div
      v-if="isDetecting"
      class="absolute left-0 top-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
    >
      <semipolar-spinner
        :animation-duration="2000"
        :size="100"
        color="#ffffff"
      />
    </div>

    <transition name="slide-down">
      <div
        v-if="isFaceNotDetected"
        class="absolute top-0 w-full px-5 cursor-pointer mt-4"
        @click="isFaceNotDetected = false"
      >
        <div
          class="rounded-2xl p-4 bg-black bg-opacity-75 text-white text-center"
        >
          <span>No faces detected</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { SemipolarSpinner } from 'epic-spinners'

export default {
  name: 'FaceApiUpload',
  components: {
    SemipolarSpinner,
  },
  props: {
    src: {
      type: String,
      default: null,
    },
    detect: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      isDetecting: false,
      isFaceNotDetected: false,
    }
  },
  computed: {
    canvas() {
      return this.$refs.canvas
    },
    image() {
      return this.$refs.image
    },
    height() {
      return this.$attrs.height || this.image.height
    },
    width() {
      return this.$attrs.width || this.image.width
    },
    imgStyle() {
      const { width, height } = this
      return { width: width + 'px', height: height + 'px' }
    },
  },
  methods: {
    async load() {
      this.isFaceNotDetected = false
      this.isDetecting = true

      const { width, height, image, canvas } = this
      image.width = width
      image.height = height
      canvas.width = width
      canvas.height = height

      const isFaceFound = await this.detect(image, canvas)
      this.isFaceNotDetected = !isFaceFound

      this.isDetecting = false
    },
  },
}
</script>

<style scoped>
.slide-down-enter-active {
  transition: all 0.3s ease;
}

.slide-down-enter {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-down-leave-to {
  opacity: 0;
}
</style>
