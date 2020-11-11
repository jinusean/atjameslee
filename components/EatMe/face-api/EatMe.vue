<template>
  <div class="center-content page-container">
    <div :style="isLoaded ? '' : 'visibility: hidden'">
      <p class="text-center mt-4 font-bold text-2xl">Say "AHHH...."</p>
    </div>
    <div class="relative -scale-100" style="transform: scaleX(-1)">
      <video
        id="inputVideo"
        ref="inputVideo"
        autoplay
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
    async onLoadedMetaData() {
      await this.play()
      this.isVideoPlaying = true
    },
    async play() {
      const videoEl = this.$refs.inputVideo

      if (videoEl.paused || videoEl.ended || !this.isFaceDetectionModelLoaded())
        return setTimeout(() => this.play())

      const options = this.getFaceDetectorOptions()

      const result = await faceapi
        .detectSingleFace(videoEl, options)
        .withFaceLandmarks()

      if (result) {
        const canvas = this.$refs.overlay
        const dims = faceapi.matchDimensions(canvas, videoEl, true)
        const resizedResult = faceapi.resizeResults(result, dims)

        if (this.boundingBox) {
          // faceapi.draw.drawDetections(canvas, resizedResult)
        }
        if (this.showLandmarks) {
          faceapi.draw.drawFaceLandmarks(canvas, resizedResult)
        }
        // artist.draw(canvas, resizedResult)
        drawDicks(
          canvas.getContext('2d'),
          resizedResult.landmarks.positions,
          '#000000'
        )
        this.isLoaded = true
      }

      setTimeout(() => this.play())
    },
    async changeFaceDetector(detector) {
      this.model = detector
      if (!this.isFaceDetectionModelLoaded()) {
        await this.getCurrentFaceDetectionNet().load('/weights')
      }
    },
    async run() {
      // load face detection and face landmark models
      await this.changeFaceDetector(this.model)
      await faceapi.loadFaceLandmarkModel('/weights')

      // try to access users webcam and stream the images
      // to the video element
      this.$refs.inputVideo.srcObject = await navigator.mediaDevices.getUserMedia(
        { video: {} }
      )
    },
  },
}
</script>
