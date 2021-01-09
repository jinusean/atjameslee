<template>
  <div class="relative">
    <video
      ref="video"
      muted
      playsinline
      autoplay
      v-bind="$attrs"
      :src="src"
      @loadedmetadata="onLoadedmetadata"
    ></video>
    <canvas ref="canvas" class="absolute top-0" />
    <canvas v-if="useOverlay" ref="overlay" class="absolute top-0" />
    <div
      v-if="!isLoaded"
      id="loading-wrapper"
      class="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-75"
    >
      <HollowDotsSpinner
        :animation-duration="1000"
        :dot-size="dotSize"
        color="#ffffff"
      />
    </div>
  </div>
</template>
<script>
import CanvasVideo from '@/components/base/CanvasVideo'
import CanvasWebcam from '@/components/base/CanvasWebcam'
export default {
  name: 'CanvasVideoWebcam',
  components: {
    CanvasWebcam,
    CanvasVideo,
  },
  props: {
    src: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      isLoaded: false,
      stream: null,
    }
  },
  computed: {
    component: {},
  },
}
</script>
