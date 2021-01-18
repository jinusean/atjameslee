<template>
  <div class="container page-container">
    <Modal id="project-id-modal" v-model="isModalOpen" :close-button="true">
      <h1 slot="header">
        {{ selectedPackageId }}
      </h1>
      <component :is="component" slot="body" />
    </Modal>

    <h1 class="page-heading">Packages</h1>

    <package-card v-for="p in packages" :key="p.id" :data="p" />
  </div>
</template>

<script>
import Modal from '@/components/base/Modal.vue'
import ReactPhotoUploaderModalBody from '@/components/pages/font-end/ReactPhotoUploaderModalBody'
import VuexActionsStatesModalBody from '@/components/pages/font-end/VuexActionsStatesModalBody.vue'
import EslintPluginJinuseanModalBody from '@/components/pages/font-end/EslintPluginJinuseanModalBody.vue'
import VueDateInputModalBody from '@/components/pages/font-end/VueDateInputModalBody.vue'

import PackageCard from '@/components/pages/font-end/PackageCard.vue'
import PackageModal from '@/components/pages/font-end/PackageModal'

export default {
  name: 'Packages',
  components: { Modal, PackageCard },
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
    isModalOpen: {
      get() {
        return !!this.selectedPackageId
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
    selectedPackageId() {
      return this.$route.hash.replace('#', '')
    },
    component() {
      return {
        'react-photo-uploader': ReactPhotoUploaderModalBody,
        'vue-date-input': VueDateInputModalBody,
        'vuex-actions-states': VuexActionsStatesModalBody,
        'eslint-plugin-jinusean': EslintPluginJinuseanModalBody,
      }[this.selectedPackageId]
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
