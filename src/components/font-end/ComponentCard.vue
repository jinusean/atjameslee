<template>
  <div class="component-card">
    <nuxt-link
      :to="`front-end/${component.id}`"
      class="component-card__content">

      <div class="component-card__preview">
        <img :src="`/images/${component.id}.png`">
      </div>

      <div class="component-card__info">
        <h3 class="component-card__title">{{ title }}</h3>
        <h4>{{ component.subtitle }}</h4>
        <p v-html="component.info"/>
      </div>

    </nuxt-link>

    <div class="component-card__links">
      <a
        v-if="component.gitlab"
        :href="`https://gitlab.com/jinusean/${component.id}`"
        target="_blank">
        <img src="/icons/gitlab.png">
      </a>
      <a
        v-if="component.npm"
        :href="`https://www.npmjs.com/package/${component.id}`"
        target="_blank">
        <img src="/icons/npm.png">
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
  display: flex;
  border: $border;
  border-radius: $component-card-radius;

  .component-card__content {
    display: grid;
    flex: 1;
    grid-template-columns: auto 1fr;
    grid-gap: 2em;
    padding: 1em;

    .component-card__preview {
      width: 16em;

      img {
        max-width: 100%;
        max-height: 16em;
      }
    }

    .component-card__info {
      .component-card__title {
        margin: 0 0 0.5em 0;
        text-transform: capitalize;
      }
      h4 {
        margin: 0;
      }
    }
  }

  .component-card__content:hover {
    color: inherit;
  }

  .component-card__links {
    padding: 1em 0.75em;
    background: $gray-200;
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

@include media-breakpoint-down(sm) {
  .component-card {
    .component-card__content {
      grid-template-rows: auto 1fr;
      grid-template-columns: auto;
    }
  }
}
</style>
