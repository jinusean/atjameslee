<template>
  <figure
    class="monitor"
    :style="style">
    <div
      class="monitor__screen">
      <img
        :src="src"
        :alt="alt">
    </div>
    <div class="monitor__footer"/>
  </figure>
</template>

<script>
export default {
  name: 'MonitorImg',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: undefined
    },
    height: {
      type: Number,
      default: undefined
    },
    unit: {
      type: String,
      default: 'em'
    }
  },
  computed: {
    style() {
      const multiplier = 1.2 //width always = height * multiplier

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
    }
  }
}
</script>

<style lang="scss" scoped>
.monitor__screen {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border: 0.75em solid black;
  border-top-left-radius: 0.5em;

  img {
    width: 100%;
    height: 100%;
    border-radius: 1px;
  }

}
  .monitor__footer {
    width: 100%;
    border-bottom: 2em solid gray;
    border-bottom-right-radius: 0.5em;
    border-bottom-left-radius: 0.5em;
  }
</style>
