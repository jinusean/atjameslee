<template>
  <modal 
    v-show="showModal"
    @close="handleClose">
    <h1 slot="header">
      {{ componentName }}
    </h1>
    <div slot="body">
      <component :is="componentEl"/>
    </div>
  </modal>
</template>

<script>
import modal from './modal/modal.vue'
import { ReactInVue } from 'vuera'
import ReactPhotoUploader from 'react-photo-uploader'

const components = {
  'react-photo-uploader': ReactInVue(ReactPhotoUploader)
}

export default {
  name: 'ComponentModal',
  components: { modal, ReactPhotoUploader },
  props: {
    component: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      componentEl: null,
      componentName: '',
      showModal: false
    }
  },
  created() {
    this.componentName = this.component
    this.componentEl = components[this.component]
    this.showModal = true
  },
  methods: {
    handleClose() {
      this.showModal = false
    }
  }
}
</script>
