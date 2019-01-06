<template>
  <section class="about">
    <div class="about__title">
      <div class="about__title__inner">
        <h1>
          <p>
            James
          </p>
          <p>
            C. Lee
          </p>
        </h1>
      </div>
    </div>

    <div class="about__description">
      <p>
        I'm just a lowly fullstack developer who began his programming journey at the computer science department of State
        University of New York - Stony Brook University.
      </p>

      <p>
        Nowadays I do web stuff, focusing on the front-end, but capable of writing back-end apis.
      </p>

      <p>
        In addition to programming, I've also completed courses in business and political science, and enjoy writing apps
        that relate to these disciplines.
      </p>
    </div>

  </section>
</template>
<script>
export default {
}
</script>
<style lang="scss">
.about {
  /* display: flex; */

  .about__title {
    //padding-top: $navbar-height;
    box-sizing: border-box;
    height: 100vh;
    margin: -$navbar-height 0 0 0;


    .about__title__inner {
      position: fixed;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 8em;
      width: 1100px;
      max-width: 100%;
      margin: auto 0;

      p {
        margin: 0;
      }
    }
  }

  .about__description {

  }
}
</style>
