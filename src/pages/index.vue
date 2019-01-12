<template>
  <section class="about">
    <CoverPage/>

    <ProfileCard class="profile-card"/>

    <skills-cards/>

    <div class="more-information">
      <h2>
        More Information
      </h2>
      <p>
        Please checkout my <nuxt-link to="/projects">projects</nuxt-link> to see some of the work that I have been working on.
      </p>
    </div>
  </section>
</template>
<script>
import CoverPage from '../components/about/CoverPage'
import Tag from '../components/TagsList/Tag'
import ProfileCard from '../components/about/ProfileCard'
import SkillsCards from '../components/about/SkillsCards'

export default {
  components: { SkillsCards, ProfileCard, CoverPage },
  methods: {}
}
</script>
<style lang="scss">
.about > *:not(:first-child) {
  margin-bottom: 4em;
  font-size: 1.2em;
}

.profile-card {
}
</style>
