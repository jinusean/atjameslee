<template>
  <component
    :is="component"
    ref="child"
    v-bind="$attrs"
    @play="onPlay"
    @loadedmetadata="onLoadedmetadata"
  />
</template>

<script>
import CanvasVideo from '@/components/base/CanvasVideo'
import CanvasWebcam from '@/components/base/CanvasWebcam'
import faceDetectionMixin from '@/components/detections/base/faceDetectionMixin'

export default {
  name: 'FaceVideo',
  components: {
    CanvasVideo,
    CanvasWebcam,
  },
  mixins: [faceDetectionMixin],
  props: {
    camera: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      faceModel: null,
    }
  },
  computed: {
    component() {
      return this.camera ? CanvasWebcam : CanvasVideo
    },
  },
  watch: {
    camera(camera) {
      if (this.faceModel) {
        this.faceModel.mirror = camera
      }
    },
  },
  methods: {
    detectVideo() {
      const { canvas, element } = this.faceModel
      if (this._isDestroyed || element.paused || element.ended) {
        console.log(element, element.paused, element.ended)
        return
      }

      return new Promise((resolve) => {
        window.requestAnimationFrame(async () => {
          const detections = await this.faceModel.detectAndDraw()
          if (detections) {
            this.$emit('detect', { canvas, element, detections })
          }
          resolve()
          return this.detectVideo()
        })
      })
    },
    async onLoadedmetadata(event) {
      const { canvas, video } = event

      if (this.faceModel) return

      this.faceModel = await this.loadModel({ canvas, video }, this.options)
      this.faceModel.mirror = this.camera

      await this.faceModel.detect()
      if (this.$listeners.loadedmetadata) {
        return this.$listeners.loadedmetadata(event)
      }
    },
    async onPlay(event) {
      // wait for model to laod from loadedmetadata
      if (!this.faceModel) {
        await new Promise((resolve) => {
          const unwatch = this.$watch('faceModel', () => {
            unwatch()
            resolve()
          })
        })
      }
      this.detectVideo()
      this.$emit('play', event)
    },
  },
}
</script>
