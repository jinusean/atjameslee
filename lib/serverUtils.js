const path = require('path')
const fs = require('fs')
const yaml = require('js-yaml')

module.exports.loadYaml = (filepath) => {
  filepath = path.resolve(__dirname, filepath)
  return yaml.load(fs.readFileSync(filepath, 'utf8'))
}
