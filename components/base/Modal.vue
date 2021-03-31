<template>
  <transition
    :duration="duration"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
    @after-leave="afterLeave"
  >
    <div
      v-if="isOpen"
      ref="modal"
      class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full p-0 sm:p-6"
      style="background-color: rgba(0, 0, 0, 0.5)"
      @keydown.esc="close"
    >
      <div
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

        <div v-if="$slots.footer">
          <slot name="footer"></slot>
        </div>

        <button
          v-if="closeButton"
          ref="closeButton"
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
import keycode from 'keycode'

export default {
  name: 'Modal',
  model: {
    prop: 'active',
    event: 'change',
  },
  props: {
    active: {
      type: Boolean,
      required: true,
    },
    bodyClass: {
      type: String,
      default: 'modal-open',
    },
    closeButton: {
      type: Boolean,
      default: false,
    },
    duration: {
      type: Number,
      default: 300,
    },
    closeEsc: {
      type: Boolean,
      default: true,
    },
    closeClick: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
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

        if (active && this.closeEsc) {
          document.body.addEventListener('keydown', this.onKeyDown)
        }
        if (active && this.closeClick) {
          document.body.addEventListener('click', this.onClick)
        }
      },
    },
  },
  beforeDestroy() {
    this.cleanup()
  },
  methods: {
    onKeyDown(event) {
      if (event.key === 'Escape' || keycode(event) === 'esc') {
        this.close()
      }
    },
    onClick(event) {
      if (
        this.$refs.modalWrapper &&
        !this.$refs.modalWrapper.contains(event.target)
      ) {
        this.close()
      }
    },
    cleanup() {
      document.body.classList.remove(this.bodyClass)
      document.body.removeEventListener('keydown', this.onKeyDown)
      document.body.removeEventListener('click', this.onClick)
    },
    close() {
      // change event will be called in 'afterLeave' event
      this.cleanup()
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
