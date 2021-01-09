<template>
  <ImgDetect ref="imgDetect" v-bind="$attrs" @detect="detect" />
</template>
<script>
import ImgDetect from '@/components/detections/components/ImgDetect'
import faceDetectionMixin from '@/components/detections/components/faceDetectionMixin'

export default {
  name: 'FaceImg',
  components: {
    ImgDetect,
  },
  mixins: [faceDetectionMixin],
  watch: {
    options: {
      deep: true,
      handler() {
        this.reload()
      },
    },
  },
  methods: {
    async redraw() {
      const detections = await this.faceModel.detectAndDraw()
      if (detections && this.$listeners.detect) {
        const { canvas, element } = this.faceModel
        await this.$listeners.detect({ detections, canvas, element })
      }

      return detections
    },
    reload() {
      return this.$refs.imgDetect.load()
    },
    async detect(payload) {
      this.faceModel = await this.loadModel(payload)
      return this.redraw()
    },
  },
}
</script>
