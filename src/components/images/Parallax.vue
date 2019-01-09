<template>
  <div class="parallax">
    <img
      ref="img"
      :src="src">
  </div>
</template>

<script>
export default {
  name: 'Parallax',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  mounted() {
    document.addEventListener('scroll', this.handleScroll)
    this.evaluateParallax()
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      if (!this.isTicking) {
        window.requestAnimationFrame(() => {
          this.evaluateParallax()
          this.isTicking = false
        })
      }

      this.isTicking = true
    },
    evaluateParallax() {
      const { scrollTop } =
        document.scrollingElement || document.documentElement

      // lol safari
      if (scrollTop < 0) {
        return
      }
      const BUFFER_PERCENT = 0.20
      const MAX_SCALE = 2
      const MIN_SCALE = 1
      const HEADER_HEIGHT = 70
      const { innerHeight: windowHeight } = window
      const { height, top, bottom } = this.$refs.img.parentElement.getBoundingClientRect()
      const BUFFER_PIXELS = height * BUFFER_PERCENT

      const scrollableTop = HEADER_HEIGHT + BUFFER_PIXELS
      const scrollableBottom = windowHeight - BUFFER_PIXELS
      const scrollableHeight = scrollableBottom - scrollableTop

      // at the top of the page
      if (bottom < scrollableTop) {
        return this.setScale(MIN_SCALE)
      }

      if (top > scrollableBottom) {
        return this.setScale(MAX_SCALE)
      }

      console.log(height, BUFFER_PERCENT, HEADER_HEIGHT, scrollableTop)

      const ratio = (scrollableTop - scrollTop) / scrollableHeight
      const scale = ratio * (MAX_SCALE - MIN_SCALE) + MIN_SCALE
      this.setScale(scale)
    },
    setScale(scale) {
      this.$refs.img.style.transform = `scale(${scale})`
    }
  }
}
</script>

<style lang="scss" scoped>
.parallax {
  width: 100%;
  min-height: 36em;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  img {
    position: absolute;
    top: 0;
    display: block;
    transform-origin: center top;
  }
}
</style>
