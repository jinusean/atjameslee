<template>
  <div class="flex-1 flex items-center justify-center">
    <WebviewSupport>
      <FaceVideo ref="faceApi" model="FaceApi" @detect="onTrack" />
    </WebviewSupport>
  </div>
</template>

<script>
import FaceVideo from '@/components/detections/FaceVideo'
import { Yikos } from '@/components/detections/FaceApi/yiko'
import WebviewSupport from '@/components/WebviewSupport'
import { drawHeart } from '@/lib/drawing'

let yikos = null

export default {
  name: 'EatMePage',
  components: {
    WebviewSupport,
    FaceVideo,
  },
  mounted() {
    const image = new Image(80, 95)
    image.src = require('@/assets/images/james_side.png')

    this.$nextTick(() => {
      const ctx = this.$refs.faceApi.$refs.canvas.getContext('2d')
      yikos = new Yikos(ctx, image, 5, 10)
      yikos.onCollision = (ctx, yiko) => {
        drawHeart(ctx, yiko.position.x, yiko.position.y, 50, 50)
      }
    })
  },
  methods: {
    onTrack({ face }) {
      if (!face) {
        return
      }
      const { positions } = face.landmarks
      yikos.randomAdd(positions)
      yikos.draw(positions)
    },
  },
}
</script>
