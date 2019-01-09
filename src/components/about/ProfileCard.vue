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
          I'm just a lowly fullstack developer who began his programming journey at the computer science department of
          State
          University of New York - Stony Brook University.
        </p>

        <p>
          I have some prior experience coding in Java and C#, and even MIPS assembly during my time in university.
          Nowadays I do most of my work working on web apps, writing front-end code in Vue and back-end code in Node.
        </p>

        <p>
          Sit back, relax, and take a look at how I digitally express my offline interests.
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
      @include box-shadow(0, 0, 2.5em, 0.25em, gray);
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
