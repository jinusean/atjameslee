<template>
  <div>
    <modal
      v-show="showModal"
      @close="handleClose">
      <h1 slot="header">
        {{ componentName }}
      </h1>
      <div 
        slot="body" 
        class="modal-body">
        <component 
          :is="component.component" 
          v-bind="component.attrs"/>

      </div>
    </modal>
  </div>
</template>

<script>
import modal from '../../components/modal/modal.vue'
import { ReactInVue } from 'vuera'
import ReactPhotoUploader from 'react-photo-uploader'
import VueDateInput from 'vue-date-input'
import 'vue-date-input/dist/styles.css'
import VuexActionsStatesModalBody from '../../components/font-end/VuexActionsStatesModalBody.vue'

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
        'react-photo-uploader': {
          component: ReactInVue(ReactPhotoUploader)
        },
        'vue-date-input': {
          component: VueDateInput,
          attrs: {
            value: [new Date(), new Date()]
          }
        },
        'vuex-actions-states': {
          component: VuexActionsStatesModalBody
        }
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
        this.$router.push('/front-end')
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
