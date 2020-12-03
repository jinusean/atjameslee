<template>
  <div class="flex-1 flex items-center justify-center">
    <div v-if="$store.state.isWebView" class="center-content page-container">
      <p>Please open this page in Safari App</p>
      <img
        src="@/assets/images/open-default-browser.jpg"
        style="height: 50vh"
        alt="open default browser"
      />
    </div>
    <FaceApi v-else-if="isMounted" ref="faceApi" @track="onTrack" />
  </div>
</template>

<script>
import FaceApi from '@/components/detections/face-api/FaceApi'
import { Yikos } from '@/components/detections/face-api/yiko'

let yikos = null

export default {
  name: 'EatMePage',
  components: {
    FaceApi,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  mounted() {
    this.isMounted = true

    const image = new Image(80, 95)
    image.src = require('@/assets/images/james_side.png')

    this.$nextTick(() => {
      const ctx = this.$refs.faceApi.$refs.canvas.getContext('2d')
      yikos = new Yikos(ctx, image, 5, 10)
    })
  },
  methods: {
    onTrack({ face, ctx }) {
      yikos.randomAdd()
      if (!face) {
        return
      }
      yikos.draw(face.landmarks.positions)
    },
  },
}
</script>
