import isMobile from 'ismobilejs'

function isWebview() {
  const userAgent = window.navigator.userAgent.toLowerCase()
  const safari = /safari/.test(userAgent)
  const ios = /iphone|ipod|ipad/.test(userAgent)
  return ios && !safari
}

export default ({ app }, inject) => {
  const mobile = isMobile()
  mobile.apple.webview = isWebview()

  inject('isMobile', mobile)
}
