import faceDetection from '@/components/detections/components/faceDetection'

export default {
  props: {
    model: {
      type: String,
      required: true,
      validate(model) {
        return !!faceDetection.getModel(model)
      },
    },
    options: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  methods: {
    async loadModel({ img, video, canvas }, options = this.options) {
      return await faceDetection.create(
        this.model,
        img || video,
        canvas,
        options
      )
    },
  },
}
