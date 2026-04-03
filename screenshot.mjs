import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const screenshotsDir = path.join(__dirname, 'temporary screenshots')

if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true })

const url   = process.argv[2] || 'http://localhost:3000'
const label = process.argv[3] || ''

// Find next available index
const existing = fs.readdirSync(screenshotsDir).filter(f => f.startsWith('screenshot-') && f.endsWith('.png'))
const indices  = existing.map(f => parseInt(f.replace('screenshot-', '').replace(/(-.*)?\.png$/, ''))).filter(n => !isNaN(n))
const next     = indices.length ? Math.max(...indices) + 1 : 1
const filename = label ? `screenshot-${next}-${label}.png` : `screenshot-${next}.png`
const outPath  = path.join(screenshotsDir, filename)

const browser = await puppeteer.launch({
  executablePath: 'C:/Users/J0mn1/.cache/puppeteer/chrome/win64-146.0.7680.153/chrome-win64/chrome.exe',
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
})

const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 })
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })
await page.evaluate(() => new Promise(r => setTimeout(r, 1200)))
await page.screenshot({ path: outPath, fullPage: true })
await browser.close()

console.log(`Screenshot saved: ${outPath}`)
