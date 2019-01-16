<template>
  <section class="about">
    <CoverPage/>

    <Parallax 
      :src="`/images/nyc-${nycImageNumber}.png`"
      class="about__background-picture"/>

    <ProfileCard class="profile-card"/>

    <skills-cards/>

    <div class="more-information">
      <h2>
        More Information
      </h2>
      <p>
        Please checkout my
        <nuxt-link to="/projects">projects</nuxt-link>
        to see some of the work that I have been working on.
      </p>
    </div>
  </section>
</template>
<script>
import CoverPage from '../components/about/CoverPage'
import Tag from '../components/TagsList/Tag'
import ProfileCard from '../components/about/ProfileCard'
import SkillsCards from '../components/about/SkillsCards'
import Parallax from '../components/images/Parallax'

export default {
  components: { Parallax, SkillsCards, ProfileCard, CoverPage },
  computed: {
    nycImageNumber() {
      const TOTAL = 3
      return Math.floor(Math.random() * TOTAL + 1)
    }
  },
  methods: {}
}
</script>
<style lang="scss">
.about > *:not(:first-child) {
  margin-bottom: 4em;
  font-size: 1.2em;
}

.about__background-picture {
  margin-bottom: 4em;

  @include media-breakpoint-down(sm) {
    margin-bottom: 2em;
  }
}
</style>
