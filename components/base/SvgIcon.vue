<template>
  <div class="inline-flex" v-html="vHtml"></div>
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
      default: true,
    },
    em: {
      type: Number,
      default: 1, // this number makes the icon fit in line with the text
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
          svgElement.setAttribute('height', `${this.em}em`)
          svgElement.setAttribute('width', `${widthToHeight}em`)
        } else {
          svgElement.setAttribute('width', `${this.em}em`)
          svgElement.setAttribute('height', `${1 / widthToHeight}em`)
        }
        svgElement.classList.add('svgs-class')
      }
    },
  },
}
</script>
