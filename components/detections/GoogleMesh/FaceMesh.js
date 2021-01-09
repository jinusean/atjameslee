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
  _model = null

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

  loadModel() {
    if (!this._model) {
      this._model = faceLandmarksDetection
        .load(faceLandmarksDetection.SupportedPackages.mediapipeFacemesh)
        .then((facemesh) => {
          this._model = facemesh
          return facemesh
        })
    }
    return this._model
  }

  constructor(...args) {
    super(...args)
    this.loadModel()
  }

  get options() {
    return { ...defaultOptions, ...this._options }
  }

  async detect() {
    const model = await this.loadModel()
    this.setDimensions()
    this.drawImage(this.element, this.drawingBoard)
    return await model.estimateFaces({
      input: this.drawingBoard,
      ...this.options,
    })
  }

  draw() {
    const { canvas, options } = this
    const ctx = canvas.getContext('2d')
    for (const detections of this.detections) {
      const keypoints = detections.scaledMesh

      if (options.triangulate) {
        drawTriangulations(ctx, keypoints)
      } else {
        drawMesh(ctx, keypoints)
      }

      if (options.iris) {
        drawIris(ctx, keypoints, options.irisWidth)
      }

      if (options.boundingBox) {
        const { topLeft, bottomRight } = detections.boundingBox
        // drawBox requires x,y,width,height
        this.drawBox(
          ...topLeft,
          ...bottomRight.map((val, index) => val - topLeft[index])
        )
      }
    }
  }
}

export default FaceMesh
