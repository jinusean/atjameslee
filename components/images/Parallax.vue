<template>
  <div
    class="parallax relative flex items-center justify-center w-full overflow-hidden"
  >
    <img
      ref="img"
      class="absolute max-w-none sm:max-w-full sm:min-w-full"
      :src="src"
      alt="nyc"
    />
  </div>
</template>
<script>
export default {
  name: 'Parallax',
  props: {
    src: {
      type: String,
      required: true,
    },
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
      const BUFFER_PERCENT = 0.1
      const MAX_SCALE = 2
      const MIN_SCALE = 1
      const HEADER_HEIGHT = 70
      const { innerHeight: windowHeight } = window
      const {
        height,
        top,
        bottom,
      } = this.$refs.img.parentElement.getBoundingClientRect()
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
      this.setScale(scale)
    },
    setScale(scale) {
      this.$refs.img.style.transform = `scale(${scale})`
    },
  },
}
</script>

<style scoped>
.parallax {
  height: 36em;
  min-width: 100vw;
}

.parallax img {
  top: 0;
  height: inherit;
  transform-origin: center top;

  /* height: 100%; */
}

@screen sm {
  .parallax {
    height: 40vh;
  }
}
</style>
