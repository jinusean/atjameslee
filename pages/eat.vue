<template>
  <div class="w-full h-full flex items-center justify-center m-auto">
    <div v-if="$store.state.isWebView" class="center-content page-container">
      <p>Please open this page in Safari App</p>
      <img
        src="/images/open-default-browser.jpg"
        style="height: 50vh"
        alt="open default browser"
      />
    </div>
    <div v-else-if="isMounted" class="center-content page-container">
      <div
        v-if="!isLoaded"
        class="fixed top-0 left-0 z-50 bg-black bg-opacity-75 text-white font-bold text-4xl w-full h-full center-content"
      >
        <p>Loading...</p>
      </div>
      <div :style="isLoaded ? '' : 'visibility: hidden'">
        <p class="text-center mt-4 font-bold text-2xl">Say "Ahh...."</p>
      </div>
      <brfv5 :landmarks="showLandmarks" @loadeddata="isLoaded = true" />
      <div>
        <input id="landmarks" v-model="showLandmarks" type="checkbox" />
        <label for="landmarks">Show landmarks</label>
      </div>
    </div>
  </div>
</template>

<script>
import Brfv5 from '~/components/EatMe/brfv5/brfv5'
export default {
  components: { Brfv5 },
  data() {
    return {
      isMounted: false,
      showLandmarks: false,
      isLoaded: false,
    }
  },
  mounted() {
    this.isMounted = true
  },
}
</script>

<style scoped></style>
