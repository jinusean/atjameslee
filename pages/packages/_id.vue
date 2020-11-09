<template>
  <div>
    <modal id="project-id-modal" v-model="showModal" :close-button="true">
      <h1 slot="header">
        {{ componentName }}
      </h1>
      <component :is="component" slot="body" />
    </modal>
  </div>
</template>

<script>
import modal from '@/components/modal.vue'
import ReactPhotoUploaderBody from '~/components/font-end/ReactPhotoUploaderBody'
import VuexActionsStatesModalBody from '~/components/font-end/VuexActionsStatesModalBody.vue'
import EslintPluginJinuseanModalBody from '~/components/font-end/EslintPluginJinuseanModalBody.vue'
import VueDateInputModalBody from '~/components/font-end/VueDateInputModalBody.vue'

export default {
  name: 'ProjectId',
  components: { modal },
  data() {
    return {
      showModal: false,
    }
  },
  computed: {
    componentName() {
      return this.$route.params.id
    },
    component() {
      return {
        'react-photo-uploader': ReactPhotoUploaderBody,
        'vue-date-input': VueDateInputModalBody,
        'vuex-actions-states': VuexActionsStatesModalBody,
        'eslint-plugin-jinusean': EslintPluginJinuseanModalBody,
      }[this.componentName]
    },
  },
  watch: {
    showModal: {
      handler(showModal) {
        if (!showModal) {
          this.$router.push('/packages')
        }
      },
    },
  },
  mounted() {
    this.showModal = true
  },
}
</script>
