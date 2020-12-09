const puppeteer = require('puppeteer')

const url = 'http://localhost:8080/resume'
async function main() {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()

  console.log('Goto')
  await page.goto(url, {
    waitUntil: 'networkidle2',
  })
  // await new Promise((res) => setTimeout(res, 2000))
  await page.evaluate(() => {
    const nuxt = document.getElementById('__nuxt')
    const resume = document.getElementById('resume')
    nuxt.innerHTML = ''
    nuxt.appendChild(resume)
  })
  await page.pdf({
    landscape: false,
    format: 'letter',
    path: 'james_lee_resume.pdf',
  })
  console.log('close')
  browser.close()
}

main()
