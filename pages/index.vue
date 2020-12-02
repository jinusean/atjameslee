<template>
  <section class="w-full">
    <CoverPage />

    <div class="bg-white relative">
      <Parallax
        :src="`/images/nyc-${nycImageNumber}.png`"
        class="border-b-2 border-white"
      />

      <div class="text-white bg-slate">
        <div class="container w-container pb-6">
          <profile-img class="mb-8" />

          <client-only>
            <div
              v-scroll-reveal="{ origin: 'bottom' }"
              class="w-full lg:max-w-2xl text-left md:mx-auto my-0"
            >
              <nuxt-content :document="aboutMe" class="w-full" />
            </div>
          </client-only>
        </div>
      </div>

      <div class="container page-container">
        <skills-cards />

        <hr />

        <div class="more-information">
          <h2 class="uppercase font-bold text-2xl mb-2">More Information</h2>
          <p>
            Please checkout my
            <nuxt-link to="/projects">projects</nuxt-link>
            to see some of the work that I have been working on.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import CoverPage from '@/components/pages/about/CoverPage'
import Parallax from '@/components/images/Parallax'
import SkillsCards from '@/components/pages/about/SkillsCards'
import ProfileImg from '@/components/pages/about/ProfileImg'

export default {
  components: { Parallax, CoverPage, ProfileImg, SkillsCards },
  async asyncData({ $content }) {
    const [aboutMe] = await Promise.all([$content('about-me').fetch()])

    return {
      aboutMe,
    }
  },
  computed: {
    nycImageNumber() {
      const TOTAL = 3
      return Math.floor(Math.random() * TOTAL + 1)
    },
  },
}
</script>
