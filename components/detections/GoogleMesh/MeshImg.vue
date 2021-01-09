<template>
  <ImgDetect ref="imgDetect" v-bind="$attrs" @detect="detect" />
</template>
<script>
import ImgDetect from '@/components/detections/components/ImgDetect'
import FaceMesh from '@/components/detections/GoogleMesh/FaceMesh'

export default {
  name: 'MeshImg',
  components: { ImgDetect },
  props: {
    options: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  watch: {
    options() {
      this.$refs.imgDetect.load()
    },
  },
  methods: {
    async detect({ canvas, img }) {
      if (!this.facemesh) {
        this.facemesh = await FaceMesh.create(canvas, img, this.options)
      }
      return this.facemesh.detectAndDraw()
    },
  },
}
</script>
