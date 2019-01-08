<template>
  <div class="about__title">
    <div class="about__title__s">
      <div ref="title" class="about__title__inner">
        <h1>
          <p>
            Hapsdjf ioasdjfio sadjf io
          </p>
          <p>
            aasdfjioasjoj
          </p>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutTitle',
  mounted() {
    const LAST_HEX = 16777215
    document.addEventListener('scroll', () => {
      const { scrollTop } =
      document.scrollingElement || document.documentElement
      const viewportHeight = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      )

      const scrollPercent = Math.min(scrollTop / viewportHeight, 1)
      const newValue = Math.ceil(scrollPercent * LAST_HEX)

      let hexString = newValue.toString(16)
      if (hexString.length % 2) {
        hexString = '0' + hexString
      }

      console.log(newValue, hexString)
      this.$refs.title.style.background = '#' + hexString
    })
  }
}
</script>

<style lang="scss" scoped>
.about__title {
  position: relative;
  min-height: calc(100vh - #{$navbar-height});
  width: 100%;
  overflow: hidden;

  .about__title__s {
    position: absolute;
    height: 100%;
    width: 100%;
    clip-path: inset(0 0 0 0);
  }

  .about__title__inner {
    position: fixed;
    left: 50%;
    top: calc(50% - #{$navbar-height});
    transform: translate(-50%, -50%);
    background: red;
    backface-visibility: hidden;

    h1,
    p {
      text-align: center;
      margin: 0;
    }
  }
}
</style>
