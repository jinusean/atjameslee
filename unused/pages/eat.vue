<template>
  <div class="flex-1 flex items-center justify-center">
    <WebviewSupport>
      <div class="flex justify-center items-center flex-col">
        <div>
          <p class="text-center mt-4 font-bold text-2xl">Say "Ahh...."</p>
        </div>
        <FaceVideo
          ref="faceApi"
          :height="size"
          :width="size"
          :options="options"
          model="FaceApi"
          @detect="onTrack"
        />
        <div>
          <input id="landmarks" v-model="options.landmarks" type="checkbox" />
          <label for="landmarks">Show landmarks</label>
        </div>
      </div>
    </WebviewSupport>
  </div>
</template>

<script>
import FaceVideo from '@/components/detections/FaceVideo'
import { drawPepper } from '@/components/detections/FaceApi/draw/drawPepper'
import WebviewSupport from '@/components/WebviewSupport'

export default {
  name: 'EatMePage',
  components: {
    WebviewSupport,
    FaceVideo,
  },
  data() {
    return {
      options: {
        landmarks: true,
      },
      size: 320,
    }
  },
  methods: {
    onTrack({ detections, canvas }) {
      if (!detections) {
        return
      }
      const ctx = canvas.getContext('2d')
      for (const detection of detections) {
        drawPepper(ctx, detection.landmarks.positions, 'black')
      }
    },
  },
}
</script>
