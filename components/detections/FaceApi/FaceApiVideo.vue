<template>
  <CanvasVideo
    ref="canvasVideo"
    camera
    v-bind="$attrs"
    :use-overlay="true"
    @loadedmetadata="onLoadedmetadata"
  />
</template>

<script>
import CanvasVideo from '@/components/base/CanvasVideo'
import mixin from './mixin'

const SSD_MOBILENETV1 = 'ssd_mobilenetv1'
const TINY_FACE_DETECTOR = 'tiny_face_detector'

const models = [SSD_MOBILENETV1, TINY_FACE_DETECTOR]

let throttle = false

export default {
  name: 'FaceApi',
  components: { CanvasVideo },
  mixins: [mixin],
  props: {
    minConfidence: {
      type: Number,
      default: 0.5,
    },
    inputSize: {
      type: Number,
      default: 160,
    },
    model: {
      default: TINY_FACE_DETECTOR,
      validator(value) {
        return models.includes(value)
      },
    },
  },
  methods: {
    async onLoadedmetadata() {
      this.$refs.canvasVideo.isLoaded = false
      const faceapi = await this.$models.faceapi()
      // detect video to avoid initial lag
      // two detections seems to bypass the stutter
      const options = this.getOptions(faceapi)
      await faceapi
        .detectSingleFace(this.$refs.canvasVideo.video, options)
        .withFaceLandmarks()
        .withAgeAndGender()
        .withFaceExpressions()
      await faceapi
        .detectSingleFace(this.$refs.canvasVideo.video, options)
        .withFaceLandmarks()
        .withAgeAndGender()
        .withFaceExpressions()

      this.track()
      this.$refs.canvasVideo.isLoaded = true
    },
    track() {
      if (!this.$refs.canvasVideo) {
        // when component is destroyed
        return
      }
      throttle = !throttle
      if (throttle) {
        return this.track()
      }
      const { video, canvas, overlay } = this.$refs.canvasVideo
      window.requestAnimationFrame(async () => {
        const detections = await this.detect(video, canvas, overlay)
        if (detections) {
          this.$emit('track', { canvas: overlay, detections })
        }
        this.track()
      })
    },
  },
}
</script>
