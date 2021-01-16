<template>
  <component
    :is="component"
    ref="child"
    v-bind="$attrs"
    @play="isPlaying = true"
    @pause="isPlaying = false"
    @loadedmetadata="onloadedmetadata"
  />
</template>

<script>
import CanvasVideo from '@/components/base/CanvasVideo'
import CanvasWebcam from '@/components/base/CanvasWebcam'
import faceDetectionMixin from '@/components/detections/base/faceDetectionMixin'

export default {
  name: 'FaceVideo',
  components: {
    CanvasVideo,
    CanvasWebcam,
  },
  mixins: [faceDetectionMixin],
  props: {
    camera: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      models: {},
    }
  },
  computed: {
    component() {
      return this.camera ? CanvasWebcam : CanvasVideo
    },
  },
  watch: {
    camera(camera) {
      if (this.faceModel) {
        this.faceModel.mirror = camera
      }
    },
  },
  methods: {
    detectVideo() {
      if (this._isDestroyed) return

      return new Promise((resolve) => {
        window.requestAnimationFrame(async () => {
          const detections = await this.faceModel.detectAndDraw()
          if (detections) {
            const { canvas, element } = this.faceModel
            this.$emit('detect', { canvas, element, detections })
          }
          resolve()
          return this.detectVideo()
        })
      })
    },
    async onloadedmetadata(event) {
      const { child } = this.$refs
      if (!child.$el !== event.target) {
        return console.log(
          'Ref and child do not match',
          this.$refs.child,
          event.target
        )
      }
      const id = this.child._uid
      if (this.models[id]) return

      const { canvas, video } = child.$refs
      this.models[id] = await this.loadModel({ canvas, video }, this.options)
      this.models[id].mirror = this.camera

      if (this.$listeners.loadedmetadata) {
        await this.$listeners.loadedmetadata(event)
      }
    },
    async play({ target }) {

    },
    async event(e) {
      // if (e.type !== 'loadedmetadata') return
      // this.faceModel = await this.loadModel(payload, this.options)
      // this.faceModel.mirror = this.camera
      // if (this.$listeners.loadedmetadata) {
      //   await this.$listeners.loadedmetadata(payload)
      // }
      // return this.detectVideo()
    },
  },
}
</script>
