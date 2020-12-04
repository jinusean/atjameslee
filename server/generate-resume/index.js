const fs = require('fs')
const pdf = require('html-pdf')
const html = fs.readFileSync('./resume.html', 'utf8')
const options = { format: 'Letter', renderDelay: 'manual' }

console.log('starting')

pdf.create(html, options).toFile('./resume.pdf', function (err, res) {
  if (err) return console.log(err)
  console.log(res) // { filename: '/app/businesscard.pdf' }
})
