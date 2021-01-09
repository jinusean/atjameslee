<template>
  <CanvasVideo
    v-bind="$attrs"
    :src-object="stream"
    video-style="transform: scale(-1, 1)"
    @loadedmetadata="onLoadedmetadata"
  />
</template>

<script>
import CanvasVideo from '@/components/base/CanvasVideo'
export default {
  name: 'CanvasWebcam',
  components: {
    CanvasVideo,
  },
  inheritAttrs: false,
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
      if (this.stream) {
        this.stream.getTracks().forEach((track) => track.stop())
      }
      this.stream = undefined
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
    },
    onLoadedmetadata(payload) {
      if (this.$listeners.loadedmetadata) {
        return this.$listeners.loadedmetadata(payload)
      }
    },
  },
}
</script>
