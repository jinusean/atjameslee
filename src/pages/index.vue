<template>
  <div>
    <p>
      I'm just a lowly fullstack developer who began his programming journey at the computer science department of State
      University of New York - Stony Brook Unversity.
      <br/>
      Nowdays I do web stuff, focusing on the front-end, but capable of writing RESTful services.
      <br/>
      In addition to programming, I've also completed courses in business and political science, and enjoy writing apps
      that relate to these disciplines.
    </p>

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
