import * as faceapi from '@vladmandic/face-api'

import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection'
// import '@tensorflow/tfjs-backend-cpu'
import '@tensorflow/tfjs-backend-webgl'

class Models {
  constructor() {
    this._facemesh = null
    this._faceapi = null
    this.facemesh()
    this.faceapi()
  }

  async facemesh() {
    if (!this._facemesh) {
      this._facemesh = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
      )
    }
    return this._facemesh
  }

  async faceapi() {
    if (!this._faceapi) {
      const weightsPath = '/models/faceapi'
      this._faceapi = await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(weightsPath),
        faceapi.nets.faceRecognitionNet.loadFromUri(weightsPath),
        faceapi.nets.ageGenderNet.loadFromUri(weightsPath),
        faceapi.nets.faceExpressionNet.loadFromUri(weightsPath),
        faceapi.nets.faceLandmark68Net.loadFromUri(weightsPath),
      ])
    }

    return this._faceapi
  }
}

export default ({ app }, inject) => {
  inject('models', new Models())
}
