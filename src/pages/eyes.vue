<template>
  <div class="full-screen">
    <div class="eyes-wrapper">
      <div class="photo">
        <div class="eyes"><eye /> <eye /></div>
      </div>
    </div>
  </div>
</template>
<script>
import Eye from '~/components/Eye.vue'

export default {
  name: 'Eye',
  components: { Eye }
}
</script>

<style lang="scss">
.eyes-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  .photo {
    position: relative;
    width: 200px;
    height: 300px;
    background: url('/images/james.jpg') no-repeat center center;
    background-size: 100% 100%;

    .eyes {
      position: absolute;
      top: 46%;
      display: flex;
      justify-content: center;
      width: 100%;

      > * {
        margin-right: 20px;
        margin-left: 20px;
      }
    }
  }
}
</style>
