<template>
  <transition name="modal">
    <div
      v-if="isOpen"
      class="modal-mask"
      @keydown.esc="$emit('toggle', false)"
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
              @click="$emit('toggle', false)">
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
  model: {
    prop: 'isOpen',
    event: 'toggle'
  },
  props: {
    isOpen: {
      type: Boolean,
      default: true
    },
    bodyClass: {
      type: String,
      default: 'body-modal-open'
    }
  },
  watch: {
    isOpen: {
      immediate: true,
      handler(isOpen) {
        const method = isOpen ? 'add' : 'remove'
        document.body.classList[method](this.bodyClass)
      }
    }
  },
  beforeDestroy() {
    document.body.classList.remove(this.bodyClass)
  },
  methods: {
    handleMaskClick(event) {
      if (this.$refs.modalWrapper.contains(event.target)) {
        return
      }
      this.$emit('toggle', false)
    }
  }
}
</script>
<style src="./modal.scss" lang="scss"/>
