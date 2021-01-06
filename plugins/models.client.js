import * as faceapi from '@vladmandic/face-api'
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection'
import '@tensorflow/tfjs-backend-cpu'
import '@tensorflow/tfjs-backend-webgl'

class Models {
  constructor() {
    this._facemesh = null
    this._faceapi = null
  }

  async facemesh() {
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

  async faceapi() {
    if (!this._faceapi) {
      this._faceapi = Promise.all(
        Object.entries(faceapi.nets).map(([name, net]) => {
          // no need to load tinyYolov2
          if (name === 'tinyYolov2') {
            return
          }
          return net.loadFromUri('/models/faceapi')
        })
      ).then(() => {
        this._faceapi = faceapi
        return faceapi
      })
    }

    return this._faceapi
  }
}

export default ({ app }, inject) => {
  const models = new Models()
  models.facemesh()
  models.faceapi()
  inject('models', models)
}
