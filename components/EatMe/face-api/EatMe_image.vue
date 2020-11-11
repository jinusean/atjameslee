<template>
  <div class="center-content page-container">
    <div id="loader" ref="loader" class="progress">
      <div class="indeterminate"></div>
    </div>
    <div style="position: relative" class="margin">
      <video
        id="inputVideo"
        ref="inputVideo"
        autoplay
        muted
        playsinline
        @loadedmetadata="onPlay"
      ></video>
      <canvas id="overlay" />
    </div>

    <div class="row side-by-side">
      <!-- image_selection_control -->
      <div id="selectList"></div>
      <div class="row">
        <label for="imgUrlInput">Get image from URL:</label>
        <input id="imgUrlInput" type="text" class="bold" />
      </div>
      <button class="waves-effect waves-light btn" @click="loadImageFromUrl">
        Ok
      </button>
      <input
        id="queryImgUploadInput"
        type="file"
        class="waves-effect btn bold"
        accept=".jpg, .jpeg, .png"
        @change="loadImageFromUpload"
      />
      <!-- image_selection_control -->
    </div>

    <div class="row side-by-side">
      <!-- face_detector_selection_control -->
      <div
        id="face_detector_selection_control"
        class="row input-field"
        style="margin-right: 20px"
      >
        <select id="selectFaceDetector" v-model="selectedFaceDetector">
          <option value="ssd_mobilenetv1">SSD Mobilenet V1</option>
          <option value="tiny_face_detector">Tiny Face Detector</option>
        </select>
        <label>Select Face Detector</label>
      </div>
      <!-- face_detector_selection_control -->

      <!-- check boxes -->
      <div class="row" style="width: 220px">
        <input
          id="hideBoundingBoxesCheckbox"
          v-model="withBoxes"
          type="checkbox"
          @change="onChangeHideBoundingBoxes"
        />
        <label for="hideBoundingBoxesCheckbox">Hide Bounding Boxes</label>
      </div>
      <!-- check boxes -->
    </div>

    <!-- ssd_mobilenetv1_controls -->
    <span id="ssd_mobilenetv1_controls" ref="ssd_mobilenetv1_controls">
      <div class="row side-by-side">
        <div class="row">
          <label for="minConfidence">Min Confidence:</label>
          <input
            id="minConfidence"
            ref="minConfidence"
            v-model="minConfidence"
            disabled
            type="text"
            class="bold"
          />
        </div>
        <button
          class="waves-effect waves-light btn"
          @click="onDecreaseMinConfidence"
        >
          <i class="material-icons left">-</i>
        </button>
        <button
          class="waves-effect waves-light btn"
          @click="onIncreaseMinConfidence"
        >
          <i class="material-icons left">+</i>
        </button>
      </div>
    </span>
    <!-- ssd_mobilenetv1_controls -->

    <!-- tiny_face_detector_controls -->
    <span id="tiny_face_detector_controls" ref="tiny_face_detector_controls">
      <div class="row side-by-side">
        <div class="row input-field" style="margin-right: 20px">
          <select id="inputSize" v-model="inputSize">
            <option value="" disabled selected>Input Size:</option>
            <option value="160">160 x 160</option>
            <option value="224">224 x 224</option>
            <option value="320">320 x 320</option>
            <option value="416">416 x 416</option>
            <option value="512">512 x 512</option>
            <option value="608">608 x 608</option>
          </select>
          <label>Input Size</label>
        </div>
        <div class="row">
          <label for="scoreThreshold">Score Threshold:</label>
          <input
            id="scoreThreshold"
            disabled
            value="0.5"
            type="text"
            class="bold"
          />
        </div>
        <button
          class="waves-effect waves-light btn"
          @click="onDecreaseScoreThreshold()"
        >
          <i class="material-icons left">-</i>
        </button>
        <button
          class="waves-effect waves-light btn"
          @click="onIncreaseScoreThreshold"
        >
          <i class="material-icons left">+</i>
        </button>
      </div>
    </span>
    <!-- tiny_face_detector_controls -->
  </div>
</template>

<script>
import * as faceapi from 'face-api.js'

const SSD_MOBILENETV1 = 'ssd_mobilenetv1'
const TINY_FACE_DETECTOR = 'tiny_face_detector'

export default {
  data() {
    return {
      withBoxes: true,
      minConfidence: 0.5,
      selectedFaceDetector: TINY_FACE_DETECTOR,
      scoreThreshold: 0.5,
      inputSize: 512,
    }
  },
  mounted() {
    // initImageSelectionControls()
    // initFaceDetectionControls()
    this.run()
  },
  methods: {
    async changeFaceDetector(detector) {
      const controls = [
        'ssd_mobilenetv1_controls',
        'tiny_face_detector_controls',
      ]
      controls.forEach((id) => {
        this.$refs[id].style.display = 'none'
      })

      this.selectedFaceDetector = detector

      this.$refs.loader.style.display = 'block'
      if (!this.isFaceDetectionModelLoaded()) {
        const currentDetectionNet = this.getCurrentFaceDetectionNet()
        await currentDetectionNet.loadFromUri('/')
      }

      this.$refs[detector + '_controls'].style.display = 'block'
      this.$refs.loader.style.display = 'none'
    },
    async loadImageFromUrl(url) {
      // const img = await requestExternalImage($('#imgUrlInput').val())
      // $('#inputImg').get(0).src = img.src
      // updateResults()
    },
    async loadImageFromUpload() {
      // const imgFile = $('#queryImgUploadInput').get(0).files[0]
      // const img = await faceapi.bufferToImage(imgFile)
      // $('#inputImg').get(0).src = img.src
      // this.updateResults()
    },
    onChangeHideBoundingBoxes() {
      this.updateResults()
    },
    onDecreaseMinConfidence() {
      this.minConfidence = Math.max(
        faceapi.utils.round(this.minConfidence - 0.1),
        0.1
      )

      this.updateResults()
    },
    onIncreaseMinConfidence() {
      this.minConfidence = Math.min(
        faceapi.utils.round(this.minConfidence + 0.1),
        1.0
      )
      this.updateResults()
    },

    onIncreaseScoreThreshold() {
      this.scoreThreshold = Math.min(
        faceapi.utils.round(this.scoreThreshold + 0.1),
        1.0
      )
      this.updateResults()
    },

    onDecreaseScoreThreshold() {
      this.scoreThreshold = Math.max(
        faceapi.utils.round(this.scoreThreshold - 0.1),
        0.1
      )
      this.updateResults()
    },

    async updateResults() {
      if (!this.isFaceDetectionModelLoaded()) {
        return
      }
      const inputImgEl = this.$refs.inputImg
      console.log(inputImgEl)
      const options = this.getFaceDetectorOptions()
      const results = await faceapi
        .detectAllFaces(inputImgEl, options)
        .withFaceLandmarks()
      console.log(6)
      const canvas = this.$refs.overlay
      faceapi.matchDimensions(canvas, inputImgEl)
      const resizedResults = faceapi.resizeResults(results, inputImgEl)

      if (this.withBoxes) {
        faceapi.draw.drawDetections(canvas, resizedResults)
      }
      faceapi.draw.drawFaceLandmarks(canvas, resizedResults)
    },

    async run() {
      // load face detection and face landmark models
      await this.changeFaceDetector(SSD_MOBILENETV1)
      await faceapi.loadFaceLandmarkModel('/')
      // start processing image
      await this.updateResults()
      console.log(3)
    },

    getFaceDetectorOptions() {
      return this.selectedFaceDetector === SSD_MOBILENETV1
        ? new faceapi.SsdMobilenetv1Options({
            minConfidence: this.minConfidence,
          })
        : new faceapi.TinyFaceDetectorOptions({
            inputSize: this.inputSize,
            scoreThreshold: this.scoreThreshold,
          })
    },
    getCurrentFaceDetectionNet() {
      if (this.selectedFaceDetector === SSD_MOBILENETV1) {
        return faceapi.nets.ssdMobilenetv1
      }
      if (this.selectedFaceDetector === TINY_FACE_DETECTOR) {
        return faceapi.nets.tinyFaceDetector
      }
    },

    isFaceDetectionModelLoaded() {
      return !!this.getCurrentFaceDetectionNet().params
    },
  },
}
</script>

<style scoped>
.page-container {
  left: 0;
  right: 0;
  margin: auto;
  margin-top: 20px;
  padding-left: 280px;
  display: inline-flex !important;
}

@media only screen and (max-width: 992px) {
  .page-container {
    padding-left: 0;
    display: flex !important;
  }
}

#navbar {
  position: absolute;
  top: 20px;
  left: 20px;
}

.center-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.side-by-side {
  display: flex;
  justify-content: center;
  align-items: center;
}
.side-by-side > * {
  margin: 0 5px;
}

.bold {
  font-weight: bold;
}

.margin-sm {
  margin: 5px;
}

.margin {
  margin: 20px;
}

.button-sm {
  padding: 0 10px !important;
}

.pad-sides-sm {
  padding: 0 8px !important;
}

#github-link {
  display: flex !important;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid;
  margin-bottom: 10px;
}

#overlay,
.overlay {
  position: absolute;
  top: 0;
  left: 0;
}

#facesContainer canvas {
  margin: 10px;
}

input[type='file']::-webkit-file-upload-button {
  background: #26a69a;
  border: 1px solid gray;
  cursor: pointer;
  color: #fff;
  border-radius: 0.2em;
}
</style>
