<template>
  <div class="jcl-avatar">J</div>
</template>
<script>
export default {
  name: 'JclAvatar'
}
</script>
<style lang="scss">
$size: 128px;

.jcl-avatar {
  display: inline-block;
  width: $size;
  height: $size;
  font-size: $size / 2;
  line-height: $size;
  color: white;
  text-align: center;
  background: grey;
  border-radius: 50%;
}
</style>
