<template>
  <component
    :is="component"
    v-bind="$attrs"
    @loadedmetadata="onloadedmetadata"
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
    async onloadedmetadata(payload) {
      this.faceModel = await this.loadModel(payload, this.options)
      this.faceModel.mirror = this.camera
      if (this.$listeners.loadedmetadata) {
        await this.$listeners.loadedmetadata(payload)
      }
      return this.detectVideo()
    },
    detectVideo() {
      return new Promise((resolve) => {
        window.requestAnimationFrame(async () => {
          const detections = await this.faceModel.detectAndDraw()
          if (detections) {
            const { canvas, element } = this.faceModel
            this.$emit('detect', { canvas, element, detections })
          }
          resolve()
          return this.detectVideo()
        })
      })
    },
  },
}
</script>
