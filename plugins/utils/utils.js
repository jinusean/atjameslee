function applyInline(element, recursive = true) {
  if (!element) {
    throw new Error('No element specified.')
  }

  const matches = matchRules(element)

  // we need to preserve any pre-existing inline styles.
  const srcRules = document.createElement(element.tagName).style
  srcRules.cssText = element.style.cssText

  matches.forEach((rule) => {
    for (const prop of rule.style) {
      const val =
        srcRules.getPropertyValue(prop) || rule.style.getPropertyValue(prop)
      const priority = rule.style.getPropertyPriority(prop)

      element.style.setProperty(prop, val, priority)
    }
  })

  if (recursive) {
    element.children.forEach((child) => {
      applyInline(child, recursive)
    })
  }
}

function matchRules(el, sheets) {
  sheets = sheets || document.styleSheets
  const ret = []

  for (const i in sheets) {
    if (Object.prototype.hasOwnProperty.call(sheets, i)) {
      const rules = sheets[i].rules || sheets[i].cssRules
      for (const r in rules) {
        if (el.matches(rules[r].selectorText)) {
          ret.push(rules[r])
        }
      }
    }
  }
  return ret
}

export default {
  getAsset(path) {
    const assets = require.context('@/assets')
    if (path[0] === '/') {
      path = path.slice(1)
    }
    return assets('./' + path)
  },

  applyStylesInline(el, recursive = true) {
    const cloned = el.cloneNode(true)
    applyInline(cloned, recursive)
    return cloned
  },
}
