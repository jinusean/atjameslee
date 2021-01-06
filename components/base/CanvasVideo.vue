<template>
  <div class="relative">
    <video
      ref="video"
      muted
      playsinline
      autoplay
      :height="height"
      :width="width"
      :src="src"
      :style="videoStyle"
      @loadedmetadata="onLoadedmetadata"
    ></video>
    <canvas ref="canvas" class="absolute top-0" />
    <canvas v-if="useOverlay" ref="overlay" class="absolute top-0" />
    <div
      v-if="!isLoaded"
      id="loading-wrapper"
      class="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75"
    >
      <HollowDotsSpinner
        :animation-duration="1000"
        :dot-size="dotSize"
        color="#ffffff"
      />
    </div>
  </div>
</template>
<script>
import { HollowDotsSpinner } from 'epic-spinners'

export default {
  name: 'CanvasVideo',
  components: {
    HollowDotsSpinner,
  },
  props: {
    width: {
      default: 640,
      type: Number,
    },
    height: {
      default: 480,
      type: Number,
    },
    src: {
      type: String,
      default: undefined,
    },
    camera: {
      type: Boolean,
      default: false,
    },
    useOverlay: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isDestroyed: false,
      isLoaded: false,
    }
  },
  computed: {
    videoStyle() {
      const { height, width } = this
      return {
        height: height + 'px',
        width: width + 'px',
        transform: this.camera ? 'scaleX(-1)' : '',
      }
    },
    dotSize() {
      const maxSize = 40
      const minSize = 10

      const dotSize = this.width / 16

      if (dotSize > maxSize) {
        return maxSize
      }
      if (dotSize < minSize) {
        return minSize
      }
      return dotSize
    },
    video() {
      return this.$refs.video
    },
    canvas() {
      return this.$refs.canvas
    },
    overlay() {
      return this.$refs.overlay
    },
  },
  watch: {
    camera: {
      immediate: true,
      handler() {
        this.$nextTick(this.watchCamera)
      },
    },
  },
  beforeDestroy() {
    this.isDestroyed = true
    this.closeCamera()
  },
  methods: {
    watchCamera() {
      this.closeCamera()

      if (!this.camera) {
        return
      }

      if (navigator.mediaDevices) {
        return this.openCamera()
      }

      // No media device found
      if (this.$rollbar) {
        this.$rollbar.debug('No media device found')
        this.$emit('mediadevicenotfound')
      }
    },
    closeCamera() {
      const { video } = this
      if (!video) {
        return
      }
      if (video.srcObject) {
        video.srcObject.getTracks().forEach((track) => track.stop())
      }
      video.srcObject = undefined
    },
    async openCamera() {
      this.video.srcObject = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: 'user',
          width: this.width,
          height: this.height,
        },
      })
    },
    onLoadedmetadata() {
      const { video, canvas, overlay } = this
      const videoWidth = video.videoWidth
      const videoHeight = video.videoHeight
      video.width = videoWidth
      video.height = videoHeight

      canvas.width = videoWidth
      canvas.height = videoHeight

      const ctx = canvas.getContext('2d')
      ctx.translate(canvas.width, 0)
      ctx.scale(-1, 1)

      if (overlay) {
        overlay.width = videoWidth
        overlay.height = videoHeight
      }

      this.isLoaded = true
      this.$emit('loadedmetadata')
    },
  },
}
</script>
