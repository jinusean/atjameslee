<template>
  <div class="relative">
    <video
      ref="video"
      muted
      playsinline
      autoplay
      v-bind="$attrs"
      :style="videoStyle"
      @loadedmetadata="onLoadedmetadata"
    ></video>
    <canvas ref="canvas" class="absolute top-0" />
    <div
      v-if="!isLoaded"
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
  name: 'WebcamDetection',
  components: {
    HollowDotsSpinner,
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
      this.closeCamera()
      this.video.srcObject = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: 'user',
          width: this.width,
          height: this.height,
        },
      })
    },
    async onLoadedmetadata() {
      const { video, canvas, overlay } = this
      const videoWidth = video.videoWidth
      const videoHeight = video.videoHeight
      video.width = videoWidth
      video.height = videoHeight
      canvas.width = videoWidth
      canvas.height = videoHeight

      if (overlay) {
        overlay.width = videoWidth
        overlay.height = videoHeight
      }

      if (this.$listeners.loadedmetadata) {
        await this.$listeners.loadedmetadata({ video, canvas })
      }
      await this.startDetecting()
      this.isLoaded = true
    },
    startDetecting() {
      if (!this.isDestroyed) {
        // component destroyed
        return
      }
      return new Promise((resolve) => {
        window.requestAnimationFrame(async () => {
          const { canvas, video } = this

          if (this.$listeners.detect) {
            await this.$listeners.detect({ video, canvas })
          }
          resolve()
          this.startDetecting()
        })
      })
    },
  },
}
</script>
