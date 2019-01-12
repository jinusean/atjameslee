<template>
  <div class="smiley-wrapper"><smiley-face /></div>
</template>
<script>
import SmileyFace from '../components/misc/SmileyFace'
export default {
  components: { SmileyFace }
}
</script>
<style lang="scss">
.smiley-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
