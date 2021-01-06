<template>
  <div>
    <FaceApiImg :src="$utils.getAsset('images/biden.png')" />
  </div>
</template>

<script>
import FaceApiImg from '@/components/detections/FaceApi/FaceApiImg'
export default {
  components: {
    FaceApiImg,
  },
}
</script>

<style scoped></style>
