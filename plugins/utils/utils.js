export default {
  getAsset(path) {
    const assets = require.context('@/assets')
    if (path[0] === '/') {
      path = path.slice(1)
    }
    return assets('./' + path)
  },
}
