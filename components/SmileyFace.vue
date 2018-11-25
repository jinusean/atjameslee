<template>
  <div class="smiley-face">
    <div class="eyes">
      <div class="eyes__left"/>
      <div class="eyes__right"/>
    </div>
    <div class="mouth">
      <div class="corner"/>
      <div class="corner right"/>
    </div>
  </div>
</template>
<style lang="scss">
.smiley-face {
  display: block;
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 150px;
  background: yellow;
  /*background: -webkit-gradient(*/
    /*linear,*/
    /*left top,*/
    /*left bottom,*/
    /*from(#fffe8d),*/
    /*to(#f6d23e)*/
  /*);*/
  /*background: -moz-linear-gradient(top, #fffe8d, #f6d23e);*/
  box-shadow: inset 0px -14px 14px rgba(0, 0, 0, 0.3),
    0px 2px 20px rgba(0, 0, 0, 0.6);

  .eyes {
    position: absolute;
    width: 50px;
    height: 80px;
    background: #222;
    border-radius: 100px/160px;
    top: 40px;
    box-shadow: 0 2px 0 rgba(255, 255, 255, 0.8);

    .eyes__right {
      right: 75px;
    }

    .eyes__left {
      left: 75px;
    }
  }

  .mouth {
    width: 200px;
    height: 70px;
    border: 10px solid #222;
    border-top: 0;
    background: rgba(0, 0, 0, 0);
    border-radius: 0 0 120px 120px / 0 0 90px 90px;
    position: absolute;
    bottom: 50px;
    left: 38px;
    box-shadow: 0 2px 0 rgba(255, 255, 255, 0.8);

    .corner {
      width: 10px;
      height: 30px;
      background: #222;
      border-radius: 100px/160px;
      position: absolute;
      top: -12px;
      left: -12px;
      transform: rotate(65deg);
    }

    .corner.right {
      left: 202px;
      transform: rotate(-65deg);
    }
  }
}
</style>
