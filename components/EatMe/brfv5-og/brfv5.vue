<template>
  <div class="flex items-center justify-center w-screen h-full">
    <div id="__brfv5" class="__brfv5"></div>
  </div>
</template>

<script>
import { SystemUtils } from 'brfv5-browser/js/utils/utils__system'
import { brfv5 } from 'brfv5-browser/js/brfv5/brfv5__init.js'
import {
  colorPrimary,
  colorSecondary,
} from 'brfv5-browser/js/utils/utils__colors.js'
import { drawCircles } from 'brfv5-browser/js/utils/utils__canvas.js'
import { drawFaceDetectionResults } from 'brfv5-browser/js/utils/utils__draw_tracking_results.js'
import { setLogLevel } from 'brfv5-browser/js/utils/utils__logging.js'
import { setupExample, trackCamera } from './setup__example.js'

setLogLevel(false)

export default {
  name: 'Brfv5',
  props: {
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
      isLoaded: false,
      isVideoPlaying: false,
      showLandmarks: true,
    }
  },
  computed: {
    config() {
      const configureExample = (brfv5Config) => {
        // @todo optimize later
        brfv5Config.faceTrackingConfig.numFacesToTrack = this.numFacesToTrack
        brfv5Config.faceTrackingConfig.numTrackingPasses = this.numTrackingPasses
        brfv5Config.faceTrackingConfig.enableFreeRotation = this.enableFreeRotation
        brfv5Config.faceTrackingConfig.maxRotationZReset = this.maxRotationZReset
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
        // onTracking: this.onTracking,
      }
    },
  },
  mounted() {
    this.run()
  },
  methods: {
    onTracking(brfv5Manager, brfv5Config, canvas) {
      // Here we draw the first face blue and the second face white.
      // If no face was tracked, draw the detected rectangles.

      const ctx = canvas.getContext('2d')
      const faces = brfv5Manager.getFaces()

      let doDrawFaceDetection = false
      for (let i = 0; i < faces.length; i++) {
        const face = faces[i]
        if (face.state === brfv5.BRFv5State.FACE_TRACKING) {
          const color = i === 0 ? colorPrimary : colorSecondary

          drawCircles(ctx, face.landmarks, color, 3.0)
        } else {
          doDrawFaceDetection = true
        }
      }
      console.log('!!!!!!! doDrawFaceDetection', doDrawFaceDetection)
      if (doDrawFaceDetection) {
        drawFaceDetectionResults(brfv5Manager, brfv5Config, canvas)
      }

      return false
    },
    run() {
      setupExample(this.config)
      trackCamera()
    },
  },
}
</script>
<style src="./brfv5_examples.css" />
<style src="./brfv5_select.css" />
<style scoped>
.__brfv5 {
  position: static;
}
</style>
