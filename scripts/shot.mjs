import { chromium } from "playwright-core";

const OUT = process.argv[2];
const BASE = "http://localhost:3000";

const shots = [
  { name: "home-desktop", url: "/", w: 1280, h: 900, full: true },
  { name: "home-mobile", url: "/", w: 390, h: 844, full: true },
  { name: "projects-desktop", url: "/projects", w: 1280, h: 900, full: true },
  { name: "detail-desktop", url: "/projects/cittadella", w: 1280, h: 900, full: true },
];

const browser = await chromium.launch({ channel: "msedge" });
for (const s of shots) {
  const page = await browser.newPage({ viewport: { width: s.w, height: s.h } });
  await page.goto(BASE + s.url, { waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  await page.screenshot({ path: `${OUT}/${s.name}.png`, fullPage: s.full });
  console.log("shot", s.name);
  await page.close();
}
await browser.close();
