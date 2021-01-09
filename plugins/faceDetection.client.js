import faceDetection from '@/components/detections/components/faceDetection'

export default ({ app }, inject) => {
  faceDetection.loadModels()
}
