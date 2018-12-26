<template>
  <div>
    <div class="row">
      <h3>src/store/index.js</h3>

      <div class="row__content">
        <img
          src="/images/vuex-actions-states-store.png"
          alt="src/store/index.js">
        <p>
          Given the following vuex-store file with actions: <b>fetchThis</b>, <b>fetchThat</b> & <b>dontFetch</b>.<br>
          <br>
          Each action will be wrapped with a mutation that increments the counter on the <b>actionStates</b> property.
          <br>(accessed via store <i><b>this.$store.state.actionsStates</b></i> or via <i><b>this.$actions.states</b></i>.<br><br>
          <b>fetchThis</b> is a promsie that will resolve after 5 seconds.<br><br>
          <b>fetchThat</b> will complete immediately.<br><br>
          <b>dontFetch</b> will not be called.
        </p>
      </div>
    </div>

    <div class="row">
      <h3>Vue Devtools</h3>

      <div class="row__content">
        <img
          src="/images/vuex-actions-states-devtools1.png"
          alt="vue-devtools">

        <p>
          <b>fetchThis</b> has <i>1</i> action not yet completed (PENDING)<br><br>
          <b>fetchThat</b> has <i>0</i> pending actions (DONE)<br><br>
          <b>dontFetch</b> is <i>undefined</i> because it has never been called (INITIAL)
        </p>
      </div>
    </div>

    <div class="row">
      <h4>...after awaiting <b>fetchThis</b></h4>

      <div class="row__content">
        <img
          src="/images/vuex-actions-states-devtools2.png"
          alt="vue-devtools">

        <p>
          <b>fetchThis</b> has <i>0</i> pending actions and <b>foo</b> has been mutated (DONE)<br><br>
          <b>fetchThat</b> has <i>0</i> pending actions (DONE)<br><br>
          <b>dontFetch</b> is <i>undefined</i> because it has never been called (INITIAL)
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VuexActionsStatesModalBody'
}
</script>

<style lang="scss" scoped>
.row {
  margin-bottom: 1.5em;

  h3 {
    margin: 0 0 1em 0;
    font-style: italic;
  }

  p {
    margin: 0;
  }

  .row__content {
    display: grid;
    grid-template-columns: 9em auto;
    grid-gap: 2em;

    img {
      max-width: 100%;
      max-height: 16em;
    }

    p {
      max-width: 30em;
    }
  }
}
</style>
