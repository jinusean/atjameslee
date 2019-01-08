<template>
  <div class="cover-page">
    <div class="cover-page__outer">
      <div 
        ref="title"
        class="cover-page__inner">
        <h1 id="title">
          <p class="name">
            James
          </p>
          <p class="name">
            Lee
          </p>
          <p
            class="subtitle">
            Full Stack Developer
          </p>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import fitty from 'fitty'

export default {
  name: 'AboutTitle',
  mounted() {
    fitty('#title')
  }
}
</script>

<style lang="scss" scoped>
.cover-page {
  position: relative;
  width: 100%;
  height: calc(100vh - #{$navbar-height});

  .cover-page__outer {
    position: absolute;
    width: 100%;
    height: 100%;
    clip-path: inset(0 0 0 0);
  }

  .cover-page__inner {
    position: fixed;
    box-sizing: border-box;
    display: flex;

    justify-content: center;
    align-items: center;
    width: calc(100vw - #{$layout-padding * 2});
    max-width: calc(#{$layout-width} - #{$layout-padding * 2});
    height: calc(100vh - #{$navbar-height * 2});

    padding: 0;
    backface-visibility: hidden;

    h1,
    p {
      position: relative;
      margin: 0;
      color: black;

      .name,
      .name {
        font-size: 61.8034%;
      }

      .subtitle {
        font-size: 38.1966%;
        line-height: 1.6180339887;
      }
    }
  }
}
</style>
