<template>
  <div :style="style" class="imac-container">
    <figure>
      <img :src="src" class="w-full h-full" :alt="alt" />
    </figure>
  </div>
</template>

<script>
export default {
  name: 'MacImg',
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: undefined,
    },
    height: {
      type: Number,
      default: undefined,
    },
    unit: {
      type: String,
      default: 'em',
    },
  },
  computed: {
    style() {
      const multiplier = 1.2 // width always = height * multiplier

      let { width, height, unit } = this

      if (width) {
        height = width / multiplier
      } else if (height) {
        width = height * multiplier
      } else {
        height = 200
        width = height * multiplier
      }

      return `width:${width}${unit};height:${height}${unit}`
    },
  },
}
</script>

<style scoped>
.imac-container {
  /* height: 500px; */

  /* width: 600px; */
  position: relative;
  display: flex;
  justify-content: center;
  background: url('/images/imac.png');
  background-repeat: no-repeat;
  background-size: contain;
}

figure {
  position: absolute;
  top: 5.5%;
  width: 94%;
  height: 63%;
  overflow: hidden;
  border-radius: 1px;
}
</style>
