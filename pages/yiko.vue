<template>
  <div class="flex-1 flex items-center justify-center">
    <WebviewSupport>
      <FaceApiVideo ref="faceApi" weights-src="/weights" @track="onTrack" />
    </WebviewSupport>
  </div>
</template>

<script>
import FaceApiVideo from '@/components/detections/FaceApi/FaceApiVideo'
import { Yikos } from '@/components/detections/FaceApi/yiko'
import WebviewSupport from '@/components/detections/WebviewSupport'
import { drawHeart } from '@/components/detections/draw'

let yikos = null

export default {
  name: 'EatMePage',
  components: {
    WebviewSupport,
    FaceApiVideo,
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
      yikos.randomAdd()
      if (!face) {
        return
      }
      yikos.draw(face.landmarks.positions)
    },
  },
}
</script>
