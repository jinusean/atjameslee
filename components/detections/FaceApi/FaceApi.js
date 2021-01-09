import * as faceapi from '@vladmandic/face-api'
import AbstractFaceDetector from '@/components/detections/AbstractFaceDetector'
import defaultOptions from './default-options'

class FaceApi extends AbstractFaceDetector {
  drawingBoard = null

  get options() {
    return { ...defaultOptions, ...this._options }
  }

  static async load() {
    if (!FaceApi.isLoaded) {
      FaceApi.isLoaded = Promise.all(
        Object.entries(FaceApi.faceapi.nets).map(([name, net]) => {
          // no need to load tinyYolov2
          if (name === 'tinyYolov2') {
            return
          }
          return net.loadFromUri('/models/faceapi')
        })
      ).then(() => {
        FaceApi.isLoaded = true
      })
    }
    return FaceApi.isLoaded
  }

  static get faceapi() {
    return faceapi
  }

  faceApiOptions() {
    return new faceapi.TinyFaceDetectorOptions({
      inputSize: this.options.inputSize,
    })
  }

  async detect() {
    this.setDimensions()
    const { element, options, drawingBoard } = this
    this.drawImage(element, drawingBoard)

    let detectPromise =
      faceapi[options.multiple ? 'detectAllFaces' : 'detectSingleFace']
    detectPromise = detectPromise(drawingBoard, this.faceApiOptions())
    if (options.landmarks) {
      detectPromise = detectPromise.withFaceLandmarks()
    }

    if (options.age || options.gender) {
      detectPromise = detectPromise.withAgeAndGender()
    }

    if (options.expression) {
      detectPromise = detectPromise.withFaceExpressions()
    }
    let detections = await detectPromise

    if (detections && !Array.isArray(detections)) {
      detections = [detections]
    }
    return detections
  }

  drawDetections(detections) {
    for (const detection of detections) {
      this.drawDetection(detection)
    }
  }

  drawDetection(detections) {
    const { canvas, options } = this
    const text = []
    if (options.boundingBox) {
      faceapi.draw.drawDetections(canvas, detections)
    }
    if (options.landmarks && detections.landmarks) {
      faceapi.draw.drawFaceLandmarks(canvas, detections)
    }
    if (options.age && detections.age) {
      text.push(`Age: ${Math.round(detections.age)}`)
    }
    if (options.gender && detections.gender) {
      text.push(
        `Gender: ${detections.gender} (${
          parseInt(detections.genderProbability * 100) / 100
        })`
      )
    }
    if (options.expression && detections.expressions) {
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
  }

  async detectAndDraw() {
    const { element, canvas, options, drawingBoard } = this
    const detections = await this.detect(element, options)
    this.drawImage(drawingBoard, canvas)
    if (detections) {
      this.drawDetections(detections, canvas, options)
    }
    return detections
  }
}

export default FaceApi
