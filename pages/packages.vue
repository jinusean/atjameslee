<template>
  <div class="container page-container">
    <Modal id="project-id-modal" v-model="isModalOpen" :close-button="true">
      <h1 slot="header">
        {{ activePackageId }}
      </h1>
      <component :is="component" slot="body" />
    </Modal>

    <h1 class="page-heading">Packages</h1>

    <package-card v-for="p in packages" :key="p.id" :data="p" />
  </div>
</template>

<script>
import Modal from '@/components/base/Modal.vue'

import PackageCard from '@/components/pages/font-end/PackageCard.vue'
import { getModalBody } from '@/components/pages/font-end/packages-modal-bodies'

export default {
  name: 'Packages',
  components: { Modal, PackageCard },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (vm.activePackageId && !vm.verifyPackageId(vm.activePackageId)) {
        return next({ path: '/packages', replace: true })
      }
      next()
    })
  },

  beforeRouteUpdate(to, from, next) {
    if (
      to.path === '/packages' &&
      this.activePackageId &&
      !this.verifyPackageId(this.activePackageId)
    ) {
      return next({ path: '/packages', replace: true })
    }
    next()
  },
  computed: {
    isModalOpen: {
      get() {
        return !!this.activePackageId
      },
      set(isModalOpen) {
        if (!isModalOpen) {
          this.$router.replace('/packages')
        }
      },
    },
    packages() {
      return this.$db.find('packages')
    },
    activePackageId() {
      return this.$route.hash.replace('#', '')
    },
    component() {
      return getModalBody(this.activePackageId)
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
