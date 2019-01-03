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
    titleEl() {
      return this.$children[0].$refs.title
    }
  },
  mounted() {
    document.addEventListener('scroll', this.handleScroll)
    this.bannerEl.style.transformOrigin = 'center bottom'
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll({ target }) {
      if (!this.isTicking) {
        window.requestAnimationFrame(() => {
          this.evaluateParallax()
          this.isTicking = false
        })
      }

      this.isTicking = true
    },
    evaluateParallax() {
      const { scrollTop, scrollHeight } = document.documentElement
      const scale = scrollTop / scrollHeight
      this.bannerEl.style.transform = `scale(${1 + 2 * scale})`
      this.titleEl.style.marginTop = scrollTop + 'px'
      this.titleEl.style.transform = `scale(${1 + 8 * scale})`
    }
  }
}
</script>


<style lang="scss">
.project.project__bittionaire {
  position: relative;

  .project__header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    .project__banner {
      transform-origin: center bottom;

      img {
        display: block;
      }
    }

    .project__title {
      position: absolute;
      width: 100%;
      padding: 1em 0;
      margin: 0;
      font-size: 4em;
      font-style: italic;
      font-weight: 800;
      color: white;
      text-align: center;
      background: rgba(255, 0, 0, 0.75);
    }
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

    .project__header {
      margin: (-$layout-padding) (-$layout-padding) 0 (-$layout-padding);
    }
  }
}
</style>
