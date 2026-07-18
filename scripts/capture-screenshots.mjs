import { existsSync, mkdirSync } from "node:fs";
import { spawn } from "node:child_process";
import { chromium } from "@playwright/test";

const port = 4183;
const baseURL = `http://127.0.0.1:${port}`;
const outDir = "docs/screenshots";

if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

function startServer() {
  const child = spawn(process.execPath, ["./node_modules/vite/bin/vite.js", "--host", "127.0.0.1", "--port", String(port)], {
    stdio: "ignore",
    shell: false,
    windowsHide: true,
  });
  return child;
}

async function waitForServer(timeout = 45000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      const response = await fetch(baseURL);
      if (response.ok) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }
  throw new Error(`Timed out waiting for ${baseURL}`);
}

async function shot(page, name, options = {}) {
  await page.screenshot({ path: `${outDir}/${name}.png`, type: "png", ...options });
}

const server = startServer();

try {
  await waitForServer();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });

  await page.goto(baseURL);
  await page.waitForLoadState("networkidle");
  await shot(page, "home-1440");
  await shot(page, "home-top-1440");
  await shot(page, "home-helix-1440");
  await shot(page, "home-signature-helix-1440");

  const storyHeight = await page.locator(".home-story").evaluate((node) => node.offsetHeight - window.innerHeight);
  for (const [name, progress] of [
    ["home-ecg-1440", 0.48],
    ["home-signature-ecg-1440", 0.48],
    ["home-signature-cell-1440", 0.68],
    ["home-cell-core-1440", 0.88],
    ["home-signature-core-1440", 0.88],
  ]) {
    await page.evaluate((y) => window.scrollTo(0, y), storyHeight * progress);
    await page.waitForTimeout(350);
    await shot(page, name);
  }

  await page.goto(baseURL);
  await page.waitForLoadState("networkidle");
  await shot(page, "home-full-1440", { fullPage: true });

  await page.getByRole("button", { name: /Menü öffnen/i }).click();
  await shot(page, "menu-desktop-1440");
  await page.keyboard.press("Escape");

  await page.goto(`${baseURL}/medizin-zentren`);
  await page.locator("#finder").scrollIntoViewIfNeeded();
  await shot(page, "treatment-finder-desktop");

  for (const [path, name] of [
    ["/notfall", "notfall-1440"],
    ["/medizin-zentren", "medizin-index-1440"],
    ["/medizin-zentren/fachabteilungen/gynaekologie-geburtshilfe", "department-detail-gyn-1440"],
    ["/patienten-besucher", "patienten-1440"],
    ["/karriere-bildung", "karriere-1440"],
    ["/standorte/erding", "standort-erding-1440"],
    ["/aktuelles", "aktuelles-1440"],
    ["/impressum", "legal-impressum-1440"],
    ["/datenschutz", "legal-datenschutz-1440"],
    ["/barrierefreiheit", "legal-barrierefreiheit-1440"],
    ["/does-not-exist", "404-1440"],
  ]) {
    await page.goto(`${baseURL}${path}`);
    await page.waitForLoadState("networkidle");
    await shot(page, name);
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(baseURL);
  await page.waitForLoadState("networkidle");
  await shot(page, "home-390", { fullPage: true });
  await page.getByRole("button", { name: /Menü öffnen/i }).click();
  await shot(page, "menu-mobile-390");
  await page.keyboard.press("Escape");
  await page.goto(`${baseURL}/medizin-zentren`);
  await shot(page, "medizin-390", { fullPage: true });
  await page.locator("#finder").scrollIntoViewIfNeeded();
  await shot(page, "treatment-finder-mobile");

  await browser.close();
} finally {
  server.kill();
}
