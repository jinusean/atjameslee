<template>
  <div class="center-content page-container">
    <div
      v-if="!isLoaded"
      class="fixed top-0 left-0 z-50 bg-black bg-opacity-75 text-white font-bold text-4xl w-full h-full center-content"
    >
      <p><span v-if="isVideoPlaying">Still</span> Loading...</p>
    </div>
    <div class="rounded relative -scale-100" style="transform: scaleX(-1)">
      <video
        id="video"
        ref="video"
        muted
        :class="isLoaded ? 'hidden' : ''"
        playsinline
        autoplay
        @loadedmetadata="onLoadedMetaData"
      ></video>
      <canvas
        id="canvas"
        ref="canvas"
        :class="!isLoaded ? 'absolute' : ''"
        class="max-w-full top-0 left-0"
        :height="height"
        :width="width"
      />
    </div>
  </div>
</template>
<script>
// This does not work in iOS safari because the video element cannot be autoplayed and
// video cannot be played while the element is hidden

import * as faceApi from 'face-api.js'

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
  },
  data() {
    return {
      isLoaded: false,
      isVideoPlaying: false,

      height: 480,
      width: 640,

      isDestroyed: false,
      srcObject: null,
    }
  },
  computed: {
    faceDetectionNet() {
      const net = {
        [SSD_MOBILENETV1]: 'ssdMobilenetv1',
        [TINY_FACE_DETECTOR]: 'tinyFaceDetector',
      }[this.model]

      return faceApi.nets[net]
    },
  },
  mounted() {
    this.run()
  },
  destroyed() {
    this.isDestroyed = true
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
      window.requestAnimationFrame(async () => {
        await this.track()
        this.isVideoPlaying = true
      })
    },
    async track() {
      const videoEl = this.$refs.video
      if (this.isDestroyed || !videoEl) {
        return
      }
      if (videoEl.paused) {
        // video is paused in Safari when it becomes hidden
        videoEl.play()
      }
      if (videoEl.paused || videoEl.ended || !this.faceDetectionNet.params) {
        return window.requestAnimationFrame(this.track)
      }

      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      const face = await faceApi
        .detectSingleFace(videoEl, this.getFaceDetectorOptions())
        .withFaceLandmarks()
      ctx.clearRect(0, 0, this.width, this.height)

      if (this.isLoaded) {
        ctx.drawImage(videoEl, 0, 0, this.width, this.height)
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
    async run() {
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
        video: { frameRate: 30, height, width },
      })
      this.srcObject = await navigator.mediaDevices.getUserMedia({
        video: { frameRate: 30, height, width },
      })
      const canvas = this.$refs.canvas
      canvas.width = width
      canvas.height = height
      video.play()
    },
  },
}
</script>
