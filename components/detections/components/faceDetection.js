import FaceApi from '@/components/detections/FaceApi/FaceApi'
import FaceMesh from '@/components/detections/GoogleMesh/FaceMesh'

export const models = Object.freeze({
  FaceApi,
  FaceMesh,
})

export class FaceDetection {
  getModel(modelName) {
    const modelNameLowerCase = modelName.toLowerCase()
    for (const key in models) {
      if (key.toLowerCase() === modelNameLowerCase) {
        return models[key]
      }
    }
    throw new Error('Unknown model: ' + modelName)
  }

  loadModels() {
    return Promise.all(Object.values(models).map((model) => model.load()))
  }

  async create(modelName, ...args) {
    const Model = this.getModel(modelName)
    await Model.load()
    return new Model(...args)
  }

  get models() {
    return models
  }
}

export default new FaceDetection()
