const colors = function() {
  const LAST_HEX = 16777215
  document.addEventListener('scroll', () => {
    const { scrollTop } =
    document.scrollingElement || document.documentElement
    const viewportHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0
    )

    const scrollPercent = Math.min(scrollTop / viewportHeight, 1)
    const newValue = Math.ceil(scrollPercent * LAST_HEX)

    let hexString = newValue.toString(16)
    if (hexString.length % 2) {
      hexString = '0' + hexString
    }

    console.log(newValue, hexString)
    this.$refs.title.style.background = '#' + hexString
  })
}
