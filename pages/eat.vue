<template>
  <div class="flex-1 flex items-center justify-center">
    <WebviewSupport>
      <div class="flex justify-center items-center flex-col">
        <div>
          <p class="text-center mt-4 font-bold text-2xl">Say "Ahh...."</p>
        </div>
        <FaceApiVideo
          ref="faceApi"
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
import FaceApiVideo from '@/components/detections/FaceApi/FaceApiVideo'
import { drawPepper } from '@/components/detections/draw'
import WebviewSupport from '@/components/detections/WebviewSupport'

export default {
  name: 'EatMePage',
  components: {
    WebviewSupport,
    FaceApiVideo,
  },
  data() {
    return {
      showLandmarks: true,
    }
  },
  methods: {
    onTrack({ detections, canvas }) {
      if (!detections) {
        return
      }
      const ctx = canvas.getContext('2d')
      drawPepper(ctx, detections[0].landmarks.positions, 'black')
    },
  },
}
</script>
