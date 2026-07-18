# QA Checklist

## Automated Checks Run

- `npm.cmd install`: passed.
- `npm.cmd run build`: passed with Vite 8.1.5.

## Manual Checks Required Before Production

- Keyboard walkthrough:
  - Skip link to `main`.
  - Header navigation.
  - Menu open/close by button and `Escape`.
  - All route links reachable by keyboard.
- Reduced motion:
  - Helix remains meaningful as a static signature frame.
  - CSS transitions and pulse animation stop under `prefers-reduced-motion`.
- Content governance:
  - Replace every source-review item with official source-backed content.
  - Keep source IDs on hard facts.
- SEO:
  - Verify route titles/descriptions in browser devtools.
  - Add real OG image once brand assets exist.
- Accessibility:
  - Contrast pass for all page types.
  - Screen reader pass on menu, directory lists, medical detail templates, and legal pages.
- Performance:
  - Lighthouse mobile on `/`, `/medizin-zentren`, one Fachabteilung, `/patienten-besucher`, `/notfall`.
  - Canvas pixel/rendering check on desktop and mobile.

## Current Known Limits

- News and events should be refreshed against official sources before launch.
- Legal pages still need final legal review.
- The AI assistant from the original demo is deliberately not wired as a browser-side external API call; production requires a backend boundary.
