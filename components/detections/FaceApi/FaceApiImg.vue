<template><ImgDetection /></template>

<script>
import ImgDetection from '@/components/detections/components/ImgDetect'

export default {
  name: 'FaceApiImg',
  components: { ImgDetection },
  methods: {
    async detect({ img, canvas }) {
      if (!this.faceapi) {
        this.faceapi = await this.$models.FaceApi(img, canvas, this.options)
      }
      return this.faceapi.detectAndDraw()
    },
  },
}
</script>
