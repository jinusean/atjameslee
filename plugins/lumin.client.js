import Vue from 'vue'

export const defaults = {
  darkClass: process.env.DARK_CLASS || 'dark',
}

class Lumin {
  _watcher = null
  _darkClass = defaults.darkClass
  _isDark = false
  _isToggled = false

  constructor(darkClass) {
    this.darkClass = darkClass
    this.start()
  }

  getMode() {
    return this.isDark ? 'dark' : 'light'
  }

  get darkClass() {
    return this._darkClass
  }

  set darkClass(darkClass) {
    this._darkClass = darkClass || defaults.darkClass
  }

  get isDark() {
    return this._isDark
  }

  set isDark(isDark) {
    const method = isDark ? 'add' : 'remove'
    document.documentElement.classList[method](this.darkClass)
    this._isDark = isDark
  }

  toggle() {
    this.isDark = !this.isDark
    this._isToggled = true
  }

  stop() {
    if (this._watcher) {
      this._watcher()
      this._watcher = null
    }
  }

  start() {
    this.stop()
    this._watcher = window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        this.isDark = e.matches
      })
    this.reset()
  }

  getSystemMode() {
    return window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  reset() {
    this.isDark = this.getSystemMode() === 'dark'
    this._isToggled = false
  }
}

export default ({ app }, inject) => {
  inject('lumin', Vue.observable(new Lumin()))
}
