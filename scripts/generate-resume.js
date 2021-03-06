/* eslint-disable no-console */
require('dotenv').config({})
const childProcess = require('child_process')
const path = require('path')
const puppeteer = require('puppeteer')
async function main() {
  const resumeFilepath = path.join(
    __dirname,
    '../static/',
    process.env.RESUME_FILENAME || 'James_Lee_Resume.pdf'
  )
  const url = `http://${process.env.HOST || 'localhost'}:${
    process.env.PORT || '8080'
  }/resume`
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  console.log('Going to page:', url)
  await page.goto(url, {
    waitUntil: 'networkidle2',
  })
  console.log('Evaluate')
  await page.evaluate(() => {
    const nuxt = document.getElementById('__nuxt')
    const resume = document.getElementById('resume')
    nuxt.innerHTML = ''
    nuxt.appendChild(resume)
  })
  console.log('Save pdf to', resumeFilepath)
  await page.pdf({
    path: resumeFilepath,
  })
  browser.close()
  return openFile(resumeFilepath)
}

function openFile(file) {
  return new Promise((resolve) => {
    const child = childProcess.spawn('open', [file])

    child.on('exit', function (e, code) {
      resolve()
    })
  })
}

try {
  main()
} catch (error) {
  console.error(error)
}
