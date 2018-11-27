<template>
  <div class="main-wrapper">
    <div class="main-content">
      <h1>Hey Loser</h1>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss">
.main-wrapper {
  $content-size: 250px;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: $content-size;

  .main-content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: $content-size;
    height: $content-size;
    border: 1px solid black;
    border-radius: 25%;
  }
}
</style>
