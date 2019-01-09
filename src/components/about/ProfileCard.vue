<template>
  <div class="profile-card">

    <Parallax 
      :src="`/images/nyc/${nycImageNumber}.png`" 
      class="profile-card__header-image"/>

    <div class="profile-card__info">
      <figure class="profile-card__profile-image">
        <img src="/images/white-shirt.png">
      </figure>

      <div
        v-scroll-reveal="{origin: 'bottom', viewFactor: PHI_B }"
        class="profile-card__description">
        <p>
          I am a humble full stack developer who began his development journey as a computer science student at the
          State University of New York in Stony Brook.
        </p>

        <p>
          Some of my earliest qualifications include coding in Java, MIPS assembly, and C#.
        </p>

        <p>
          Nowadays I do most of my work programming for a web browser, like the one your're using right now.
        </p>

        <p>
          With that in mind - sit back, relax, and take a look at how I express my interests digitally.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Parallax from '../images/Parallax'
export default {
  name: 'ProfileCard',
  components: { Parallax },
  computed: {
    nycImageNumber() {
      const TOTAL = 3
      return Math.floor(Math.random() * TOTAL + 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-card {
  width: 100%;

  .profile-card__profile-image {
    $a-margin: -9.88854rem;
    $b-margin: -6.11146rem;

    position: relative;
    height: 16em;
    text-align: center;
    margin-top: calc(-16em + calc(16em * #{$phi-b}));

    img {
      display: inline-block;
      height: 100%;
      padding: 0.125rem;
      background: white;
      border-top: 1px solid $gray-600;
      border-radius: 50%;
      @include box-shadow(0, 0, 0.5em, 0.125em, silver);
    }

    @include media-breakpoint-down(sm) {
      margin-top: calc(-16em + calc(16em * #{$phi-a}));
      img {
        padding: 2px;
      }
    }
  }

  .profile-card__description {
    width: 100%;
    max-width: 60rem;

    /* padding-top: 5em; */
    margin: 0 auto;
    font-size: 1.5em;

    @include media-breakpoint-up(sm) {
      max-width: 100%;
    }
  }
}
</style>
