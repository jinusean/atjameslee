import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection'
import '@tensorflow/tfjs-backend-cpu'
import '@tensorflow/tfjs-backend-webgl'
import {
  drawIris,
  drawMesh,
  drawTriangulations,
} from '@/components/detections/GoogleMesh/facemeshDrawUtils'
import AbstractFaceDetector from '@/components/detections/AbstractFaceDetector'
import defaultOptions from '@/components/detections/FaceApi/default-options'

class FaceMesh extends AbstractFaceDetector {
  static _facemesh = null

  static load() {
    if (!this._facemesh) {
      this._facemesh = faceLandmarksDetection
        .load(faceLandmarksDetection.SupportedPackages.mediapipeFacemesh)
        .then((facemesh) => {
          this._facemesh = facemesh
          return facemesh
        })
    }
    return this._facemesh
  }

  get options() {
    return { ...defaultOptions, ...this._options }
  }

  static get facemesh() {
    return this._facemesh
  }

  async detect() {
    this.setDimensions()
    this.drawImage(this.element, this.drawingBoard)
    return await FaceMesh.facemesh.estimateFaces({
      input: this.drawingBoard,
      ...this.options,
    })
  }

  drawDetections(detections) {
    const { canvas, options } = this
    const ctx = canvas.getContext('2d')

    detections.forEach((detection) => {
      const keypoints = detection.scaledMesh

      if (options.triangulate) {
        drawTriangulations(ctx, keypoints)
      } else {
        drawMesh(ctx, keypoints)
      }

      if (options.iris) {
        drawIris(ctx, keypoints, options.irisWidth)
      }
    })
    return detections
  }

  // async detectAndDraw() {
  //   const { element, canvas, options } = this
  //   const detections = await this.detect(element, options)
  //   this.drawImage(element, canvas)
  //   if (detections) {
  //     this.drawDetections(detections, canvas, options)
  //   }
  //   return detections
  // }
}

export default FaceMesh
