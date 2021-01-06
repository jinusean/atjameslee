<template functional>
  <div class="sm:flex sm:justify-between">
    <div class="mb-8 sm:mb-0 sm:order-1 flex-1 flex justify-center">
      <div class="sm:fixed">
        <h3 class="mb-2">OPTIONS</h3>
        <slot name="options" />
      </div>
    </div>

    <div class="flex flex-col items-center children:mb-8">
      <slot name="content" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'FRSection',
}
</script>
