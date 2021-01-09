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
  name: 'ImgDetection',
  components: {
    SemipolarSpinner,
  },
  props: {
    src: {
      type: String,
      default: null,
    },
    model: {
      type: String,
      required: true,
      validate(model) {
        return ['faceapi', 'facemesh'].includes(model)
      },
    },
  },
  data() {
    return {
      isDetecting: false,
      isFaceNotDetected: false,
      detector: null,
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
  watch: {
    options() {
      this.load()
    },
  },
  methods: {
    async load() {
      const { img: element, canvas } = this
      this.isFaceNotDetected = false
      this.isDetecting = true
      canvas.width = element.width
      canvas.height = element.height

      const isFaceFound = await this.$listeners.detect({ element, canvas })
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
