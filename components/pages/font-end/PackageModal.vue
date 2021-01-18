<template>
  <div>
    <Modal id="project-id-modal" v-bind="$listeners">
      <h1 slot="header">
        {{ packageId }}
      </h1>
      <component :is="component" slot="body" />
    </Modal>
  </div>
</template>

<script>
import Modal from '@/components/base/Modal.vue'
import ReactPhotoUploaderModalBody from '@/components/pages/font-end/ReactPhotoUploaderModalBody'
import VuexActionsStatesModalBody from '@/components/pages/font-end/VuexActionsStatesModalBody.vue'
import EslintPluginJinuseanModalBody from '@/components/pages/font-end/EslintPluginJinuseanModalBody.vue'
import VueDateInputModalBody from '@/components/pages/font-end/VueDateInputModalBody.vue'

export default {
  name: 'PackageModal',
  components: { Modal },
  props: {
    packageId: {
      type: String,
      required: true,
    },
  },
  computed: {
    component() {
      return {
        'react-photo-uploader': ReactPhotoUploaderModalBody,
        'vue-date-input': VueDateInputModalBody,
        'vuex-actions-states': VuexActionsStatesModalBody,
        'eslint-plugin-jinusean': EslintPluginJinuseanModalBody,
      }[this.packageId]
    },
  },
}
</script>
