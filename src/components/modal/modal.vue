<template>
  <transition name="modal">
    <div 
      class="modal-mask" 
      @click="handleMaskClick">
      <div 
        ref="modalWrapper" 
        class="modal-wrapper">

        <div
          v-if="$slots.header"
          class="modal-header">
          <slot name="header"/>
        </div>

        <div
          v-if="$slots.body"
          class="modal-body">
          <slot name="body"/>
        </div>

        <div
          v-if="$slots.footer"
          class="modal-footer">
          <slot name="footer">
            <button
              class="modal-default-button"
              @click="$emit('close')">
              OK
            </button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'Modal',
  methods: {
    handleMaskClick(event) {
      if (this.$refs.modalWrapper.contains(event.target)) {
        return
      }
      this.$emit('close')
    }
  }
}
</script>
<style src="./modal.scss" lang="scss"/>
