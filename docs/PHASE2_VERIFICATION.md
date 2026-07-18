# Phase 2 Verification

Date: 2026-07-18  
Branch: `codex/production-architecture`  
Scope: Routed production architecture, complete first-pass user-facing hospital site, route QA, source governance, visual QA, SEO assets.

## Current State Before Implementation

- Active branch confirmed as `codex/production-architecture`.
- `origin/main` remains the landing-only version and was not checked out, merged into, or overwritten.
- Previous foundation contained a routed app shell, shared layout, content model, docs, and a simplified `SignatureHelix`.
- Initial browser inspection found homepage regression: the signature experience had been reduced to a simpler helix-to-ECG canvas, mobile readability was weak, and visible `CONTENT-NEEDED` labels appeared in the UI.

## Route Inventory

| Route | Completion | Content Status | Source Status | Remaining Client Input |
| --- | --- | --- | --- | --- |
| `/` | Implemented | Mixed verified and confirmation-needed content | Official sources + brief | Official innovation/news imagery and future-topic confirmations |
| `/aktuelles` | Implemented | Needs client confirmation | Source-governed newsroom structure | Current dated news, image rights, approvals |
| `/veranstaltungen` | Implemented | Needs client confirmation | Source-governed event structure | Current dates, locations, registration details |
| `/patienten-besucher` | Implemented | Needs client confirmation | Official visiting + service architecture | Full patient-service text and contact ownership |
| `/notfall` | Implemented | Needs clinical confirmation | Emergency wording intentionally conservative | Notaufnahme process/contact wording approval |
| `/medizin-zentren` | Implemented | Verified directory, detail text pending | Official medical directory and centers | Department-specific service/team/download detail |
| `/pflege` | Implemented | Needs client confirmation | Official OP-care source + content architecture | Nursing directorate/team details |
| `/karriere-bildung` | Implemented | Needs client confirmation | Official profile + career portal link | Benefits, contacts, education confirmations |
| `/klinikum` | Implemented | Verified profile + institutional topics pending | Official about/imprint | Leadership/personnel confirmation |
| `/standorte` | Implemented | Verified address basis | Official contact source | Final maps, parking and photography |
| `/standorte/erding` | Implemented | Verified | Official contact source | Final wayfinding assets |
| `/standorte/dorfen` | Implemented | Needs client confirmation | Official contact/about source | Dorfen access details and photography |
| `/kontakt-anfahrt` | Implemented | Verified basis | Official contact source | Final map/embed decision |
| `/digitalisierung` | Implemented | Needs client confirmation | Brief + governance model | Portal, Dexter and backend integrations |
| `/qualitaet` | Implemented | Mixed | Official center list | Quality reports, certificate PDFs |
| `/zertifizierungen` | Implemented | Verified center list, certificates pending | Official centers source | Certificate files, dates, wording |
| `/krankenhausleitung` | Implemented | Needs client confirmation | Imprint as basis | Current people, roles and contacts |
| `/leitbild` | Implemented | Needs client confirmation | Official profile + brief | Final Leitbild wording |
| `/geschichte` | Implemented | Needs client confirmation | Official profile + brief | Historical timeline details |
| `/impressum` | Implemented | Verified | Official imprint | Legal owner review before launch |
| `/datenschutz` | Implemented | Needs legal confirmation | Imprint only | Final legal privacy text |
| `/barrierefreiheit` | Implemented | Needs audit confirmation | Brief | Final accessibility statement and feedback route |

## Route QA

- Direct route sweep covered the required routes plus sample nested routes:
  - `/patienten-besucher/besuchszeiten`
  - `/notfall/triage`
  - `/medizin-zentren/fachabteilungen/gynaekologie-geburtshilfe`
  - `/medizin-zentren/zentren/brustzentrum`
  - `/nicht-vorhanden`
- Result: no broken required routes, no visible `CONTENT-NEEDED`, no mojibake, no fresh console warnings/errors.
- Internal link check collected and opened 79 unique internal paths; result: no broken internal links.
- Legacy `/im-notfall` routes redirect to `/notfall`.

## Visual QA

Tested viewport widths:

- 360 px
- 390 px
- 768 px
- 1024 px
- 1440 px
- 1920 px

Inspected key pages:

- Homepage
- Navigation/search overlays
- Emergency page
- Medical directory
- Gynäkologie und Geburtshilfe detail page
- Patient page
- Standort Erding
- Career page
- Impressum
- 404

Screenshots saved:

- `docs/screenshots/home-390.png`
- `docs/screenshots/home-1440.png`
- `docs/screenshots/home-helix-1440.png`
- `docs/screenshots/home-ecg-1440.png`
- `docs/screenshots/home-cell-core-1440.png`
- `docs/screenshots/medizin-390.png`
- `docs/screenshots/notfall-1440.png`

## Original Homepage Comparison

`origin/main:App.jsx` was used as the visual reference. The previous refactor had degraded the signature experience by reducing it to a simpler canvas. This phase restored the five-part motion language:

- helix
- helix traversal
- ECG / heartbeat transformation
- cellular / new-life form
- central clinical core

Fixes made after screenshot QA:

- Canvas layer positioned above the fallback, which fixed the invisible WebGL issue.
- Particle field widened and offset to restore visual impact.
- Particle sizes switched to screen-space sizing for stable desktop/mobile visibility.
- ECG recentering improved after helix traversal.
- Story copy transition shortened and inactive acts hidden to prevent text overlap.

## Remaining `CONTENT-NEEDED`

Remaining markers are data-layer only and did not appear visibly during browser QA:

- Dorfen photography, wayfinding and access details.
- Department detail content: service spectrum, team, downloads, clinic-specific FAQ and hours.
- Notaufnahme detailed contacts and process wording.
- Robotik/Dexter and planned Kinderklinik: current official source and publication approval.
- Personnel names and current Sprechstunden before launch.
- Zentrumsleitung, certificates, documents and certificate dates.
- Patient portal destination, authentication, support and privacy details.
- Current news and events with dates, media rights and approvals.
- Final Datenschutz text.
- Final Barrierefreiheit declaration, audit status and feedback route.

## Unverified Or Time-Sensitive Facts

- Personnel and leadership are treated as `needs-client-confirmation`.
- Dexter/robotic surgery and planned Kinderklinik remain prepared as innovation/news topics, not final hard claims.
- Specific vacancies are not rendered; job entry links to the external career portal.
- No fake review ratings, birth numbers, certifications, vacancies, or personnel claims were added.

## Missing Official Imagery

The repo did not contain authorized photography. Required final assets are documented in `src/content/siteContent.js` under `imageSlots`:

- Klinikum Erding exterior / entrance.
- Klinik Dorfen exterior / access situation.
- Authentic clinical team photography with releases.
- Geburtshilfe/family environment without patient-identifying data.

## Performance Decisions

- Route-level code splitting is kept through React lazy routes.
- `SignatureHelix` is lazy-loaded from the homepage and loads Three.js only for that route chunk.
- Renderer, geometry, materials, event listeners and animation frame are cleaned up on unmount.
- Device pixel ratio is capped, and mobile particle count is lower.
- Reduced-motion users receive a static/fallback story experience.
- Below-the-fold sections avoid heavy media until official assets exist.

## Accessibility Decisions

- German `lang` is set in `index.html`.
- Skip link, semantic header/main/footer and route-change focus management are present.
- Navigation, search and menu dialogs close via Escape.
- Search input is labelled; menu/search controls have accessible names.
- Breadcrumbs are included on routed pages.
- Emergency content separates 112, emergency department information and non-urgent contact.
- Reduced-motion handling is implemented.
- No legal compliance claim is made before a formal accessibility audit.

## Local Review Commands

```powershell
npm.cmd install
npm.cmd run dev -- --port 5173
npm.cmd run build
npm.cmd audit
```

Then open:

```text
http://127.0.0.1:5173/
```

Suggested manual review routes:

```text
/
/notfall
/medizin-zentren
/medizin-zentren/fachabteilungen/gynaekologie-geburtshilfe
/patienten-besucher
/standorte/erding
/karriere-bildung
/impressum
/nicht-vorhanden
```
