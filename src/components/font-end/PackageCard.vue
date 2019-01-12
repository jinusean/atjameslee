<template>

  <div class="package-card">

    <nuxt-link
      :to="`/packages/${data.id}`"
      class="package-card__preview no-style">
      <img :src="`/images/${data.id}.png`">
    </nuxt-link>

    <nuxt-link
      :to="`/packages/${data.id}`"
      class="no-style package-card__info">
      <h3 class="package-card__title">{{ title }}</h3>
      <h4 class="package-card__subtitle">{{ data.subtitle }}</h4>
      <p v-html="data.info"/>
    </nuxt-link>


    <div class="package-card__links">
      <a
        v-if="data.gitlab"
        :href="`https://gitlab.com/jinusean/${data.id}`"
        target="_blank">
        <img src="~/assets/logos/gitlab.png">
      </a>
      <a
        v-if="data.npm"
        :href="`https://www.npmjs.com/package/${data.id}`"
        target="_blank">
        <img src="~/assets/logos/npm.png">
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PackageCard',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    title() {
      return this.data.id.split('-').join(' ')
    }
  }
}
</script>

<style lang="scss" scoped>
$package-card-radius: 0.5em;

.package-card {
  display: grid;
  flex: 1;
  grid-template-columns: auto 1fr auto;
  grid-gap: 2em;
  height: 12em;
  overflow: hidden;
  border: $border;
  border-radius: $package-card-radius;
  box-shadow: none;
  transition: transform 300ms ease-in, box-shadow 300ms ease-in;

  .package-card__preview {
    width: 16em;
    padding: 1em;

    img {
      width: 100%;
      max-width: 100%;
      max-height: 100%;
    }
  }

  .package-card__info {
    padding: 1em;

    .package-card__title {
      margin: 0 0 0.5em 0;
      color: $link-color;
      text-transform: capitalize;
    }
    .package-card__subtitle {
      margin-top: 0;
    }

    p {
      margin: 0;
    }
  }

  .package-card__links {
    padding: 1em 0.75em;
    background: $gray-100;
    border-top-right-radius: $package-card-radius;
    border-bottom-right-radius: $package-card-radius;

    a {
      display: block;
      margin-bottom: 1em;

      img {
        width: 2em;
        max-height: 2em;

        &:hover {
          opacity: 0.5;
        }
      }
    }
  }
}

.package-card:hover {
  .package-card__title {
    text-decoration: underline;
  }

  @include media-breakpoint-up(md) {
    color: inherit;
    transform: translateY(-5px);
    @include box-shadow(0, 1em, 1em, -1em);
  }
}

@include media-breakpoint-down(sm) {
  .package-card {
    grid-template-rows: 1fr 1fr auto;
    grid-template-columns: auto;
    grid-gap: 0;
    height: 24em;

    /* border-radius: 0; */

    .package-card__preview {
      display: flex;
      justify-content: center;
      width: 100%;
      height: 10em;
      overflow: hidden;

      img {
        width: auto;
        min-height: 100%;
      }
    }

    .package-card__info {
      overflow: hidden;
    }

    .package-card__links {
      display: flex;
      align-items: center;

      a {
        margin: 0;

        &:not(:last-child) {
          margin-right: 1em;
        }
      }
    }
  }
}
</style>
