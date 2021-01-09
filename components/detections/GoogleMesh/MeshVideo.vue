<template>
  <CanvasWebcam v-bind="$attrs" @loadedmetadata="loadedmetadata" />
</template>

<script>
import CanvasWebcam from '@/components/base/CanvasWebcam'
import CanvasVideo from '@/components/base/CanvasVideo'
import FaceMesh from '@/components/detections/GoogleMesh/FaceMesh'

export default {
  name: 'MeshVideo',
  components: {
    CanvasWebcam,
  },
  props: {
    camera: {
      type: Boolean,
      default: false,
    },
    options: {
      default: {},
      type: Object,
    },
  },
  computed: {
    videoOptions() {
      return {
        ...this.options,
        mirror: true,
      }
    },
  },
  methods: {
    async loadedmetadata({ video, canvas }) {
      this.faceMesh = await FaceMesh.create(video, canvas, this.videoOptions)
      return new Promise((resolve) => {
        this.detectVideo(resolve)
      })
    },
    detectVideo(resolve) {
      window.requestAnimationFrame(async () => {
        await this.faceMesh.detectAndDraw()
        if (resolve) {
          resolve()
        }
        return this.detectVideo()
      })
    },
  },
}
</script>
