<template>
  <div class="profile-card">

    <figure class="profile-card__header-image">
      <img :src="`/images/nyc/${nycImageNumber}.png`">
    </figure>

    <div class="profile-card__info">
      <figure class="profile-card__profile-image">
        <img src="/images/white-shirt.png">
      </figure>
      <div class="profile-card__description">
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
export default {
  name: 'ProfileCard',
  computed: {
    nycImageNumber() {
      const TOTAL = 3
      return Math.floor(Math.random() * (TOTAL + 1))
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-card {
  width: 100%;

  .profile-card__header-image {

    img {
      width: 100%;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }
  }

  .profile-card__profile-image {
    margin: -12em auto -8em auto;
    width: 16em;

    img {
      border-top: 1px solid $gray-600;
      border-radius: 50%;
      //@include box-shadow(0, 0, 2.5em, 0.5em, gray);
    }
  }

  .profile-card__description {
    width: 100%;
    max-width: 60rem;
    margin: 0 auto;
    padding-top: 5em;
    font-size: 1.5em;

    @include media-breakpoint-up(sm) {
      max-width: 100%;
    }
  }
}
</style>
