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

<style scoped></style>
