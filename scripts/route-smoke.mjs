import { allInternalRoutes, routeInventory } from "../src/content/siteContent.js";

const requiredRoutes = [
  "/",
  "/aktuelles",
  "/veranstaltungen",
  "/patienten-besucher",
  "/notfall",
  "/medizin-zentren",
  "/pflege",
  "/karriere-bildung",
  "/klinikum",
  "/standorte",
  "/kontakt-anfahrt",
  "/digitalisierung",
  "/qualitaet",
  "/zertifizierungen",
  "/krankenhausleitung",
  "/leitbild",
  "/geschichte",
  "/impressum",
  "/datenschutz",
  "/barrierefreiheit",
];

const paths = new Set(allInternalRoutes);
const findings = [];

for (const path of requiredRoutes) {
  if (!paths.has(path)) findings.push(`missing required route ${path}`);
}

const duplicates = allInternalRoutes.filter((path, index) => allInternalRoutes.indexOf(path) !== index);
for (const duplicate of new Set(duplicates)) findings.push(`duplicate route ${duplicate}`);

for (const route of routeInventory) {
  if (!route.title) findings.push(`route ${route.path} has no title`);
}

if (findings.length) {
  console.error(`Route smoke failed:\n${findings.map((item) => `- ${item}`).join("\n")}`);
  process.exit(1);
}

console.info(`Route smoke passed: ${allInternalRoutes.length} routes listed.`);
