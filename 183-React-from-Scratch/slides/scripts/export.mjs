import fs from "fs";
import * as puppeteer from "puppeteer";


async function capturePage(slide, click) {
    // Capture a screenshot using Puppeteer.
    const browser = await puppeteer.launch({
        executablePath: process.env["PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH"],
        headless: "new",
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(`http://localhost:8000?slide=${slide}&click=${click}`, { waitUntil: "networkidle2", timeout: 10000 });
    let divExists = false;
    while (!divExists) {
        const queryParams = await page.evaluate(() => {
            const params = new URLSearchParams(window.location.search);
            return Object.fromEntries(params.entries());
        });
        slide = queryParams.slide ? queryParams.slide : 0;
        click = queryParams.click ? queryParams.click : 0;
        await page.screenshot({ path: `export/${slide}_${click}.png` });
        await page.keyboard.press("ArrowRight");
        divExists = await page.$('div.some-class') !== null;
        await new Promise(resolve => setTimeout(resolve, 250));
    }
    await browser.close();
}

(async () => {
    fs.mkdirSync("export", { recursive: true });
    console.log("Exporting slides...");
    await Promise.all([
        { slide: 0, maxClick: 0 },
        // { slide: 1, maxClick: 2 },
    ].map(async ({slide, maxClick}) => {
        for (let click = 0; click <= maxClick; click++) {
            capturePage(slide, click);
        }
    }));
})();
