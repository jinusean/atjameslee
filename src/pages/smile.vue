<template>
  <div class="smiley-wrapper"><smiley-face /></div>
</template>
<script>
import SmileyFace from '../components/SmileyFace'
export default {
  components: { SmileyFace }
}
</script>
<style lang="scss">
.smiley-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
</style>
