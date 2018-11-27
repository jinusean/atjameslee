<template>
  <div class="smiley-face">
    <div class="eyes">
      <div class="eye" />
      <div class="eye" />
    </div>
    <div class="mouth" />
  </div>
</template>
<script>
export default {
  name: 'SmileyFace'
}
</script>
<style lang="scss">
.smiley-face {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 300px;
  height: 300px;
  background: #ffcc11;
  border-radius: 50%;
  box-shadow: inset 0px -14px 14px rgba(0, 0, 0, 0.3),
    0px 2px 20px rgba(0, 0, 0, 0.6);

  .eyes {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 22%;
    margin-top: 10%;

    .eye {
      width: 18%;
      background: #222;
      border-radius: 62.5%;
      margin: 0 5%;
      /*box-shadow: 0 2px 0 rgba(255, 255, 255, 0.8);*/
    }
  }

  .mouth {
    width: 40%;
    height: 15%;
    background: rgba(0, 0, 0, 0);
    border: 10px solid #222;
    border-top: 0;
    border-radius: 0 0 100% 100% / 0 0 200% 200%;
    margin-bottom: 10%;
  }
}
</style>
