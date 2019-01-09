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
      const BUFFER_PERCENT = 0.10
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

      const ratio = (top - scrollableTop) / scrollableHeight
      const scale = Math.max(ratio * (MAX_SCALE - MIN_SCALE) + MIN_SCALE, 1)
      console.log(scale)
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
  @include marginless(md);

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 36em;
  overflow: hidden;

  @include media-breakpoint-down(sm) {
    height: 40vh;
  }

  img {
    position: absolute;
    top: 0;
    display: block;
    min-width: 100%;
    height: inherit;
    min-height: 100%;
    transform-origin: center top;

    /* height: 100%; */
  }
}
</style>
