import { chromium } from 'playwright';

const pages = [
  { url: 'https://demosite-blush.vercel.app', name: 'home-full.png' },
  { url: 'https://demosite-blush.vercel.app/explore', name: 'explore-full.png' },
  { url: 'https://demosite-blush.vercel.app/map', name: 'map-full.png' },
  { url: 'https://demosite-blush.vercel.app/calendar', name: 'calendar-full.png' },
  { url: 'https://demosite-blush.vercel.app/magazine', name: 'magazine-full.png' },
  { url: 'https://demosite-blush.vercel.app/settings', name: 'settings-full.png' },
  { url: 'https://demosite-blush.vercel.app/festival/cherry-blossom-japan', name: 'festival-detail-full.png' },
];

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,  // Retina 2x resolution
});

for (const p of pages) {
  const page = await context.newPage();
  await page.goto(p.url, { waitUntil: 'networkidle' });

  // Scroll down slowly to trigger all whileInView animations
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < totalHeight; y += 400) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await page.waitForTimeout(200);
  }
  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  // Fix: Playwright full-page screenshots render position:fixed as document-flow.
  // Change fixed header to absolute so it stays at page top.
  await page.addStyleTag({
    content: `
      header[class*="fixed"] { position: absolute !important; }
      .sticky { position: absolute !important; }
    `
  });
  await page.waitForTimeout(200);

  await page.screenshot({
    path: `/Users/user/Desktop/my-project/screenshots/v5-restructure/${p.name}`,
    fullPage: true,
  });
  console.log(`Captured ${p.name}`);
  await page.close();
}

await browser.close();
