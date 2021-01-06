<template>
  <ImgDetection
    ref="imgDetection"
    :src="src"
    :detect="detect"
    v-bind="$attrs"
  />
</template>

<script>
import ImgDetection from '@/components/detections/ImgDetection'
import mixin, { OPTIONS } from './mixin'

export default {
  name: 'FaceApiImg',
  components: {
    ImgDetection,
  },
  mixins: [mixin],
  props: {
    src: {
      type: String,
      default: null,
    },
  },
  computed: {
    options() {
      return OPTIONS.reduce((options, option) => {
        options[option] = this[option]
        return options
      }, {})
    },
  },
  watch: {
    options() {
      this.$refs.imgDetection.load()
    },
  },
}
</script>
