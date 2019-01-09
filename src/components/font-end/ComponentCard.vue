<template>

  <div class="component-card">

    <nuxt-link
      :to="`/packages/${component.id}`"
      class="component-card__preview no-style">
      <img :src="`/images/${component.id}.png`">
    </nuxt-link>

    <nuxt-link
      :to="`/packages/${component.id}`"
      class="no-style component-card__info">
      <h3 class="component-card__title">{{ title }}</h3>
      <h4 class="component-card__subtitle">{{ component.subtitle }}</h4>
      <p v-html="component.info"/>
    </nuxt-link>


    <div class="component-card__links">
      <a
        v-if="component.gitlab"
        :href="`https://gitlab.com/jinusean/${component.id}`"
        target="_blank">
        <img src="~/assets/logos/gitlab.png">
      </a>
      <a
        v-if="component.npm"
        :href="`https://www.npmjs.com/package/${component.id}`"
        target="_blank">
        <img src="~/assets/logos/npm.png">
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentCard',
  props: {
    component: {
      type: Object,
      required: true
    }
  },
  computed: {
    title() {
      return this.component.id.split('-').join(' ')
    }
  }
}
</script>

<style lang="scss" scoped>
$component-card-radius: 0.5em;

.component-card {
  display: grid;
  flex: 1;
  grid-template-columns: auto 1fr auto;
  grid-gap: 2em;
  height: 12em;
  overflow: hidden;
  border: $border;
  border-radius: $component-card-radius;
  box-shadow: none;
  transition: transform 300ms ease-in, box-shadow 300ms ease-in;

  .component-card__preview {
    width: 16em;
    padding: 1em;

    img {
      width: 100%;
      max-width: 100%;
      max-height: 100%;
    }
  }

  .component-card__info {
    padding: 1em;

    .component-card__title {
      margin: 0 0 0.5em 0;
      color: $link-color;
      text-transform: capitalize;
    }
    .component-card__subtitle {
      margin-top: 0;
    }

    p {
      margin: 0;
    }
  }

  .component-card__links {
    padding: 1em 0.75em;
    background: $gray-100;
    border-top-right-radius: $component-card-radius;
    border-bottom-right-radius: $component-card-radius;

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

.component-card:hover {
  .component-card__title {
    text-decoration: underline;
  }

  @include media-breakpoint-up(md) {
    color: inherit;
    transform: translateY(-5px);
    @include box-shadow(0, 1em, 1em, -1em);
  }
}

@include media-breakpoint-down(sm) {
  .component-card {
    grid-template-rows: 1fr 1fr auto;
    grid-template-columns: auto;
    grid-gap: 0;
    height: 24em;

    /* border-radius: 0; */

    .component-card__preview {
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

    .component-card__info {
      overflow: hidden;
    }

    .component-card__links {
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
