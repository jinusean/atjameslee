<template>
  <div class="jcl-avatar">
    J
  </div>
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
  height: $size;
  width: $size;
  line-height: $size;
  font-size: $size / 2;
  text-align: center;
  border-radius: 50%;
  background: grey;
  color: white;
}
</style>
