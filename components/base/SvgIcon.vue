<template>
  <div class="inline-flex" :class="{ invert }" v-html="vHtml"></div>
</template>
<script>
export default {
  name: 'SvgIcon',
  props: {
    icon: {
      type: String,
      default: null,
    },
    hasFill: {
      type: Boolean,
      default: false,
    },
    growByHeight: {
      type: Boolean,
      default: false,
    },
    invert: {
      type: Boolean,
      default: false,
    },
    size: {
      type: [String, Number],
      default: 1,
      validate(size) {
        return Number.isInteger(parseInt(size))
      },
    },
  },
  computed: {
    vHtml() {
      try {
        return require(`@/assets/svgs/${this.icon}.svg?raw`)
      } catch (e) {
        console.error(e)
        return undefined
      }
    },
    numSize() {
      return parseInt(this.size)
    },
  },
  watch: {
    vHtml: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          this.onIconChange()
        })
      },
    },
    $props() {
      this.onIconChange()
    },
  },
  methods: {
    recursivelyRemoveFill(el) {
      if (!el) {
        return
      }
      el.removeAttribute('fill')
      ;[].forEach.call(el.children, (child) => {
        this.recursivelyRemoveFill(child)
      })
    },
    onIconChange() {
      if (this.$el.firstElementChild.nodeName === 'svg') {
        const svgElement = this.$el.firstElementChild
        // use `viewBox` attribute to get the svgs's inherent width and height
        const viewBox = svgElement
          .getAttribute('viewBox')
          .split(' ')
          .map((n) => Number(n))
        const widthToHeight = (viewBox[2] / viewBox[3]).toFixed(2)
        if (this.hasFill) {
          // recursively remove all fill attribute of element and its nested children
          this.recursivelyRemoveFill(svgElement)
        }
        // set width and height relative to font size
        // if growByHeight is true, height set to 1em else width set to 1em and remaining is calculated based on widthToHeight ratio
        if (this.growByHeight) {
          svgElement.setAttribute('height', `${this.numSize}em`)
          svgElement.setAttribute('width', `${widthToHeight}em`)
        } else {
          svgElement.setAttribute('width', `${this.numSize}em`)
          svgElement.setAttribute('height', `${this.numSize / widthToHeight}em`)
        }
        svgElement.classList.add('svgs-class')
      }
    },
  },
}
</script>
