<template>
  <div class="eyes-wrapper">

    <div class="photo">
      <div class="eyes">
        <eye/><eye/>
      </div>
    </div>
  </div>
</template>

<script>
import Eye from '~/components/Eye.vue'

export default {
  components: { Eye }
}
</script>

<style lang="scss">
.eyes-wrapper {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;

  .photo {
    position: relative;
    height: 300px;
    width: 200px;
    background-size: contain;
    background: url('/images/james.jpg') no-repeat center center;
    background-size: 100% 100%;

    .eyes {
      position: absolute;
      width: 100%;
      top: 46%;
      display: flex;
      justify-content: center;

      > * {
        margin-left: 20px;
        margin-right: 20px;
      }
    }
  }
}
</style>
