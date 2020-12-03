<template>
  <div>
    <div class="modal-row">
      <h3 class="mb-4"><code>'store/store.js'</code></h3>

      <div class="grid gap-4 sm:grid-flow-col">
        <img
          src="@/assets/images/vuex-actions-states-store.png"
          alt="src/store/plugins.client.js"
        />
        <p>
          Given the following vuex-store file with actions: <b>fetchThis</b>,
          <b>fetchThat</b> & <b>dontFetch</b>.<br />
          <br />
          Each action will be wrapped with a mutation that increments the
          counter on the <b>actionStates</b> property. <br />(accessed via store
          <i><b>this.$store.state.actionsStates</b></i> or via
          <i><b>this.$actions.states</b></i
          >.<br /><br />
          <b>fetchThis</b> is a promsie that will resolve after 5 seconds.<br /><br />
          <b>fetchThat</b> will complete immediately.<br /><br />
          <b>dontFetch</b> will not be called.
        </p>
      </div>
    </div>

    <hr class="my-4" />

    <div class="modal-row">
      <h3 class="mb-4">Vue Devtools</h3>

      <div class="grid gap-4 sm:grid-flow-col">
        <img
          src="@/assets/images/vuex-actions-states-devtools1.png"
          alt="vue-devtools"
        />

        <p>
          <b>fetchThis</b> has <i>1</i> action not yet completed (PENDING)<br /><br />
          <b>fetchThat</b> has <i>0</i> pending actions (DONE)<br /><br />
          <b>dontFetch</b> is <i>undefined</i> because it has never been called
          (INITIAL)
        </p>
      </div>
    </div>

    <hr class="my-4" />

    <div class="modal-row">
      <h3 class="mb-4">...after awaiting <b>fetchThis</b></h3>

      <div class="grid gap-4 sm:grid-flow-col">
        <img
          src="@/assets/images/vuex-actions-states-devtools2.png"
          alt="vue-devtools"
        />

        <p>
          <b>fetchThis</b> has <i>0</i> pending actions and <b>foo</b> has been
          mutated (DONE)<br /><br />
          <b>fetchThat</b> has <i>0</i> pending actions (DONE)<br /><br />
          <b>dontFetch</b> is <i>undefined</i> because it has never been called
          (INITIAL)
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VuexActionsStatesModalBody',
}
</script>

<style scoped>
/*grid-template-columns: 12em auto;*/

@screen sm {
  .modal-row > div {
    grid-template-columns: 12em auto;
  }
}

@screen md {
  .modal-row > div {
    grid-template-columns: 20em auto;
  }
}

img {
  max-width: 100%;
  max-height: 16em;
}

/*@screen sm {*/
/*  img {*/
/*    max-width: 16em;*/
/*  }*/
/*}*/
</style>
