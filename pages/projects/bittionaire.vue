<template>
  <div class="relative">
    <div
      ref="header"
      class="relative flex items-center justify-center overflow-hidden lg:container mx-auto"
    >
      <figure class="w-full origin-bottom">
        <img
          ref="banner"
          class="block w-full"
          alt="bittionaire"
          :src="`/images/${project.images.banner}`"
        />
      </figure>

      <h1
        ref="title"
        class="absolute w-full py-4 text-6xl text-white text-center font-extrabold italic"
        style="background: rgba(255, 0, 0, 0.75)"
      >
        {{ project.name }}
      </h1>
    </div>
    <br />

    <Project
      class="container page-container"
      :project="project"
      :document="document"
    />
  </div>
</template>

<script>
import db from '~/database/database'
import Project from '~/components/projects/Project'

export default {
  components: { Project },
  async asyncData({ $content }) {
    const document = await $content('bittionaire').fetch()
    return { document }
  },
  computed: {
    project() {
      return db.findProject('bittionaire')
    },
    bannerEl() {
      return this.$refs.banner
    },
    titleEl() {
      return this.$refs.title
    },
  },
  mounted() {
    document.addEventListener('scroll', this.handleScroll)
    this.bannerEl.style.transformOrigin = 'center bottom'
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
      const { scrollTop, scrollHeight } =
        document.scrollingElement || document.documentElement
      if (scrollTop < 0) {
        // lol safari
        return
      }
      const scale = scrollTop / scrollHeight
      this.bannerEl.style.transform = `scale(${1 + 2 * scale})`
      this.titleEl.style.marginTop = scrollTop / 2 + 'px'
      this.titleEl.style.transform = `scale(${1 + 8 * scale})`
    },
  },
}
</script>
