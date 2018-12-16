<template>
  <div>

  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.component-card {
  display: flex;
  border: $border;
  border-radius: 0.5em;

  .component__content {
    display: grid;
    flex: 1;
    grid-template-columns: auto 1fr;
    grid-gap: 2em;
    padding: 1em;
  }

  .component__preview {
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

  .component__share {
    padding: 1em 0.5em;
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
