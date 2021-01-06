import {
  drawIris,
  drawMesh,
  drawTriangulations,
} from '@/components/detections/GoogleMesh/meshUtils'

export default {
  props: {
    iris: {
      default: true,
      type: Boolean,
    },
    triangulate: {
      default: true,
      type: Boolean,
    },
    maxFaces: {
      default: 1,
      type: Number,
    },
    minConfidence: {
      default: 0.5,
      type: Number,
      validate(minConfidence) {
        return minConfidence > 0 && minConfidence <= 1
      },
    },
  },
  methods: {
    async detect(mediaElement, canvas) {
      const facemesh = await this.$models.facemesh()
      const predictions = await facemesh.estimateFaces({
        input: mediaElement,
        maxFaces: this.maxFaces,
      })

      const ctx = canvas.getContext('2d')
      ctx.drawImage(mediaElement, 0, 0, canvas.width, canvas.height)

      let facesFoundCount = 0

      predictions.forEach((prediction) => {
        // if (prediction.faceInViewConfidence < this.minConfidence) {
        //   return
        // }
        facesFoundCount++
        const keypoints = prediction.scaledMesh

        if (this.triangulate) {
          drawTriangulations(ctx, keypoints)
        } else {
          drawMesh(ctx, keypoints)
        }

        if (this.iris) {
          drawIris(ctx, keypoints, 1)
        }
      })
      return facesFoundCount > 0
    },
  },
}
