<template>
  <div class="container page-container">
    <package-modal
      :package-id="selectedPackageId"
      @close="$router.replace('/packages')"
    />

    <h1 class="page-heading">Packages</h1>

    <package-card v-for="p in packages" :key="p.id" :data="p" />
  </div>
</template>

<script>
import PackageCard from '@/components/pages/font-end/PackageCard.vue'
import PackageModal from '@/components/pages/font-end/PackageModal'

export default {
  name: 'Packages',
  components: { PackageModal, PackageCard },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.selectedPackageId && !vm.verifyPackageId(vm.selectedPackageId)) {
        return next({ path: '/packages', replace: true })
      }
      next()
    })
  },

  beforeRouteUpdate(to, from, next) {
    if (
      to.path === '/packages' &&
      this.packageId &&
      !this.verifyPackageId(this.packageId)
    ) {
      return next({ path: '/packages', replace: true })
    }
    next()
  },
  computed: {
    packages() {
      return this.$db.find('packages')
    },
    selectedPackageId() {
      return this.$route.hash.replace('#', '')
    },
  },
  methods: {
    verifyPackageId(packageId) {
      packageId = packageId.toLowerCase()
      return !!this.packages.find((pck) => pck.id.toLowerCase() === packageId)
    },
  },
}
</script>
