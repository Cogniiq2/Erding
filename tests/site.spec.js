import { expect, test } from "@playwright/test";
import { allInternalRoutes } from "../src/content/siteContent.js";

const bannedPhrases = [
  "website",
  "Konzeptseite",
  "vorbereitet",
  "Vorbereitung",
  "Freigabe",
  "freigegeben",
  "final bestätigen",
  "redaktionell",
  "Prüfstand",
  "Prüfstatus",
  "Content",
  "Contentstatus",
  "Quelle erforderlich",
  "nicht erfunden",
  "Struktur aufbauen",
  "wird künftig",
  "nach Aktivierung",
  "Zielsystem",
  "fachlich freigeben",
  "Bildrechte",
  "Produktionssystem",
  "Implementation",
  "Governance",
  "Platzhalter",
  "Auditstatus",
  "Client",
  "Brief",
  "CONTENT-NEEDED",
];

test.beforeEach(async ({ page }) => {
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  page._consoleErrors = errors;
});

test.afterEach(async ({ page }) => {
  expect(page._consoleErrors).toEqual([]);
});

test("homepage loads with signature scene", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Medizin, die bei Ihnen bleibt/i })).toBeVisible();
  const canvas = page.locator(".signature-helix canvas").first();
  await expect(canvas).toBeVisible();
  const box = await canvas.boundingBox();
  expect(box?.width).toBeGreaterThan(300);
  expect(box?.height).toBeGreaterThan(300);
});

test("menu and search close with Escape", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Menü öffnen/i }).click();
  await expect(page.getByRole("dialog", { name: /Hauptmenü/i })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: /Hauptmenü/i })).toBeHidden();

  await page.getByRole("button", { name: /Suche öffnen/i }).click();
  await expect(page.getByRole("dialog", { name: /Seitensuche/i })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: /Seitensuche/i })).toBeHidden();
});

test("required routes resolve", async ({ page }, testInfo) => {
  testInfo.setTimeout(process.env.CI ? 120000 : 60000);

  for (const route of allInternalRoutes) {
    await page.goto(route);
    await expect(page.locator("main")).toBeVisible();
    await expect(page.getByRole("heading").first()).toBeVisible();
  }
});

test("unknown route shows 404", async ({ page }) => {
  await page.goto("/nicht-vorhanden");
  await expect(page.getByRole("heading", { name: /nicht gefunden/i })).toBeVisible();
});

test("treatment finder changes results", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Unterleib" }).click();
  await expect(page.getByText("Schwangerschaft")).toBeVisible();
  await expect(page.getByText("Gynäkologie und Geburtshilfe").first()).toBeVisible();
});

test("emergency CTA uses telephone 112", async ({ page }) => {
  await page.goto("/notfall");
  await expect(page.locator('a[href="tel:112"]').first()).toBeVisible();
});

test("rendered pages do not expose internal wording", async ({ page }) => {
  for (const route of ["/", "/aktuelles", "/veranstaltungen", "/medizin-zentren", "/notfall", "/datenschutz"]) {
    await page.goto(route);
    const text = await page.locator("body").innerText();
    const lower = text.toLowerCase();
    for (const phrase of bannedPhrases) {
      expect(lower, `${route} contains ${phrase}`).not.toContain(phrase.toLowerCase());
    }
  }
});

test("reduced motion keeps homepage readable", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".signature-fallback").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: /Medizin, die bei Ihnen bleibt/i })).toBeVisible();
});
