import faceDetection from '@/components/detections/base/faceDetection'

export default ({ app }, inject) => {
  faceDetection.loadModels()
}
