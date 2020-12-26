<template>
  <div class="flex flex-row">
    <div id="canvas-wrapper" class="relative">
      <div
        v-if="!isTracking"
        id="loading-wrapper"
        class="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75"
      >
        <HollowDotsSpinner
          :animation-duration="1000"
          :dot-size="40"
          color="#ffffff"
        />
      </div>
      <canvas
        id="canvas"
        ref="canvas"
        :width="width"
        :height="height"
        class="max-w-full"
      />
    </div>
    <div class="relative" style="transform: scaleX(-1)">
      <video
        id="video"
        ref="video"
        muted
        playsinline
        autoplay
        hidden
        :width="width"
        :height="height"
        style="width: auto; height: auto"
      ></video>
    </div>
  </div>
</template>

<script>
import { HollowDotsSpinner } from 'epic-spinners'
import { TRIANGULATION } from './triangulation'

function drawPath(ctx, points, closePath) {
  const region = new Path2D()
  region.moveTo(points[0][0], points[0][1])
  for (let i = 1; i < points.length; i++) {
    const point = points[i]
    region.lineTo(point[0], point[1])
  }

  if (closePath) {
    region.closePath()
  }
  ctx.stroke(region)
}

function distance(a, b) {
  return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2))
}

export default {
  name: 'GoogleMesh',
  components: {
    HollowDotsSpinner,
  },
  props: {
    width: {
      default: 640,
      type: Number,
    },
    height: {
      default: 480,
      type: Number,
    },
    iris: {
      default: true,
      type: Boolean,
    },
    triangulate: {
      default: true,
      type: Boolean,
    },
  },
  data() {
    return {
      model: null,
      isDestroyed: false,
      isTracking: false,
    }
  },
  async mounted() {
    this.isMounted = true
    const { canvas, video } = this.$refs
    const isMobile = this.$isMobile.any
    video.srcObject = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'user',
        // Only setting the video to a specified size in order to accommodate a
        // point cloud, so on mobile devices accept the default size.
        width: isMobile ? undefined : this.width,
        height: isMobile ? undefined : this.height,
      },
    })
    await video.play()
    const videoWidth = video.videoWidth
    const videoHeight = video.videoHeight
    video.width = videoWidth
    video.height = videoHeight
    canvas.width = videoWidth
    canvas.height = videoHeight
    const ctx = canvas.getContext('2d')
    ctx.translate(canvas.width, 0)
    ctx.scale(-1, 1)
    ctx.fillStyle = '#32EEDB'
    ctx.strokeStyle = '#32EEDB'
    ctx.lineWidth = 0.5
    this.model = await this.$models.facemesh()

    this.startTracking()
  },
  beforeDestroy() {
    this.isDestroyed = true
    const { video } = this.$refs
    if (video && video.srcObject) {
      video.srcObject.getTracks().forEach((track) => track.stop())
    }
  },
  methods: {
    startTracking() {
      window.requestAnimationFrame(async () => {
        if (this.isDestroyed) {
          return
        }
        await this.track()
        this.isTracking = true
        this.startTracking()
      })
    },
    async track() {
      const { canvas, video } = this.$refs
      const ctx = canvas.getContext('2d')
      const predictions = await this.model.estimateFaces({
        input: video,
        maxFaces: 1,
      })
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      const NUM_KEYPOINTS = 468
      const NUM_IRIS_KEYPOINTS = 5
      const GREEN = '#32EEDB'
      const RED = '#FF2C35'

      if (predictions.length > 0) {
        predictions.forEach((prediction) => {
          const keypoints = prediction.scaledMesh

          // state.triangulateMesh
          if (this.triangulate) {
            ctx.strokeStyle = GREEN
            ctx.lineWidth = 0.5

            for (let i = 0; i < TRIANGULATION.length / 3; i++) {
              const points = [
                TRIANGULATION[i * 3],
                TRIANGULATION[i * 3 + 1],
                TRIANGULATION[i * 3 + 2],
              ].map((index) => keypoints[index])

              drawPath(ctx, points, true)
            }
          } else {
            ctx.fillStyle = GREEN

            for (let i = 0; i < NUM_KEYPOINTS; i++) {
              const x = keypoints[i][0]
              const y = keypoints[i][1]

              ctx.beginPath()
              ctx.arc(x, y, 1 /* radius */, 0, 2 * Math.PI)
              ctx.fill()
            }
          }
          if (this.iris && keypoints.length > NUM_KEYPOINTS) {
            ctx.strokeStyle = RED
            ctx.lineWidth = 1

            const leftCenter = keypoints[NUM_KEYPOINTS]
            const leftDiameterY = distance(
              keypoints[NUM_KEYPOINTS + 4],
              keypoints[NUM_KEYPOINTS + 2]
            )
            const leftDiameterX = distance(
              keypoints[NUM_KEYPOINTS + 3],
              keypoints[NUM_KEYPOINTS + 1]
            )

            ctx.beginPath()
            ctx.ellipse(
              leftCenter[0],
              leftCenter[1],
              leftDiameterX / 2,
              leftDiameterY / 2,
              0,
              0,
              2 * Math.PI
            )
            ctx.stroke()

            if (keypoints.length > NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS) {
              const rightCenter = keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS]
              const rightDiameterY = distance(
                keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 2],
                keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 4]
              )
              const rightDiameterX = distance(
                keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 3],
                keypoints[NUM_KEYPOINTS + NUM_IRIS_KEYPOINTS + 1]
              )

              ctx.beginPath()
              ctx.ellipse(
                rightCenter[0],
                rightCenter[1],
                rightDiameterX / 2,
                rightDiameterY / 2,
                0,
                0,
                2 * Math.PI
              )
              ctx.stroke()
            }
          }
        })
      }
    },
  },
}
</script>

<style scoped></style>
