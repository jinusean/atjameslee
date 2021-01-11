<template>
  <div class="relative inline-block">
    <img ref="img" :src="src" alt="image" v-bind="$attrs" @load="load" />

    <canvas ref="canvas" class="absolute top-0 left-0 w-full h-full" />

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
        v-if="!isFaceDetected"
        class="absolute top-0 w-full px-5 cursor-pointer mt-4"
        @click="isFaceDetected = false"
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
  name: 'ImgDetect',
  components: {
    SemipolarSpinner,
  },
  inheritAttrs: false,
  props: {
    src: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isDetecting: false,
      isFaceDetected: true,
    }
  },
  computed: {
    canvas() {
      return this.$refs.canvas
    },
    img() {
      return this.$refs.img
    },
    height() {
      return this.$attrs.height
    },
    width() {
      return this.$attrs.width
    },
  },
  methods: {
    async load(event) {
      const { img, canvas } = this.$refs
      this.isFaceDetected = true
      this.isDetecting = true
      canvas.width = img.width
      canvas.height = img.height
      const detections = await this.detect({ img, canvas })
      this.isFaceDetected = detections && detections.length > 0
      this.isDetecting = false
    },
    detect({ img, canvas }) {
      return this.$listeners.detect({ img, canvas })
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
