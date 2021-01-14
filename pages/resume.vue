<template>
  <div class="bg-gray-600 overflow-scroll text-center">
    <div class="mt-20 mx-10 inline-block text-left">
      <Resume id="resume" ref="resume" />
    </div>
  </div>
</template>

<script>
import Resume from '@/components/resumes/Resume'

export default {
  name: 'ResumePage',
  layout: 'blank',
  components: {
    Resume,
  },
}
</script>

<style>
@media print {
  html,
  body {
    margin: 0 !important;
    padding: 0 !important;
  }
  body * {
    visibility: hidden;
  }
  #resume,
  #resume * {
    visibility: visible;
  }
  #resume {
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>
