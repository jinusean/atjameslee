<template>
  <div>
    <modal
      id="project-id-modal"
      :is-open="!!packageId"
      :close-button="true"
      @toggle="onToggle"
    >
      <h1 slot="header">
        {{ packageId }}
      </h1>
      <component :is="component" slot="body" />
    </modal>
  </div>
</template>

<script>
import modal from '@/components/base/modal.vue'
import ReactPhotoUploaderModalBody from '@/components/pages/font-end/ReactPhotoUploaderModalBody'
import VuexActionsStatesModalBody from '@/components/pages/font-end/VuexActionsStatesModalBody.vue'
import EslintPluginJinuseanModalBody from '@/components/pages/font-end/EslintPluginJinuseanModalBody.vue'
import VueDateInputModalBody from '@/components/pages/font-end/VueDateInputModalBody.vue'

export default {
  name: 'PackageModal',
  components: { modal },
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
  methods: {
    onToggle(isOpen) {
      if (!isOpen) {
        return this.$emit('close')
      }
      this.$emit('open')
    },
  },
}
</script>
