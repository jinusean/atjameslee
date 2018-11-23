<template>
  <div class="full-screen">
    <div class="main-wrapper">
      <div class="main-content">
        <h1>Hey Loser</h1>
      </div>
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
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  min-height: $content-size;

  .main-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: $content-size;
    width: $content-size;
    border: 1px solid black;
    border-radius: 25%;
  }
}
</style>
