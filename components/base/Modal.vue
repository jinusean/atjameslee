<template>
  <transition
    :duration="duration"
    @after-leave="afterLeave"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <div
      v-if="isOpen"
      id="modal"
      class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full p-0 sm:p-6"
      style="background-color: rgba(0, 0, 0, 0.5)"
      @keydown.esc="close"
      @click="handleMaskClick"
    >
      <div
        id="modal-wrapper"
        ref="modalWrapper"
        class="flex flex-col m-auto bg-white shadow-2xl w-full sm:w-auto h-full sm:h-auto overflow-scroll rounded min-w-0 sm:min-w-128 overscroll-auto max-h-full dark:bg-black dark:border dark:border-white"
      >
        <div
          v-if="$slots.header"
          class="modal-header p-4 border-b border-gray-200"
        >
          <slot name="header" />
        </div>
        <div v-if="$slots.body" class="w-full flex-1 p-4">
          <slot name="body" />
        </div>

        <div v-if="$slots.footer" class="modal-footer">
          <slot name="footer"></slot>
        </div>

        <button
          v-if="closeButton"
          class="w-full bg-gray-800 text-white py-4 font-bold hover:opacity-75"
          @click="close"
        >
          Close
        </button>
      </div>
    </div>
  </transition>
</template>
<script>
import Velocity from 'velocity-animate'

export default {
  name: 'Modal',
  model: {
    prop: 'active',
    event: 'change',
  },
  props: {
    active: {
      type: Boolean,
      default: true,
    },
    bodyClass: {
      type: String,
      default: 'modal-open',
    },
    esc: {
      type: Boolean,
      default: true,
    },
    closeButton: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 300,
    },
  },
  data() {
    return {
      escListener: undefined,
      isOpen: false,
      isClosing: false,
    }
  },
  watch: {
    active: {
      immediate: true,
      handler(active) {
        this.isOpen = active
        const method = active ? 'add' : 'remove'
        document.body.classList[method](this.bodyClass)

        if (active && this.esc) {
          this.escListener = document.addEventListener('keydown', (event) => {
            if (event.key !== 'Escape') {
              return
            }
            this.close()
          })
        }

        if (active && this.esc) {
          document.removeEventListener('keydown', this.escListener)
        }
      },
    },
  },
  beforeDestroy() {
    document.body.classList.remove(this.bodyClass)
  },
  methods: {
    handleMaskClick(event) {
      if (
        !this.$refs.modalWrapper ||
        this.$refs.modalWrapper.contains(event.target)
      ) {
        return
      }
      this.close()
    },
    close() {
      // change event will be called in 'afterLeave' event
      this.isOpen = false
    },
    beforeEnter(el, done) {
      Velocity(
        this.$refs.modalWrapper,
        { translateY: '-5%', opacity: 0 },
        { duration: 0, complete: done }
      )
    },
    enter(el, done) {
      Velocity(
        this.$refs.modalWrapper,
        { translateY: '0%', opacity: 1 },
        { duration: this.duration, complete: done, easing: 'easeInSine' }
      )
    },
    leave(el, done) {
      Velocity(
        this.$refs.modalWrapper,
        { translateY: '-5%', opacity: 0 },
        { duration: this.duration, complete: done, easing: 'ease-out' }
      )
    },
    afterLeave(el, done) {
      this.$emit('change', false)
    },
  },
}
</script>
<style>
.modal-open {
  overflow: hidden;
}
</style>
