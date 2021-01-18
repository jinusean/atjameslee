<template>
  <div
    class="vue-date-input-wrapper flex flex-col flex-1 justify-center max-w-full"
  >
    <div class="mb-12">
      <p>
        <a
          href="https://developers.google.com/web/fundamentals/accessibility/"
          target="_blank"
          >Accessible</a
        >: tab through all control elements.
      </p>
      <br />
      <p>
        <a
          href="https://developers.google.com/web/fundamentals/design-and-ux/responsive/"
          target="_blank"
          >Responsive</a
        >: adjust the browser width and see the magic.
      </p>
    </div>
    <client-only>
      <div class="p-8 rounded-2xl border border-gray-400">
        <vue-date-input v-model="dates" />
      </div>
    </client-only>
  </div>
</template>

<script>
import VueDateInput from 'vue-date-input/src/components/DatePicker'
import 'vue-date-input/dist/styles.css'

export default {
  components: { VueDateInput },
  data() {
    return {
      dates: [new Date(), new Date()],
    }
  },
}
</script>

<style>
@screen sm {
  .vue-date-input-wrapper {
    height: 48em;
    width: 40em;
  }
}

.date-range__footer button {
  padding: 0.8em 1em;
  font-size: 13px;
}
</style>
