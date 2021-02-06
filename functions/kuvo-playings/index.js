const headless = require('./headless');

exports.handler = async (event, context) => {
    console.log(event);

    let browser;
    try {
        const playlist = event.queryStringParameters['playlist'];

        browser = await headless.getBrowser();
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
        console.log('error', err)
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: err
            })
        };
    } finally {
        // close browser
        if (browser) {
            await browser.close()
        }
    }
}