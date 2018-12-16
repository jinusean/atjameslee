<template>
  <div>
    <nuxt-child/>
    <div class="component">
      <nuxt-link
        class="component__content"
        to="/components/react-photo-uploader">

        <div class="component__preview">
          <img src="/images/react-photo-uploader.png">
        </div>

        <div class="component__info">
          <h3>React Photo Uploader</h3>
          <h4>Upload, drop, take a photo</h4>
          <p>Made with React. </p>
        </div>

      </nuxt-link>

      <div class="component__share">
        <a
          href="https://gitlab.com/jinusean/react-photo-uploader"
          target="_blank">
          <img src="/icons/gitlab.png">
        </a>
        <a
          href="https://www.npmjs.com/package/react-photo-uploader"
          target="_blank">
          <img src="/icons/npm.png">
        </a>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'ComponentsPage'
}
</script>
<style lang="scss">
.component {
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
