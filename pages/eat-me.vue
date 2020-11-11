<template>
  <div
    class="fixed top-0 w-screen h-screen flex items-center justify-center bg-black"
  >
    <eat-me v-if="isMounted" />
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

<style scoped></style>
