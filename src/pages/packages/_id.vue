<template>
  <div>
    <modal 
      v-model="showModal" 
      @toggle="handleClose">
      <h1 slot="header">
        {{ componentName }}
      </h1>
      <component 
        slot="body" 
        :is="component"/>
    </modal>
  </div>
</template>

<script>
import modal from '../../components/modal/modal.vue'
import { ReactInVue } from 'vuera'
import ReactPhotoUploader from 'react-photo-uploader'
import VuexActionsStatesModalBody from '../../components/font-end/VuexActionsStatesModalBody.vue'
import EslintPluginJinuseanModalBody from '../../components/font-end/EslintPluginJinuseanModalBody.vue'
import VueDateInputModalBody from '../../components/font-end/VueDateInputModalBody.vue'

export default {
  name: 'ComponentModal',
  components: { modal },
  data() {
    return {
      showModal: false
    }
  },
  computed: {
    componentName() {
      return this.$route.params.id
    },
    component() {
      return {
        'react-photo-uploader': ReactInVue(ReactPhotoUploader),
        'vue-date-input': VueDateInputModalBody,
        'vuex-actions-states': VuexActionsStatesModalBody,
        'eslint-plugin-jinusean': EslintPluginJinuseanModalBody
      }[this.componentName]
    }
  },
  mounted() {
    this.showModal = true
  },
  methods: {
    handleClose() {
      this.showModal = false
      const MODAL_TRANSITION_DELAY = 300

      // Probably should use transitions...
      setTimeout(() => {
        this.$router.push('/packages')
      }, MODAL_TRANSITION_DELAY)
    }
  }
}
</script>
<style lang="scss">
.modal-body {
  min-width: 32em;
  min-height: 32em;
}
</style>
<style src="../../components/modal/modal.scss" lang="scss"/>
