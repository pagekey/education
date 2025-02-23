import fs from "fs";
import * as puppeteer from "puppeteer";


(async () => {    
    // Use puppeteer to capture screenshots.
    fs.mkdirSync("export", { recursive: true });
    // let slide = 0;
    await Promise.all([0,1,2].map(async slide => {
        const browser = await puppeteer.launch({
            executablePath: process.env["PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH"],
            headless: "new",
        });
        console.log(`Exporting slide ${slide}`)
        const page = await browser.newPage();
        await page.setViewport({ width: 1920, height: 1080 });
        await page.goto(`http://localhost:8000?slide=${slide}`, { waitUntil: "networkidle2", timeout: 10000 });
        await page.screenshot({ path: `export/${slide}.png` });
        await browser.close();
        console.log(`Done slide ${slide}`)
    }));
})();
