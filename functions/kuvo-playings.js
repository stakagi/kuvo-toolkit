const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

exports.handler = async (event, context) => {
    console.log(event);

    const browser = await puppeteer.launch({
        executablePath: await chromium.executablePath,
        headless: true
    });
    const page = await browser.newPage();

    await page.goto('https://kuvo.com/playlist/218650');
    const title = await page.evaluate(() => document.querySelector('.tracklist-area .row .title').textContent.trim());
    const artist = await page.evaluate(() => document.querySelector('.tracklist-area .row .artist').textContent.trim());
    console.log(`${title} ${artist}`);

    return {
        statusCode: 200,
        body: "Hello, World"
    }
}