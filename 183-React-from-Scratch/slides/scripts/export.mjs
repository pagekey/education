import fs from "fs";
import * as puppeteer from "puppeteer";


(async () => {
    fs.mkdirSync("export", { recursive: true });
    console.log("Exporting slides...");
    // Capture a screenshot using Puppeteer.
    const browser = await puppeteer.launch({
        executablePath: process.env["PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH"],
        headless: "new",
    });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(`http://localhost:8000`, { waitUntil: "networkidle2", timeout: 10000 });
    let divExists = false;
    let slide, click;
    while (!divExists) {
        const queryParams = await page.evaluate(() => {
            const params = new URLSearchParams(window.location.search);
            return Object.fromEntries(params.entries());
        });
        slide = queryParams.slide ? queryParams.slide : 0;
        click = queryParams.click ? queryParams.click : 0;
        await page.screenshot({ path: `export/${slide}_${click}.png` });
        await page.keyboard.press("ArrowRight");
        divExists = await page.$('div#slide_error') !== null;
        await new Promise(resolve => setTimeout(resolve, 250));
    }
    await browser.close();
})();
