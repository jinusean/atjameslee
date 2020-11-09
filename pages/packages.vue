<template>
  <section class="container page-container">
    <!-- component showcase modal START -->
    <nuxt-child v-if="$route.path !== '/packages'" />
    <!-- component showcase modal END -->

    <h1 class="page-heading">Packages</h1>

    <package-card v-for="p in packages" :key="p.id" :data="p" />
  </section>
</template>

<script>
import PackageCard from '~/components/font-end/PackageCard.vue'

export default {
  name: 'Packages',
  components: { PackageCard },
  computed: {
    packages() {
      return this.$db.find('packages')
    },
  },
}
</script>
