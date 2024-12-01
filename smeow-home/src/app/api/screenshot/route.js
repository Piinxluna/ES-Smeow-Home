import puppeteer from 'puppeteer'

export async function GET(request) {
  try {
    // Launch Puppeteer
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    // Navigate to the URL
    await page.goto('http://35.198.245.230')

    // Capture a screenshot
    const screenshot = await page.screenshot({ encoding: 'base64' })

    // Close Puppeteer
    await browser.close()

    // Return the screenshot as a response
    return new Response(Buffer.from(screenshot, 'base64'), {
      headers: {
        'Content-Type': 'image/png',
      },
    })
  } catch (error) {
    console.error('Error capturing screenshot:', error)
    return new Response('Error capturing screenshot', { status: 500 })
  }
}
