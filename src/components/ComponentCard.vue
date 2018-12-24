<template>
  <div class="component-card">
    <nuxt-link
      :to="`/components/${component.id}`"
      class="component-card__content">

      <div class="component-card__preview">
        <img :src="`/images/${component.id}.png`">
      </div>

      <div class="component-card__info">
        <h3>{{ component.title }}</h3>
        <h4>{{ component.subtitle }}</h4>
        <p> {{ component.info }} </p>
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
  }
}
</script>

<style lang="scss" scoped>
.component-card {
  display: flex;
  border: $border;
  border-radius: 0.5em;

  .component-card__content {
    display: grid;
    flex: 1;
    grid-template-columns: auto 1fr;
    grid-gap: 2em;
    padding: 1em;

    .component-card__preview {
      width: 16em;
      height: 16em;

      img {
        max-width: 100%;
        max-height: 100%;
      }
    }

    .component__info {
      h3 {
        margin: 0 0 0.5em 0;
      }
      h4 {
        margin: 0;
      }
    }
  }

  .component-card__links {
    padding: 1em 0.75em;
    background: $gray-200;
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
</style>
