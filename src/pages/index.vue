<template>
  <section class="about">
    <AboutTitle/>

    <div class="about__description">
      <p>
        I'm just a lowly fullstack developer who began his programming journey at the computer science department of
        State
        University of New York - Stony Brook University.
      </p>

      <p>
        Nowadays I do web stuff, focusing on the front-end, but capable of writing back-end apis.
      </p>

      <p>
        In addition to programming, I've also completed courses in business and political science, and enjoy writing
        apps
        that relate to these disciplines.
      </p>
    </div>

    <div style="height:50vh;"></div>

  </section>
</template>
<script>
import AboutTitle from '../components/about/AboutTitle'
export default {
  components: { AboutTitle }
}
</script>
<style lang="scss">
.about {
  /* display: flex; */

}

.about__description {

}
</style>
