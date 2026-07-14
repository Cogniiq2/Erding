# Klinikum Landkreis Erding Concept Build Notes

## What exists

- `App.jsx` remains untouched and is lazy-loaded only for route `/`.
- `main.jsx` adds Vite/React Router with lazy route chunks and a porcelain fallback with one pulsing vital-line dot.
- `layout/SiteLayout.jsx` wraps every non-landing route with fixed header, focus-trapped fullscreen menu, emergency affordance, footer, vital line, accessibility panel, route focus restoration, route fade/rise, scroll-to-top, and Klara.
- `styles/tokens.css`, `styles/themes.css`, and `styles/global.css` define the token system, standard/farbsehen/kontrast themes, reduced-motion behavior, layout, templates, finder, forms, and responsive rules.
- `content/` is the source of truth for departments, centers, patient services, news/events, finder terms, and clinic facts.
- `templates/` contains reusable department, service, and center page templates.
- `pages/` contains thin route files for the sitemap, including `/gynaekologie-geburtshilfe`, `/gynaekologie-geburtshilfe/geburt-anmelden`, `/behandlungsangebot`, `/zentren`, `/notaufnahme`, `/patienten-besucher`, `/aktuelles`, `/klinikum`, `/kontakt-anfahrt`, legal pages, and 404.

## Data-only department proof

To add a department, add one object to `content/departments.js`:

```js
dept({
  slug: "example-department",
  name: { de: "Example Department", en: "Example Department" },
  teaser: { de: "Short directory teaser", en: "Short directory teaser" },
  intro: { de: "Intro copy.", en: "Intro copy." },
  spektrum: [{ title: "Diagnostik", desc: "What this unit does." }],
  team: [{ name: "Team Name", role: { de: "Rolle", en: "Role" } }],
  kontakt: { phone: "08122 59-0", email: "info@klinikum-erding.de" },
  sprechstunden: [{ name: { de: "Ambulanz", en: "Clinic" }, day: { de: "Mo", en: "Mon" }, time: "08:00-12:00" }],
})
```

No new component is required. The existing routes render:

- `/behandlungsangebot/example-department`
- `/behandlungsangebot/example-department/spektrum`
- `/behandlungsangebot/example-department/team`
- `/behandlungsangebot/example-department/kontakt`

## Accessibility panel

- Standard, color-vision-friendly, and high-contrast themes are implemented through CSS custom property remapping in `styles/themes.css`.
- Text size uses `html[data-text-size]` at 100%, 115%, and 130%.
- Reduced motion can be selected manually and is also respected through `prefers-reduced-motion`.
- Reading guide is off by default and follows pointer position when enabled.
- Preferences persist in `localStorage` and are restored on load.
- Updates are announced through an `aria-live="polite"` region.

## Verification run

- `npm.cmd install`: completed.
- `npm.cmd run build`: passed on Vite 8.1.4.
- `npm.cmd audit`: found 0 vulnerabilities after upgrading Vite/plugin-react.
- `git diff -- App.jsx`: no changes.
- Foreground dev server startup was verified with `node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5173`; Vite reported `http://127.0.0.1:5173/` before the command was intentionally timed out by the shell tool.

## Not run in this environment

- Lighthouse mobile audits for `/`, `/gynaekologie-geburtshilfe`, one department page, and `/aktuelles` were not run because no Lighthouse/Chrome audit harness is configured in the repo.
- Screenshot capture for every accessibility theme was not run.
- Full manual keyboard walkthrough was not run, but the implemented controls include semantic buttons/links, focus-trapped menu, route focus restoration, and form validation states.
- A persistent detached dev server could not be kept alive from this managed PowerShell shell; direct foreground Vite startup works.

## Known implementation notes

- The landing chunk remains large because the existing untouched `App.jsx` owns the Three.js cinematic scene. It is isolated to the `/` route by lazy loading.
- The inner-page Klara implementation preserves the emergency-intercept behavior, but `App.jsx` does not export its original `ChatWidget`; exporting it would require touching the protected landing file.
