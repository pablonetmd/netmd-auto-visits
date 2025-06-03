const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const proxies = [
  { ip: '189.126.106.107', port: '8080' },
  { ip: '190.97.255.34', port: '999' },
  { ip: '190.104.1.23', port: '8080' },
  { ip: '168.90.87.14', port: '999' },
  { ip: '186.4.228.166', port: '3128' }
];

const countries = ['Peru', 'Chile', 'Ecuador'];

async function visitWithProxy(proxy, country) {
  const browser = await puppeteer.launch({
    args: [`--proxy-server=http://${proxy.ip}:${proxy.port}`],
    headless: true
  });

  try {
    const page = await browser.newPage();
    await page.goto('https://netmd.org', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(1000);
    await autoScroll(page);
    console.log(`✅ Visited as ${country} via ${proxy.ip}:${proxy.port}`);
  } catch (err) {
    console.error(`❌ Failed for ${proxy.ip}:${proxy.port} (${country}):`, err.message);
  } finally {
    await browser.close();
  }
}

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}

(async () => {
  for (const country of countries) {
    for (let i = 0; i < 20; i++) {
      const proxy = proxies[Math.floor(Math.random() * proxies.length)];
      await visitWithProxy(proxy, country);
    }
  }
})();