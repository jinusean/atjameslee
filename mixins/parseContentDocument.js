/**
 * Converts <img src="srcString"/> srcString to <img src="$utils.getAsset(srcString)" />
 */
export default {
  beforeMount() {
    if (this.document) {
      this.parseDocument(this.document.body)
    }
  },
  methods: {
    parseDocument(document) {
      if (document.tag === 'img') {
        document.props.src = this.$utils.getAsset(document.props.src)
      }
      if (document.children) {
        for (const child of document.children) {
          this.parseDocument(child)
        }
      }
    },
  },
}
