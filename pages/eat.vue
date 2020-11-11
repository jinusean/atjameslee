<template>
  <div class="w-full h-full flex items-center justify-center">
    <div v-if="$store.state.isWebView" class="center-content page-container">
      <p>Please open this page in Safari App</p>
      <img
        src="/images/open-default-browser.jpg"
        style="height: 50vh"
        alt="open default browser"
      />
    </div>
    <eat-me v-else-if="isMounted" />
    <!--    <eat-me />-->
  </div>
</template>

<script>
import EatMe from '~/components/EatMe/face-api/EatMe'
export default {
  name: 'EatMePage',
  components: {
    EatMe,
  },
  data() {
    return {
      isMounted: false,
    }
  },
  mounted() {
    this.isMounted = true
  },
}
</script>
