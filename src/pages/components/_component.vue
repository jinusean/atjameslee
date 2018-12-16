<template>
  <div>
    <modal
      v-show="showModal"
      @close="handleClose">
      <h1 slot="header">
        {{ componentName }}
      </h1>
      <div slot="body">
        <!--<component :is="component"/>-->
        <react-photo-uploader/>
      </div>
    </modal>
  </div>
</template>

<script>
import modal from '../../components/modal/modal.vue'
// import { ReactInVue } from 'vuera'
import ReactPhotoUploader from 'react-photo-uploader'

// const components = {
//   'react-photo-uploader': ReactInVue(ReactPhotoUploader)
// }

export default {
  name: 'ComponentModal',
  components: { modal, ReactPhotoUploader },
  data() {
    return {
      showModal: false
    }
  },
  computed: {
    componentName() {
      return this.$route.params.component
    }
    // component() {
    //   return components[this.componentName] || ReactInVue(ReactPhotoUploader)
    // }
  },
  mounted() {
    this.showModal = true
  },
  methods: {
    handleClose() {
      this.showModal = false
      const MODAL_TRANSITION_DELAY = 300

      setTimeout(() => {
        this.$router.push('/components')
      }, MODAL_TRANSITION_DELAY)
    }
  }
}
</script>
<style src="../../components/modal/modal.scss" lang="scss"/>
