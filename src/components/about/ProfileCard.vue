<template>
  <div class="profile-card">

    <Parallax
      :src="`/images/nyc/${nycImageNumber}.png`"
      class="profile-card__header-image"/>

    <div class="profile-card__info">
      <!--<figure class="profile-card__profile-image">-->
        <!--<img src="/images/white-shirt.png">-->
      <!--</figure>-->

      <div
        v-scroll-reveal="{origin: 'bottom', viewFactor: PHI_B }"
        class="profile-card__description">
        <p>
          I am a full stack developer who began his development journey as a computer science student in New York.
        </p>

        <p>
          Some of my earliest studies include coding in Java, MIPS assembly, and C#. Nowadays I do most of my work
          programming for the web using Javascript with Node and Vue.
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
  color: black;

  .profile-card__header-image {
    margin-bottom: 4em;
  }




  .profile-card__profile-image {
    // phi margins
    $a-margin: -9.88854rem;
    $b-margin: -6.11146rem;

    position: relative;
    height: 16em;
    margin-top: $a-margin;
    text-align: center;

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
      margin-top: $b-margin;
      img {
        padding: 2px;
      }
    }
  }

  .profile-card__description {
    max-width: 40rem;
    text-align: center;

    /* padding-top: 5em; */
    margin: 0 auto;
    font-size: 1.5em;

    @include media-breakpoint-down(sm) {
      text-align: left;
      max-width: 100%;
    }
  }
}
</style>
