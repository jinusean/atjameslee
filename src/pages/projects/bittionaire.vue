<template>
  <Project project-id="bittionaire"/>
</template>

<script>
import Project from '../../components/projects/Project'
import article from '~/articles/projects/bittionaire.md'

export default {
  components: { Project },
  computed: {
    project() {
      return this.$store.getters.getProject('bittionaire')
    },
    article() {
      return article
    },
    bannerEl() {
      return this.$children[0].$refs.banner
    },
    headingEl() {
      return this.$children[0].$refs.heading
    }
  },
  mounted() {
    document.addEventListener('scroll', this.handleScroll)
    this.bannerEl.parentElement.style.overflow = 'hidden'
    this.bannerEl.style.transformOrigin = 'center bottom'
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll({ target }) {
      if (!this.isTicking) {
        window.requestAnimationFrame(() => {
          const { scrollTop, scrollHeight } = document.documentElement
          const scale = 1 + (2 * scrollTop) / scrollHeight
          this.bannerEl.style.transform = `scale(${scale})`

          const { top, height } = this.bannerEl.getBoundingClientRect()
          const topBuffer = top + window.scrollY

          console.log(topBuffer)
          console.log(top, height)

          // const maxPosition =
          //   Math.floor(height - this.headingEl.getBoundingClientRect().height) -
          //   1
          // this.headingEl.style.top = newPosition + 'px'
          //
          // const newPosition = Math.min(scrollTop, maxPosition)

          this.isTicking = false
        })
      }

      this.isTicking = true
    }
  }
}
</script>


<style lang="scss">
.project.project__bittionaire {
  position: relative;

  .project__title {
    position: absolute;
    top: 0;
    /*left: 50%;*/
    /// margin-left: -25%;
    width: 100%;
    padding: 1em 0;
    margin: 0;
    font-size: 4em;
    font-style: italic;
    font-weight: 800;
    color: white;
    text-align: center;
    background: rgba(255, 0, 0, 0.75);
    //transform: skew(-10deg);
  }

  .img-event-loop {
    width: 50%;
    margin: auto;
  }
}
</style>

<style lang="scss">
@include media-breakpoint-down(sm) {
  .project.project__bittionaire {
    .img-event-loop {
      width: 100%;
      margin: auto;
    }
  }
}
</style>
