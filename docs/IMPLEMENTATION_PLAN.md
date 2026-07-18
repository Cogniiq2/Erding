# Implementation Plan

## 1. Repo Audit

Done in `docs/REPO_AUDIT.md`.

## 2. Befund

- Architecture: one monolithic `App.jsx`, no package/build scaffold on `main`.
- Performance: strong Three.js signature, but animation concerns are coupled and repeated DOM queries appear in RAF paths.
- UX: premium direction exists, but only as a one-pager.
- Accessibility: reduced motion is partial; no route-level focus, skip link, or systematic keyboard model.
- SEO: no route metadata or structured data.
- Fact fidelity: several core facts match official sources; uncertain medical/news details are marked for content review.

## 3. Geplanter Zielzustand

A production-base SPA with:

- Vite/React app shell.
- Data-driven route tree.
- Shared layout, header, footer, breadcrumbs, page hero, and cards.
- Refactored home page with the preserved medical helix signature.
- Medical unit templates with slots for symptoms, services, team, nursing, contact, hours, downloads, FAQ, related centers, and CTAs.
- Metadata and source-aware content.

## 4. Neue Dateistruktur

```txt
App.jsx
main.jsx
index.html
vite.config.js
src/
  app/AppRouter.jsx
  components/
  content/
  lib/
  pages/
  styles/
docs/
```

## 5. Inhaltsmodell / Datenmodell

Content modules use plain JS objects so a future CMS can map one-to-one:

- `site`: organization facts and global navigation.
- `locations`: Erding and Dorfen.
- `medicalUnits`: departments and clinical units.
- `centers`: centers/special areas.
- `services`: patient and visitor topics.
- `emergencyTopics`: emergency cluster.
- `careerTopics`: career and education cluster.
- `aboutTopics`: about/quality/history/digitalization cluster.
- `news` and `events`.
- `legalPages`.
- `sources`: official source registry.

Every hard factual content item should carry `sourceRefs` or a `contentNeeded` flag.

## 6. Umsetzungsphasen

1. Scaffold Vite and route shell.
2. Extract design tokens, global CSS, metadata helper, motion helper.
3. Refactor home signature into isolated `SignatureHelix`.
4. Add content modules and reusable templates.
5. Add top-level and cluster routes.
6. Add docs and QA notes.

## 7. Code-Änderungen

Implemented as new files under `src/`, plus a small `App.jsx` wrapper.

## 8. QA-Checkliste

- `npm install`
- `npm run build`
- `npm audit`
- Keyboard pass: skip link, header nav, menu open/close, route links.
- Reduced-motion pass: helix remains static and CSS animations stop.
- Metadata pass: title/description change per route.
- Fact pass: no unsourced hard facts without source IDs or `CONTENT-NEEDED`.
