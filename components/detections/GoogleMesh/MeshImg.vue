<template>
  <ImgDetection :src="src" :detect="detect" v-bind="$attrs" />
</template>

<script>
import ImgDetection from '@/components/detections/ImgDetection'
import mixin from './mixin'

export default {
  name: 'MeshImg',
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
}
</script>
