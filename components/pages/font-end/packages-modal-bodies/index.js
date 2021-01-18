import ReactPhotoUploaderModalBody from '@/components/pages/font-end/packages-modal-bodies/ReactPhotoUploaderModalBody'
import VuexActionsStatesModalBody from '@/components/pages/font-end/packages-modal-bodies/VuexActionsStatesModalBody.vue'
import EslintPluginJinuseanModalBody from '@/components/pages/font-end/packages-modal-bodies/EslintPluginJinuseanModalBody.vue'
import VueDateInputModalBody from '@/components/pages/font-end/packages-modal-bodies/VueDateInputModalBody.vue'

export const index = {
  'react-photo-uploader': ReactPhotoUploaderModalBody,
  'vue-date-input': VueDateInputModalBody,
  'vuex-actions-states': VuexActionsStatesModalBody,
  'eslint-plugin-jinusean': EslintPluginJinuseanModalBody,
}

export const getModalBody = (packageId) => {
  return index[packageId]
}
