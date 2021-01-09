<template>
  <ImgDetect v-bind="$attrs" @detect="detect" />
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
  methods: {
    async detect(payload) {
      const model = await this.loadModel(payload)
      return model.detectAndDraw()
    },
  },
}
</script>
