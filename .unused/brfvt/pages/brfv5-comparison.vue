<template>
  <div
    class="w-full h-full flex-row flex items-center justify-center m-auto"
    style="transform: scaleX(-1)"
  >
    <div class="center-content mx-auto max-w-full relative">
      <video id="_webcam" ref="video" class="hidden" playsinline />
      <canvas id="_imageData" ref="canvas" class="max-w-full" />
    </div>
    <div class="center-content mx-auto max-w-full relative relative">
      <video ref="v" playsinline />
      <canvas ref="c" class="max-w-full w-full h-full absolute" />
    </div>
  </div>
</template>

<script>
import { SystemUtils } from 'brfv5-browser/js/utils/utils__system'
import { drawCircles } from 'brfv5-browser/js/utils/utils__canvas.js'
import { setLogLevel } from 'brfv5-browser/js/utils/utils__logging.js'
import { brfv5Module } from 'brfv5-browser/js/brfv5/brfv5_js_tk121020_v5.2.0_trial.js'
import {
  disableDynamicPerformance,
  enableDynamicPerformance,
} from 'brfv5-browser/js/brfv5/brfv5__dynamic_performance'
import {
  draw,
  drawDick,
  drawRects,
  drawRect,
} from '~/components/EatMe/brfv5/draw'

setLogLevel(false)

const brfv5 = {}

export default {
  name: 'Brfv5',
  props: {
    landmarks: {
      default: true,
      type: Boolean,
    },
    numFacesToTrack: {
      default: 1,
      type: Number,
    },
    enableFreeRotation: {
      default: true,
      type: Boolean,
    },
    numTrackingPasses: {
      type: Number,
      default: 3,
      validator(numTrackingPasses) {
        return numTrackingPasses > 0 && numTrackingPasses < 7
      },
    },
    maxRotationZReset: {
      type: Number,
      default: 999.0,
    },
  },
  data() {
    return {
      // dependencies
      manager: null,
      config: null,

      // options
      color: '#00a0ff',
      width: 640,
      height: 480,
      frameRate: 30,
      facingMode: 'user',
      modelName: '68l',
      isDestroyed: false,

      c: null,
    }
  },
  computed: {
    configa() {
      const configureExample = (brfv5Config) => {
        // face-tracking: landmarks
        const faceTrackingConfig = {
          numFacesToTrack: this.numFacesToTrack,
          numTrackingPasses: this.numTrackingPasses,
          enableFreeRotation: this.enableFreeRotation,
          maxRotationZReset: this.maxRotationZReset,
        }
        Object.assign(brfv5Config.faceTrackingConfig, faceTrackingConfig)
      }

      return {
        // See face_tracking__choose_model.js for more info about the models.
        modelName: '68l',
        numChunksToLoad: SystemUtils.isMobileOS ? 4 : 8,

        // If true, numTrackingPasses and enableFreeRotation will be set dynamically depending
        // on the app's CPU usage. See brfv5__dynamic_performance.js for more insights.
        enableDynamicPerformance: SystemUtils.isMobileOS,

        // onConfigure and onTracking are callbacks to setup example specific behaviour, eg.
        // for smile detection, PNG overlay or ThreeJS 3d object placement etc.
        onConfigure: configureExample,
        onTracking: this.onTracking,
      }
    },
  },
  mounted() {
    this.run()

    this.c = document.createElement('canvas')
    this.c.width = this.width
    this.c.height = this.height
  },
  destroyed() {
    this.isDestroyed = true
  },
  methods: {
    track() {
      if (this.isDestroyed) {
        return
      }
      const ctx = this.$refs.c.getContext('2d')
      ctx.clearRect(0, 0, this.width, this.height)
      // ctx.drawImage(this.$refs.video, 0, 0, this.width, this.height)
      if (this.config.enableFaceTracking) {
        const sizeFactor = Math.min(this.width, this.height) / 480.0
        const faces = this.manager.getFaces()

        drawCircles(
          ctx,
          [
            { x: 0, y: 0 },
            { x: 50, y: 50 },
            { x: 200, y: 200 },
            { x: 300, y: 300 },
          ],
          '#00a0ff',
          2.0 * sizeFactor
        )

        for (let i = 0; i < faces.length; i++) {
          const face = faces[i]
          if (face.state === brfv5.BRFv5State.FACE_TRACKING) {
            if (this.landmarks) {
              drawCircles(ctx, face.landmarks, '#00a0ff', 2.0 * sizeFactor)
              // drawRect(ctx, face.bounds, '#ffffff', 1.0) // landmarks bounding box
            }
            // draw(ctx, face.landmarks, face.rotationZ, 'black', 25, 100)
          } else {
            // Only draw face detection results, if face detection was performed.
            drawRect(
              ctx,
              this.config.faceDetectionConfig.regionOfInterest,
              '#ffffff',
              2.0
            )
            drawRects(ctx, this.manager.getDetectedRects(), '#00a0ff', 1.0)
            drawRects(ctx, this.manager.getMergedRects(), '#ffffff', 3.0)
          }
        }
      }
      requestAnimationFrame(this.track)
    },
    trackFaces() {
      if (this.isDestroyed) {
        return
      }
      const canvas = this.$refs.canvas
      if (!this.manager || !this.config || !canvas) {
        console.log('no manager or cnofig or canvs')
        return
      }

      const ctx = canvas.getContext('2d')
      // ctx.setTransform(-1.0, 0, 0, 1, this.width, 0) // A virtual mirror should be... mirrored
      ctx.drawImage(this.$refs.video, 0, 0, this.width, this.height)
      // ctx.setTransform(1.0, 0, 0, 1, 0, 0) // unmirror to draw the results
      this.manager.update(ctx.getImageData(0, 0, this.width, this.height))

      if (this.config.enableFaceTracking) {
        const sizeFactor = Math.min(this.width, this.height) / 480.0
        const faces = this.manager.getFaces()

        for (let i = 0; i < faces.length; i++) {
          const face = faces[i]
          if (face.state === brfv5.BRFv5State.FACE_TRACKING) {
            if (this.landmarks) {
              drawCircles(ctx, face.landmarks, '#00a0ff', 2.0 * sizeFactor)
              drawRect(ctx, face.bounds, '#ffffff', 1.0) // landmarks bounding box
            }
            // draw(ctx, face.landmarks, face.rotationZ, 'black', 25, 100)
            continue
          }
          // draw face detection roi
          drawRect(
            ctx,
            this.config.faceDetectionConfig.regionOfInterest,
            '#ffffff',
            2.0
          )
          drawRects(ctx, this.manager.getDetectedRects(), '#00a0ff', 1.0)
          drawRects(ctx, this.manager.getMergedRects(), '#ffffff', 3.0)
        }
      }

      requestAnimationFrame(this.trackFaces)
    },
    configureTracking() {
      if (this.config === null || this.width <= 0) {
        return console.log('no config or width')
      }
      // Camera stream and BRFv5 are ready. Now configure. Internal defaults are set for a 640x480 resolution.
      // So the following isn't really necessary.

      const brfv5Config = this.config
      const imageWidth = this.width
      const imageHeight = this.height

      const inputSize = imageWidth > imageHeight ? imageHeight : imageWidth

      // Setup image data dimensions

      brfv5Config.imageConfig.inputWidth = imageWidth
      brfv5Config.imageConfig.inputHeight = imageHeight

      const sizeFactor = inputSize / 480.0

      // Set face detection region of interest and parameters scaled to the image base size.

      brfv5Config.faceDetectionConfig.regionOfInterest.setTo(
        0,
        0,
        imageWidth,
        imageHeight
      )

      brfv5Config.faceDetectionConfig.minFaceSize = 144 * sizeFactor
      brfv5Config.faceDetectionConfig.maxFaceSize = 480 * sizeFactor

      if (imageWidth < imageHeight) {
        // Portrait mode: probably smartphone, faces tend to be closer to the camera, processing time is an issue,
        // so save a bit of time and increase minFaceSize.

        brfv5Config.faceDetectionConfig.minFaceSize = 240 * sizeFactor
      }

      // Set face tracking region of interest and parameters scaled to the image base size.

      brfv5Config.faceTrackingConfig.regionOfInterest.setTo(
        0,
        0,
        imageWidth,
        imageHeight
      )

      brfv5Config.faceTrackingConfig.minFaceScaleStart = 50.0 * sizeFactor
      brfv5Config.faceTrackingConfig.maxFaceScaleStart = 320.0 * sizeFactor

      brfv5Config.faceTrackingConfig.minFaceScaleReset = 35.0 * sizeFactor
      brfv5Config.faceTrackingConfig.maxFaceScaleReset = 420.0 * sizeFactor

      brfv5Config.faceTrackingConfig.confidenceThresholdReset = 0.001

      brfv5Config.faceTrackingConfig.enableStabilizer = true

      brfv5Config.faceTrackingConfig.maxRotationXReset = 35.0
      brfv5Config.faceTrackingConfig.maxRotationYReset = 45.0
      brfv5Config.faceTrackingConfig.maxRotationZReset = 34.0

      brfv5Config.faceTrackingConfig.numTrackingPasses = 3
      brfv5Config.faceTrackingConfig.enableFreeRotation = true
      brfv5Config.faceTrackingConfig.maxRotationZReset = 999.0

      brfv5Config.faceTrackingConfig.numFacesToTrack = 1
      brfv5Config.enableFaceTracking = true

      this.manager.configure(brfv5Config)
      const isDynamicPerformance = true
      if (isDynamicPerformance) {
        // Let BRFv5 manager the numTrackingPasses depending on the CPU usage or...
        enableDynamicPerformance(this.manager, this.config)
      } else {
        disableDynamicPerformance()

        // ... use fixed numTrackingPasses and enableFreeRotation
      }
    },
    async loadModel() {
      const libraryName = 'brfv5_js_tk121020_v5.2.0_trial.brfv5'
      const self = this

      Object.assign(brfv5, {
        appId: 'brfv5.browser.minimal.nomodules',
        binaryLocation: '/models/' + libraryName,
        modelLocation: '/models/' + this.modelName + '_c',
        modelChunks: 8, // 4, 6, 8
        binaryProgress(progress) {
          // console.log('progress:', progress)
        },
        onInit(manager, config) {
          self.manager = manager
          self.config = config
        },
      })
      await brfv5Module(brfv5)
    },
    async openCamera() {
      const { width, height, frameRate, facingMode } = this
      const mediaStream = await window.navigator.mediaDevices.getUserMedia({
        video: { frameRate, facingMode, width, height },
      })
      const video = this.$refs.video
      // subscribe to events
      const videoEvents = 'abort canplay canplaythrough durationchange emptied encrypted ended error interruptbegin interruptend loadeddata loadedmetadata loadstart mozaudioavailable pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting'.split(
        ' '
      )
      videoEvents.forEach((eventName) => {
        video.addEventListener(eventName, (event) =>
          this.$emit(eventName, event)
        )
      })
      video.srcObject = mediaStream
      await video.play()
      const canvas = this.$refs.canvas
      canvas.width = width
      canvas.height = height

      const v = this.$refs.v
      v.srcObject = mediaStream
      await v.play()
      const c = this.$refs.c
      c.width = width
      c.height = height
    },
    async run() {
      await this.openCamera()
      await this.loadModel()
      this.configureTracking()
      this.trackFaces()
      this.track()
    },
  },
}
</script>
