<template>
  <CanvasVideo
    ref="canvasVideo"
    camera
    v-bind="$attrs"
    @loadedmetadata="onLoadeddata"
  />
</template>

<script>
import CanvasVideo from '../../base/CanvasVideo'
import mixin from './mixin'

let shouldDrawNextFrame = true
export default {
  name: 'MeshVideo',
  components: {
    CanvasVideo,
  },
  mixins: [mixin],

  methods: {
    async onLoadeddata() {
      this.$refs.canvasVideo.isLoaded = false
      await this.$models.facemesh()
      this.track()
    },
    track() {
      if (!this.$refs.canvasVideo) {
        // component destroyed
        return
      }
      const { canvas, video } = this.$refs.canvasVideo
      window.requestAnimationFrame(async () => {
        if (shouldDrawNextFrame) {
          await this.detect(video, canvas)
          this.$refs.canvasVideo.isLoaded = true
        }
        shouldDrawNextFrame = !shouldDrawNextFrame
        this.track()
      })
    },
  },
}
</script>
