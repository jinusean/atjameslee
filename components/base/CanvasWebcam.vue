<template>
  <CanvasVideo
    :src-object="stream"
    video-style="transform: scale(-1, 1)"
    v-on="$listeners"
  />
</template>

<script>
import CanvasVideo from '@/components/base/CanvasVideo'
export default {
  name: 'CanvasWebcam',
  components: {
    CanvasVideo,
  },
  data() {
    return {
      stream: null,
    }
  },
  created() {
    this.openCamera()
  },
  beforeDestroy() {
    this.closeCamera()
  },
  methods: {
    closeCamera() {
      const { stream } = this
      if (!stream) return
      stream.getTracks().forEach((track) => track.stop())
      this.stream = null
      this.$emit('cameraclose', stream)
    },
    async openCamera() {
      this.closeCamera()
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: 'user',
          width: this.$attrs.width,
          height: this.$attrs.height,
        },
      })
      this.$emit('cameraopen', this.stream)
    },
  },
}
</script>
