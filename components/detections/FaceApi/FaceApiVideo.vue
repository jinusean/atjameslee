<template>
  <CanvasVideo
    ref="canvasVideo"
    camera
    v-bind="$attrs"
    @loadedmetadata="onLoadedmetadata"
  />
</template>

<script>
import CanvasVideo from '@/components/base/CanvasVideo'

export default {
  name: 'FaceApi',
  components: { CanvasVideo },
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          landmarks: true,
          boundingBox: true,
          age: true,
          gender: true,
          expression: true,
          mirror: true,
        }
      },
    },
  },
  methods: {
    async onLoadedmetadata() {
      this.$refs.canvasVideo.isLoaded = false
      const { video, canvas } = this.$refs.canvasVideo
      this.faceapi = await this.$models.FaceApi(video, canvas, this.options)
      await this.faceapi.detect()
      await this.faceapi.detect()
      await this.faceapi.detectAndDraw()
      this.detect()
      this.$refs.canvasVideo.isLoaded = true
    },
    detect() {
      if (!this.$refs.canvasVideo) return
      const { canvas } = this.$refs.canvasVideo
      window.requestAnimationFrame(async () => {
        const detections = await this.faceapi.detectAndDraw()
        this.$emit('detect', { detections, canvas })
        this.detect()
      })
    },
  },
}
</script>
