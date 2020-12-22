/**
 * Converts <img src="srcString"/> srcString to <img src="$utils.getAsset(srcString)" />
 */
export default {
  methods: {
    parseDocument(document) {
      if (!document) {
        return document
      }
      if (document.body) {
        this.parseDocument(document.body)
      }
      if (document.tag === 'img') {
        document.props.src = this.$utils.getAsset(document.props.src)
      }
      if (document.children) {
        for (const child of document.children) {
          this.parseDocument(child)
        }
      }
      return document
    },
  },
  computed: {
    parsedDocument() {
      const copy = JSON.parse(JSON.stringify(this.document))
      return this.parseDocument(copy)
    },
  },
}
