<template>
  <div class="center-content page-container">
    <div
      v-if="!isLoaded"
      class="fixed top-0 left-0 z-50 bg-black bg-opacity-75 text-white font-bold text-4xl w-full h-full center-content"
    >
      <p v-if="!isVideoPlayed">Loading...</p>
      <p v-else>Detecting face...</p>
    </div>
    <!--    transform: scaleX(-1)-->
    <div class="rounded relative" style="transform: rotateY(180deg)">
      <video
        id="video"
        ref="video"
        muted
        playsinline
        autoplay
        :class="videoClass"
        @loadedmetadata="onLoadedMetaData"
      ></video>
      <canvas id="canvas" ref="canvas" :class="canvasClass" />
    </div>
  </div>
</template>
<script>
// This does not work in iOS safari because the video element cannot be autoplayed and
// video cannot be played while the element is hidden

// import * as faceApi from 'face-api.js'
import * as faceApi from '@vladmandic/face-api'

const SSD_MOBILENETV1 = 'ssd_mobilenetv1'
const TINY_FACE_DETECTOR = 'tiny_face_detector'

const models = [SSD_MOBILENETV1, TINY_FACE_DETECTOR]

export default {
  name: 'FaceApi',
  props: {
    minConfidence: {
      type: Number,
      default: 0.5,
    },
    inputSize: {
      type: Number,
      default: 160,
    },
    boundingBox: {
      type: Boolean,
      default: false,
    },
    model: {
      default: TINY_FACE_DETECTOR,
      validator(value) {
        return models.includes(value)
      },
    },
    landmarks: {
      default: false,
      type: Boolean,
    },
    width: {
      default: 640,
      type: Number,
    },
    height: {
      default: 480,
      type: Number,
    },
  },
  data() {
    return {
      isLoaded: false,
      isVideoPlayed: false,
      isDestroyed: false,
      hasBeenPaused: false, // video will get paused if set to hidden in mobile safari
    }
  },
  computed: {
    videoClass() {
      if (this.hasBeenPaused) {
        return ''
      }
      return this.isLoaded ? 'hidden' : ''
    },
    canvasClass() {
      // use canvas as overlay if has been paused
      if (this.hasBeenPaused) {
        return 'absolute w-full h-full top-0 left-0 right-0 bottom-0'
      }
      return !this.isLoaded ? 'hidden' : 'max-w-full h-auto'
    },
    faceDetectionNet() {
      const net = {
        [SSD_MOBILENETV1]: 'ssdMobilenetv1',
        [TINY_FACE_DETECTOR]: 'tinyFaceDetector',
      }[this.model]

      return faceApi.nets[net]
    },
  },
  mounted() {
    this.startTracking()
  },
  beforeDestroy() {
    this.isDestroyed = true
    window.removeEventListener('resize', this.setCanvasDimensions)
  },
  methods: {
    getFaceDetectorOptions() {
      return this.model === SSD_MOBILENETV1
        ? new faceApi.SsdMobilenetv1Options({
            minConfidence: this.minConfidence,
          })
        : new faceApi.TinyFaceDetectorOptions({
            inputSize: this.inputSize,
            scoreThreshold: this.scoreThreshold,
          })
    },
    onLoadedMetaData() {
      this.setCanvasDimensions()
      window.requestAnimationFrame(async () => {
        await this.track()
        this.isVideoPlayed = true
      })
      window.addEventListener('resize', this.setCanvasDimensions)
    },
    async track() {
      const videoEl = this.$refs.video
      if (this.isDestroyed || !videoEl) {
        return
      }

      if (videoEl.paused || videoEl.ended || !this.faceDetectionNet.params) {
        this.hasBeenPaused = true
        return window.requestAnimationFrame(this.track)
      }

      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      const face = await faceApi
        .detectSingleFace(videoEl, this.getFaceDetectorOptions())
        .withFaceLandmarks()

      if (this.hasBeenPaused) {
        // use canvas as overlay if video has been paused
        ctx.clearRect(0, 0, canvas.width, canvas.height)
      } else {
        ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height)
      }

      if (face) {
        this.isLoaded = true
        if (this.boundingBox) {
          faceApi.draw.drawDetections(canvas, face)
        }
        if (this.landmarks) {
          faceApi.draw.drawFaceLandmarks(canvas, face)
        }
      }
      this.$emit('track', { ctx, face, faceapi: faceApi })
      window.requestAnimationFrame(this.track)
    },
    async startTracking() {
      if (!navigator.mediaDevices) {
        /* eslint-disable-next-line */
        if (this.$rollbar) {
          this.$rollbar.debug('No media device found')
        }
        return
      }
      // load face detection and face landmark models
      await Promise.all([
        this.faceDetectionNet.load('/weights'),
        faceApi
          .loadFaceLandmarkModel('/weights')
          .then(() => this.$emit('loadedModel')),
      ])

      // try to access users webcam and stream the images
      // to the video element
      const video = this.$refs.video
      const { height, width } = this
      video.srcObject = await navigator.mediaDevices.getUserMedia({
        video: { frameRate: 60, width, height },
      })

      video.play()
    },
    setCanvasDimensions() {
      // iOS safari canvas does not automatically deal with dimensions
      const { width, height } = this
      const { innerWidth, innerHeight } = window
      const canvas = this.$refs.canvas
      if (innerWidth > innerHeight) {
        canvas.width = width
        canvas.height = height
      } else {
        canvas.width = height
        canvas.height = width
      }
    },
  },
}
</script>
