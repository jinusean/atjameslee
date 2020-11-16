<template>
  <div class="center-content page-container">
    <div
      v-if="!isLoaded"
      class="fixed top-0 left-0 z-50 bg-black bg-opacity-75 text-white font-bold text-4xl w-full h-full center-content"
    >
      <p><span v-if="isVideoPlaying">Still</span> Loading...</p>
    </div>
    <div :style="isLoaded ? '' : 'visibility: hidden'">
      <p class="text-center mt-4 font-bold text-2xl">Say "Ahh...."</p>
    </div>
    <div class="rounded relative -scale-100" style="transform: scaleX(-1)">
      <video
        id="inputVideo"
        ref="inputVideo"
        muted
        :class="isLoaded ? 'hidden' : ''"
        playsinline
        autoplay
        @loadedmetadata="onLoadedMetaData"
      ></video>
      <canvas
        id="overlay"
        ref="overlay"
        :class="!isLoaded ? 'absolute' : ''"
        class="max-w-full top-0 left-0"
        :height="height"
        :width="width"
      />
    </div>
    <div :style="isVideoPlaying ? '' : 'visibility: hidden'">
      <input id="landmarks" v-model="showLandmarks" type="checkbox" />
      <label for="landmarks">Show landmarks</label>
    </div>
  </div>
</template>
<script>
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
  },
  data() {
    return {
      isLoaded: false,
      isVideoPlaying: false,
      showLandmarks: true,

      height: 480,
      width: 640,

      isDestroyed: false,
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
      const videoEl = this.$refs.inputVideo
      if (this.isDestroyed || !videoEl) {
        return
      }
      if (videoEl.paused || videoEl.ended || !this.faceDetectionNet.params) {
        return window.requestAnimationFrame(this.track)
      }

      const canvas = this.$refs.overlay
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
        if (this.showLandmarks) {
          faceApi.draw.drawFaceLandmarks(canvas, face)
        }
        this.$emit('face', { ctx, face, faceapi: faceApi })
      }
      window.requestAnimationFrame(this.track)
    },
    async run() {
      // load face detection and face landmark models
      await Promise.all([
        this.faceDetectionNet.load('/weights'),
        faceApi
          .loadFaceLandmarkModel('/weights')
          .then(() => this.$emit('loadedModel')),
      ])

      // try to access users webcam and stream the images
      // to the video element
      const video = this.$refs.inputVideo
      const { height, width } = this
      video.srcObject = await navigator.mediaDevices.getUserMedia({
        video: { frameRate: 30, height, width },
      })
      const canvas = this.$refs.overlay
      canvas.width = width
      canvas.height = height
      video.play()
    },
  },
}
</script>
