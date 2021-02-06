const chromium = require('chrome-aws-lambda');
const puppeteer = require('puppeteer-core');

exports.handler = async (event, context) => {
    console.log(event);

    try {
        const playlist = event.queryStringParameters.playlist;

        const executablePath = await chromium.executablePath;
        browser = await puppeteer.launch({
            args: chromium.args,
            executablePath: executablePath,
            headless: chromium.headless,
        });

        const page = await browser.newPage();

        await page.goto(`https://kuvo.com/playlist/${playlist}`);
        const title = await page.evaluate(() => document.querySelector('.tracklist-area .row .title').textContent.trim());
        const artist = await page.evaluate(() => document.querySelector('.tracklist-area .row .artist').textContent.trim());
        console.log(`${title}/${artist}`);

        return {
            statusCode: 200,
            body: JSON.stringify({
                title: title,
                artist: artist
            })
        };
    } catch (err) {
        console.log('error', error)
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error
            })
        }
    } finally {
        // close browser
        if (browser !== null) {
            await browser.close()
        }
    }
}