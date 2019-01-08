<template>
  <div class="about-title">
    <div class="about-title__outer">
      <div 
        ref="title"
        class="about-title__inner">
        <h1 id="title">
          <p style="font-size: 40%">
            James
          </p>
          <p style="font-size: 40%">
            Lee
          </p>
          <p class="subtitle" style="font-size: 12.5%">
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
.about-title {
  position: relative;
  width: 100%;
  height: calc(100vh - #{$navbar-height});

  .about-title__outer {
    position: absolute;
    width: 100%;
    height: 100%;
    clip-path: inset(0 0 0 0);
  }

  .about-title__inner {
    box-sizing: border-box;
    position: fixed;
    display: flex;
    /*justify-content: center;*/
    align-items: center;
    width: calc(100vw - #{$layout-padding * 2});
    //margin-left: -$layout-padding;

    padding: 0;
    max-width: calc(#{$layout-width} - #{$layout-padding * 2});
    height: calc(100vh - #{$navbar-height * 2});
    backface-visibility: hidden;

    h1,
    p {
      color: black;
      margin: 0;
      position: relative;

      .subtitle {
        /*font-size: 12.5%;*/
        /*line-height: 2;*/
      }

      .sub {

      }
    }
  }
}
</style>
