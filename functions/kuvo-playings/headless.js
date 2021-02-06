
exports.getBrowser = async () => {
    try {
        const puppeteer = require('puppeteer');
        return await puppeteer.launch({ headless: true });
    } catch (err) {
        const chromium = require('chrome-aws-lambda');
        const puppeteer = require('puppeteer-core');

        const executablePath = await chromium.executablePath;
        console.log(executablePath);

        return await puppeteer.launch({
            args: chromium.args,
            executablePath: executablePath,
            headless: chromium.headless,
        });
    }
}