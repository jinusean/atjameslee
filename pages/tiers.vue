<template>
  <div class="flex-1">
    <h1 class="text-center text-xl sm:text-9xl">Animal Planet</h1>
    <div class="flex justify-center">
      <Tiers :data="data" />
    </div>
  </div>
</template>

<script>
import Tiers from '../components/misc/Tiers/Tiers.vue'
import data from '../components/misc/Tiers/tiers.json'
export default {
  components: {
    Tiers,
  },
  computed: {
    data() {
      return data
    },
  },
}
</script>

<style scoped></style>
