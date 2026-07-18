import {
  contentModel,
  editorialRecords,
  events,
  legalPages,
  news,
} from "../src/content/siteContent.js";

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

const requiredNews = new Map([
  ["kinderklinik-sommer-2028", "2026-07-10"],
  ["dexter-nebenniere-weltpremiere", "2026-06-08"],
  ["dexter-einfuehrung", "2026-02-06"],
  ["patientenportal-start", "2026-03-31"],
]);

function walk(value, path = "$", out = []) {
  if (typeof value === "string") {
    out.push({ path, value });
    return out;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, `${path}[${index}]`, out));
    return out;
  }
  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, item]) => walk(item, `${path}.${key}`, out));
  }
  return out;
}

function publicPayload() {
  return editorialRecords.map((entry) => ({
    slug: entry.slug,
    publicContent: entry.publicContent,
  }));
}

const findings = [];
for (const { path, value } of walk(publicPayload())) {
  for (const phrase of bannedPhrases) {
    if (value.toLowerCase().includes(phrase.toLowerCase())) {
      findings.push(`${path}: contains "${phrase}"`);
    }
  }
}

for (const [slug, date] of requiredNews) {
  const item = news.find((entry) => entry.slug === slug);
  if (!item) findings.push(`news.${slug}: missing required official news item`);
  if (item && item.publicationDate !== date) {
    findings.push(`news.${slug}: expected publicationDate ${date}, got ${item.publicationDate}`);
  }
  if (item && (!item.exactOfficialTitle || !item.officialSourceUrl || !item.verifiedDate)) {
    findings.push(`news.${slug}: missing official title, source URL, or verified date`);
  }
}

const today = new Date("2026-07-18T00:00:00+02:00");
for (const event of events) {
  const [day, monthName, year] = event.date.split(" ");
  const month = {
    Jan: 0,
    Feb: 1,
    Mär: 2,
    Apr: 3,
    Mai: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Okt: 9,
    Nov: 10,
    Dez: 11,
  }[monthName];
  const eventDate = new Date(Number(year), month, Number(day.replace(".", "")));
  if (eventDate < today) findings.push(`events.${event.slug}: past event is listed as upcoming`);
}

if (!legalPages.datenschutz?.productionReady) {
  findings.push("legalPages.datenschutz: privacy page is not marked productionReady");
}

if (contentModel.legalPages?.find((entry) => entry.slug === "datenschutz")?.editorial.privacyPlaceholder) {
  findings.push("legalPages.datenschutz: privacy placeholder flag is still enabled");
}

if (findings.length) {
  console.error(`Content validation failed:\n${findings.map((item) => `- ${item}`).join("\n")}`);
  process.exit(1);
}

console.info(`Content validation passed: ${editorialRecords.length} public records checked.`);
