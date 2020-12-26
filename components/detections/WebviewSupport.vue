<template>
  <div>
    <div v-if="$isMobile.apple.webview" class="center-content page-container">
      <p>Please open this page in Safari App</p>
      <img
        src="@/assets/images/open-default-browser.jpg"
        style="height: 50vh"
        alt="open default browser"
      />
    </div>
    <slot v-else-if="isMounted"> </slot>
  </div>
</template>

<script>
export default {
  name: 'WebviewSupport',
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
