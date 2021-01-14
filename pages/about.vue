<template>
  <div class="flex flex-1 overflow-hidden relative">
    <SkyClouds class="absolute" />
    <!--    <SkyCloudsSvg />-->
  </div>
</template>

<script>
import SkyClouds from '@/components/misc/Sky/Sky'
export default {
  components: {
    SkyClouds,
  },
}
</script>

<style scoped>
.sky {
  width: 100vw;
  height: 100vh;
  /*background: linear-gradient(0deg, #62a0d8 0%, #2178d1 50%, #085cb3 100%);*/
  padding: 1%;
  overflow: hidden;
  position: relative;
}
</style>
