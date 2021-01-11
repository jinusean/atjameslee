<template>
  <div class="flex flex-col w-full min-h-screen">
    <div class="flex-grow-0 z-10">
      <jcl-navbar />
    </div>
    <div class="mt-16 flex flex-grow flex-col">
      <div class="flex-grow flex items-stretch">
        <nuxt />
      </div>
      <jcl-footer />
    </div>
  </div>
</template>

<script>
import JclNavbar from '@/components/layout/JclNavbar/JclNavbar'
import JclFooter from '@/components/layout/JclFooter'

export default {
  components: { JclNavbar, JclFooter },
}
</script>
<style scoped></style>
