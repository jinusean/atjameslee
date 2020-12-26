<template>
  <div class="flex-1 flex items-center justify-center">
    <WebviewSupport>
      <div class="flex justify-center items-center flex-col">
        <div>
          <p class="text-center mt-4 font-bold text-2xl">Say "Ahh...."</p>
        </div>
        <FaceApiWebcam
          ref="faceApi"
          weights-src="/models/faceapi"
          :landmarks="showLandmarks"
          @track="onTrack"
        />
        <div>
          <input id="landmarks" v-model="showLandmarks" type="checkbox" />
          <label for="landmarks">Show landmarks</label>
        </div>
      </div>
    </WebviewSupport>
  </div>
</template>

<script>
import FaceApiWebcam from '@/components/detections/face-api/FaceApiWebcam'
import { drawPepper } from '@/components/detections/face-api/draw'
import WebviewSupport from '@/components/detections/WebviewSupport'

export default {
  name: 'EatMePage',
  components: {
    WebviewSupport,
    FaceApiWebcam,
  },
  data() {
    return {
      showLandmarks: true,
    }
  },
  methods: {
    onTrack({ face, ctx }) {
      if (!face) {
        return
      }
      drawPepper(ctx, face.landmarks.positions, 'black')
    },
  },
}
</script>
