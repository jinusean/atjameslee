<template>
  <div class="relative">
    <video
      ref="video"
      muted
      playsinline
      autoplay
      v-bind="$attrs"
      :src="src"
      :style="videoStyle"
      v-on="listeners"
    ></video>
    <canvas ref="canvas" class="absolute top-0" />
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
import { HollowDotsSpinner } from 'epic-spinners'

export default {
  name: 'CanvasVideo',
  components: {
    HollowDotsSpinner,
  },
  inheritAttrs: false,
  props: {
    src: {
      type: String,
      default: undefined,
    },

    srcObject: {
      type: MediaStream,
      default: undefined,
    },
    videoStyle: {
      type: String || Object,
      default: '',
    },
  },
  data() {
    return {
      isLoaded: false,
      stream: null,
    }
  },
  computed: {
    dotSize() {
      const maxSize = 40
      const minSize = 10

      const width =
        this.width || this.$refs.video
          ? this.$refs.video.getBoundingClientRect().width
          : 1
      const dotSize = width / 16

      if (dotSize > maxSize) {
        return maxSize
      }
      if (dotSize < minSize) {
        return minSize
      }
      return dotSize
    },
    listeners() {
      const loadedmetadata = this.onLoadedmetadata
      const { video, canvas } = this.$refs
      // attach video and canvas elements to event
      const listeners = [
        'play',
        'pause',
        'playing',
        'loadeddata',
        'ended',
      ].reduce((listeners, eventName) => {
        listeners[eventName] = (event) => {
          event.video = video
          event.canvas = canvas
          if (this.$listeners[eventName])
            return this.$listeners[eventName](event)
        }
        return listeners
      }, {})

      return { ...this.$listeners, ...listeners, loadedmetadata }
    },
  },
  watch: {
    srcObject: {
      immediate: true,
      handler(srcObject) {
        this.$nextTick(() => {
          this.$refs.video.srcObject = srcObject
        })
      },
    },
  },
  methods: {
    async onLoadedmetadata(event) {
      if (this._isDestroyed) return
      const { video, canvas } = this.$refs
      const videoWidth = video.videoWidth
      const videoHeight = video.videoHeight
      video.width = videoWidth
      video.height = videoHeight
      canvas.width = videoWidth
      canvas.height = videoHeight

      event.video = video
      event.canvas = canvas

      if (this.$listeners.loadedmetadata) {
        await this.$listeners.loadedmetadata(event)
      }
      this.isLoaded = true
    },
  },
}
</script>
