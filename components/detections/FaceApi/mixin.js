export const OPTIONS = Object.freeze([
  'gender',
  'age',
  'landmarks',
  'boundingBox',
  'expression',
  'multiple',
])

export default {
  props: {
    ...OPTIONS.reduce((props, prop) => {
      props[prop] = { type: Boolean, default: prop !== 'multiple' }
      return props
    }, {}),
    inputSize: {
      type: Number,
      default: 160,
    },
  },

  methods: {
    drawDetections(faceapi, canvas, detections) {
      const text = []
      if (this.boundingBox) {
        faceapi.draw.drawDetections(canvas, detections)
      }
      if (this.landmarks && detections.landmarks) {
        faceapi.draw.drawFaceLandmarks(canvas, detections)
      }
      if (this.age && detections.age) {
        text.push(`Age: ${Math.round(detections.age)}`)
      }
      if (this.gender && detections.gender) {
        text.push(
          `Gender: ${detections.gender} (${
            parseInt(detections.genderProbability * 100) / 100
          })`
        )
      }
      if (this.expression && detections.expressions) {
        const [expression] = detections.expressions.asSortedArray()
        text.push(
          `Expression: ${expression.expression} (${
            parseInt(expression.probability * 100) / 100
          })`
        )
      }

      if (text.length) {
        const anchor = detections.detection.box.bottomLeft
        const drawBox = new faceapi.draw.DrawTextField(text, anchor)
        drawBox.draw(canvas)
      }
    },

    getOptions(faceapi) {
      return new faceapi.TinyFaceDetectorOptions({
        inputSize: this.inputSize,
      })
    },

    async getDetections(faceapi, mediaElement) {
      let detectPromise =
        faceapi[this.multiple ? 'detectAllFaces' : 'detectSingleFace']
      detectPromise = detectPromise(mediaElement, this.getOptions(faceapi))
      if (this.landmarks) {
        detectPromise = detectPromise.withFaceLandmarks()
      }

      if (this.age || this.gender) {
        detectPromise = detectPromise.withAgeAndGender()
      }

      if (this.expression) {
        detectPromise = detectPromise.withFaceExpressions()
      }
      let detections = await detectPromise

      if (detections && !Array.isArray(detections)) {
        detections = [detections]
      }
      return detections
    },

    clearCanvas(canvas) {
      const ctx = canvas.getContext('2d')
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    },

    async detect(mediaElement, canvas, overlay) {
      const faceapi = await this.$models.faceapi()
      const ctx = canvas.getContext('2d')
      ctx.drawImage(mediaElement, 0, 0, canvas.width, canvas.height)
      const detections = await this.getDetections(faceapi, canvas)

      if (overlay) {
        this.clearCanvas(overlay)
        canvas = overlay
      }
      if (!detections || detections.length === 0) {
        return
      }

      for (const resizedDetection of detections) {
        this.drawDetections(faceapi, canvas, resizedDetection)
      }
      return detections
    },
  },
}
