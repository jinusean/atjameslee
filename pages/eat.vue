<template>
  <div class="flex-1 flex items-center justify-center">
    <WebviewSupport>
      <div class="flex justify-center items-center flex-col">
        <div>
          <p class="text-center mt-4 font-bold text-2xl">Say "Ahh...."</p>
        </div>
        <FaceApiVideo
          ref="faceApi"
          :height="size"
          :width="size"
          :options="options"
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
