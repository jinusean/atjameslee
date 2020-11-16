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
        playsinline
        @loadedmetadata="onLoadedMetaData"
      ></video>
      <canvas id="overlay" ref="overlay" class="absolute top-0 max-w-full" />
    </div>
    <div :style="isVideoPlaying ? '' : 'visibility: hidden'">
      <input id="landmarks" v-model="showLandmarks" type="checkbox" />
      <label for="landmarks">Show landmarks</label>
    </div>
  </div>
</template>

<script>
import * as faceapi from 'face-api.js'
import { drawDicks } from './draw'

const SSD_MOBILENETV1 = 'ssd_mobilenetv1'
const TINY_FACE_DETECTOR = 'tiny_face_detector'

const models = [SSD_MOBILENETV1, TINY_FACE_DETECTOR]

export default {
  props: {
    minConfidence: {
      type: Number,
      default: 0.5,
    },
    inputSize: {
      type: Number,
      default: 512,
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
    }
  },
  mounted() {
    this.run()
  },
  methods: {
    isFaceDetectionModelLoaded() {
      return !!this.getCurrentFaceDetectionNet().params
    },
    getCurrentFaceDetectionNet() {
      const net = {
        [SSD_MOBILENETV1]: 'ssdMobilenetv1',
        [TINY_FACE_DETECTOR]: 'tinyFaceDetector',
      }[this.model]

      return faceapi.nets[net]
    },
    getFaceDetectorOptions() {
      return this.model === SSD_MOBILENETV1
        ? new faceapi.SsdMobilenetv1Options({
            minConfidence: this.minConfidence,
          })
        : new faceapi.TinyFaceDetectorOptions({
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
      if (
        videoEl.paused ||
        videoEl.ended ||
        !this.isFaceDetectionModelLoaded()
      ) {
        return window.requestAnimationFrame(this.track)
      }

      const canvas = this.$refs.overlay
      const ctx = canvas.getContext('2d')

      const result = await faceapi
        .detectSingleFace(videoEl, this.getFaceDetectorOptions())
        .withFaceLandmarks()

      if (result) {
        const dims = faceapi.matchDimensions(canvas, videoEl, true)
        const resizedResult = faceapi.resizeResults(result, dims)

        if (this.boundingBox) {
          faceapi.draw.drawDetections(canvas, resizedResult)
        }
        if (this.showLandmarks) {
          faceapi.draw.drawFaceLandmarks(canvas, resizedResult)
        }
        drawDicks(ctx, resizedResult.landmarks.positions, '#000000')
        this.isLoaded = true
      }

      window.requestAnimationFrame(this.track)
    },
    async changeFaceDetector(detector) {
      this.model = detector
      if (!this.isFaceDetectionModelLoaded()) {
        await this.getCurrentFaceDetectionNet().load('/weights')
      }
    },
    async run() {
      // load face detection and face landmark models
      await Promise.all([
        this.changeFaceDetector(this.model).then(() =>
          console.log('changeFaceDetector')
        ),
        faceapi
          .loadFaceLandmarkModel('/weights')
          .then(() => console.log('loaded model')),
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
