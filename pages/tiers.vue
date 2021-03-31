<template>
  <div class="flex-1">
    <h1 class="text-center mb-4" style="font-size: 4em">Tier Zoo</h1>
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
