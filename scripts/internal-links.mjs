import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { allInternalRoutes, searchIndex, site } from "../src/content/siteContent.js";

const root = process.cwd();
const sourceRoot = join(root, "src");
const allowed = new Set([...allInternalRoutes, "/im-notfall"]);
const findings = [];

function normalize(path) {
  return path.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
}

function sourceFiles(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) sourceFiles(full, out);
    if (stat.isFile() && /\.(jsx?|mjs)$/.test(name)) out.push(full);
  }
  return out;
}

function checkLink(path, label) {
  const normalized = normalize(path);
  if (!allowed.has(normalized)) findings.push(`${label}: unknown internal link ${path}`);
}

for (const [, path] of [...site.primaryNav, ...site.utilityNav, ...site.legalNav]) {
  checkLink(path, "site navigation");
}

for (const item of searchIndex) {
  checkLink(item.path, `searchIndex.${item.title}`);
}

const literalLink = /\b(?:to|href)=["'](\/[^"']*)["']/g;
for (const file of sourceFiles(sourceRoot)) {
  const text = readFileSync(file, "utf8");
  for (const match of text.matchAll(literalLink)) {
    checkLink(match[1], relative(root, file));
  }
}

if (findings.length) {
  console.error(`Internal link check failed:\n${findings.map((item) => `- ${item}`).join("\n")}`);
  process.exit(1);
}

console.info("Internal link check passed.");
