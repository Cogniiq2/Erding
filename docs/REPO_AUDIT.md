# Repo Audit: Klinikum Landkreis Erding

## 1. Current Project Structure

The current `main` branch contains a single tracked application file:

- `App.jsx` with 1,131 lines.

There is no `package.json`, Vite entry HTML, router, content layer, build configuration, test setup, style directory, or documentation on `main`.

## 2. Entry Points And Runtime Shape

- `App.jsx` imports React hooks and `three`.
- The file exports one default `App` component.
- CSS is injected through a large `CSS` template literal.
- All route-like navigation is in-page anchor scrolling.
- Three.js scene setup, scroll story, menu, language state, content, chat assistant, reveal effects, stat counters, and footer all live in one module.

## 3. Components And Responsibilities Found

- Header and fullscreen menu are inline inside `App`.
- `ChatWidget` is a nested component with an emergency regex and a direct browser call to `https://api.anthropic.com/v1/messages`.
- `StoryStage` owns the signature 3D helix/morphing scroll sequence.
- `PageConductor` performs DOM-driven scroll effects for vital line, ECG path, scanner rows, and feature parallax.
- `Stat`, `useReveal`, tilt card handlers, department scanner rows, news cards, location cards, and footer are all colocated in `App.jsx`.

## 4. Styling Sources

- All styling is a single CSS string injected at render time.
- Tokens exist, but they are not separated from component styles.
- Typography imports live inside the runtime CSS string.
- Several headings use negative letter spacing and viewport-based scaling.
- Layout and component styles are not reusable outside the one page.

## 5. Motion And Performance Findings

- The 3D helix idea is strong and should be preserved as the brand signature.
- There are multiple animation systems in one file: Three.js RAF, page conductor RAF, stat count-up RAF, CSS animations, and IntersectionObserver reveals.
- `PageConductor` performs repeated `querySelector` calls in the animation loop.
- Header scroll state uses a scroll listener that triggers React state updates.
- Reduced-motion handling exists for some parts but not all CSS/JS motion.
- The Three.js scene is not isolated as a route-level or component-level signature module.

## 6. Content And Fact Findings

- Content is hardcoded in arrays/constants: `T`, `DEPTS`, `SPRECH`, `NEWS`, `SYS_PROMPT`.
- No content has source IDs.
- Some statements match official sources, including 330 beds, 12 pain day-clinic places, 100% Landkreis ownership, TU Munich teaching hospital status, address, visit times, and Gyn contact data.
- Some statements were not verified in the initial audit and needed source-review flags, especially future-looking/news claims and broad claims like "zertifizierte Onkologie" where the exact official wording was not present in the checked source snippets.
- The demo mixes German/English strings but does not provide scalable i18n.

## 7. Accessibility Findings

- Positive: emergency terms are intercepted by the assistant; the visual system has strong hierarchy; reduced-motion is partially considered.
- Risks: fullscreen menu is not explicitly focus-trapped in the audit view; chat uses emoji button text; no skip link; no route focus management because there are no routes; no per-page landmarks beyond the one page; no systematic focus design outside CSS defaults.
- Color is sometimes a semantic carrier without explicit text/icon pairing.

## 8. SEO And Semantics Findings

- No HTML entry file on `main`.
- No route-specific title/description.
- No OG/Twitter metadata update layer.
- No JSON-LD structure.
- No routable pages for indexed clinical content.
- One-page anchors cannot support the required content clusters.

## 9. Architecture Risks

- The monolith blocks incremental work: any change touches a large, high-risk file.
- Three.js rendering and page content are coupled.
- Content cannot be connected to a CMS without first extracting data structures.
- No route-level code splitting.
- No clear ownership boundary between layout, motion, content, and pages.
- Direct frontend call to an AI API is not production-ready and should become a backend integration or disabled demo component.

## 10. Target State

- Keep React, Vite, and Three.js.
- Replace the monolithic page with a route-based app shell.
- Preserve the signature helix as `SignatureHelix`, isolated from content and layout.
- Build content modules with source references and source-review flags.
- Provide reusable page templates for medical units, centers, services, career, about, legal, news, and events.
- Add metadata management, JSON-LD, skip link, route focus, reduced-motion, and keyboard-safe navigation.
