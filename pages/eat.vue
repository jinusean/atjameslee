<template>
  <div class="flex-1 flex items-center justify-center">
    <div v-if="$store.state.isWebView" class="center-content page-container">
      <p>Please open this page in Safari App</p>
      <img
        src="/images/open-default-browser.jpg"
        style="height: 50vh"
        alt="open default browser"
      />
    </div>
    <FaceApi v-else-if="isMounted" @face="onFace" />
  </div>
</template>

<script>
import FaceApi from '~/components/detections/face-api/FaceApi'
import { draw } from '~/components/detections/face-api/draw'
export default {
  name: 'EatMePage',
  components: {
    FaceApi,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  mounted() {
    this.isMounted = true
  },
  methods: {
    onFace({ face, ctx }) {
      draw(ctx, face.landmarks.positions, 'black')
    },
  },
}
</script>
