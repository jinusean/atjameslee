<template>
  <div class="vue-date-input-body">
    <p>
      <a
        href="https://developers.google.com/web/fundamentals/accessibility/"
        target="_blank">Accessible</a>: tab through all control elements.
    </p>
    <p>
      <a
        href="https://developers.google.com/web/fundamentals/design-and-ux/responsive/"
        target="_blank">Responsive</a>: adjust the browser width and see the magic.
    </p>
    <div class="vue-date-input">
      <vue-date-input v-model="dates"/>
    </div>
  </div>
</template>

<script>
import VueDateInput from 'vue-date-input'
import 'vue-date-input/dist/styles.css'

export default {
  components: { VueDateInput },
  data() {
    return {
      dates: [new Date(), new Date()]
    }
  }
}
</script>

<style lang="scss">
.vue-date-input-body {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.vue-date-input {
  display: flex;
  flex: 1;
  justify-content: center;
}

.date-picker {
  margin-top: 20%;

  .date-range__footer {
    button {
      padding: 0.8em 1em;
      font-size: 13px;
    }
  }
}
</style>
