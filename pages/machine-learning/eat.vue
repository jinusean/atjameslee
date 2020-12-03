<template>
  <div class="flex-1 flex items-center justify-center">
    <div v-if="$store.state.isWebView" class="center-content page-container">
      <p>Please open this page in Safari App</p>
      <img
        src="@/assets/images/open-default-browser.jpg"
        style="height: 50vh"
        alt="open default browser"
      />
    </div>
    <div
      v-else-if="isMounted"
      class="flex justify-center items-center flex-col"
    >
      <div>
        <p class="text-center mt-4 font-bold text-2xl">Say "Ahh...."</p>
      </div>
      <FaceApi ref="faceApi" :landmarks="showLandmarks" @track="onTrack" />
      <div>
        <input id="landmarks" v-model="showLandmarks" type="checkbox" />
        <label for="landmarks">Show landmarks</label>
      </div>
    </div>
  </div>
</template>

<script>
import FaceApi from '@/components/detections/face-api/FaceApi'
import { draw } from '@/components/detections/face-api/draw'

export default {
  name: 'EatMePage',
  components: {
    FaceApi,
  },
  data() {
    return {
      isMounted: false,
      showLandmarks: true,
    }
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    onTrack({ face, ctx }) {
      if (!face) {
      }
      // draw(ctx, face.landmarks.positions, 'black')
    },
  },
}
</script>
