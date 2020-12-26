<template>
  <div class="relative">
    <img ref="image" src="@/assets/images/davika.jpg" />
    <canvas id="canvas" ref="canvas" class="absolute left-0 top-0" />
  </div>
</template>

<script>
import * as faceapi from '@vladmandic/face-api'

const props = ['gender', 'age', 'landmarks', 'box', 'expression'].reduce(
  (props, prop) => {
    props[prop] = { type: Boolean, default: true }
    return props
  },
  {}
)

export default {
  name: 'FaceApiUpload',
  props,
  async mounted() {
    await this.loadModels()
    this.detectFace()
  },
  methods: {
    async loadModels() {
      return await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri('/weights'),
        faceapi.nets.faceRecognitionNet.loadFromUri('/weights'),
        faceapi.nets.ageGenderNet.loadFromUri('/weights'),
        faceapi.nets.faceExpressionNet.loadFromUri('/weights'),
        faceapi.nets.faceLandmark68Net.loadFromUri('/weights'),
      ])
    },
    async detectFace() {
      const { image, canvas } = this.$refs

      const options = new faceapi.TinyFaceDetectorOptions()
      const detections = await faceapi
        .detectSingleFace(image, options)
        .withFaceLandmarks()
        .withAgeAndGender()
        .withFaceExpressions()

      const { width, height } = image
      canvas.width = width
      canvas.height = height
      const displaySize = { width: image.width, height: image.height }
      const resizedDetections = faceapi.resizeResults(detections, displaySize)
      const ctx = canvas.getContext('2d')
      ctx.drawImage(image, 0, 0)
      if (this.box) {
        faceapi.draw.drawDetections(canvas, resizedDetections)
      }
      if (this.landmarks) {
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections)
      }
      const text = []
      if (this.age) {
        text.push(`Age: ${Math.round(detections.age)}`)
      }
      if (this.gender) {
        text.push(
          `Gender: ${detections.gender} (${
            parseInt(detections.genderProbability * 100) / 100
          })`
        )
      }
      if (this.expression) {
        const [expression] = detections.expressions.asSortedArray()
        text.push(
          `Expression: ${expression.expression} (${
            parseInt(expression.probability * 100) / 100
          })`
        )
      }
      if (text.length) {
        const anchor = resizedDetections.alignedRect.box.bottomLeft
        const drawBox = new faceapi.draw.DrawTextField(text, anchor)
        drawBox.draw(canvas)
      }

      console.log(resizedDetections)
      // faceapi.draw.drawAge(canvas, detections)
    },
  },
}
</script>

<style scoped></style>
