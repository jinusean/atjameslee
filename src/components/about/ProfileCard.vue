<template>
  <div class="profile-card">

    <figure class="profile-card__profile-image">
      <img src="/images/white-shirt.png">
    </figure>


    <no-ssr>
      <div
        v-scroll-reveal="{origin: 'bottom', viewFactor: PHI_B }"
        class="profile-card__description">
        <p v-html="aboutMe"/>
      </div>
    </no-ssr>
  </div>
</template>

<script>
import aboutMe from '~/articles/about-me.yaml'

export default {
  name: 'ProfileCard',
  computed: {
    aboutMe() {
      return aboutMe
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-card {
  width: 100%;
  color: black;

  .profile-card__profile-image {
    // phi margins
    $a-margin: -9.88854em;
    $b-margin: -6.11146em;

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
    max-width: 48rem;
    margin: 0 auto;
    font-size: 1.5em;
    text-align: center;

    @include media-breakpoint-down(sm) {
      max-width: 100%;
      text-align: left;
    }
  }
}
</style>
