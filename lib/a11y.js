const STORAGE_KEY = "erding-view-preferences";

export const defaultA11y = {
  theme: "standard",
  textSize: "100",
  motion: "system",
  readingGuide: "off",
};

export function loadA11yPreferences() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultA11y, ...JSON.parse(raw) } : defaultA11y;
  } catch {
    return defaultA11y;
  }
}

export function saveA11yPreferences(prefs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

export function applyA11yPreferences(prefs) {
  const root = document.documentElement;
  root.dataset.theme = prefs.theme;
  root.dataset.textSize = prefs.textSize;
  root.dataset.motion = prefs.motion;
  root.dataset.readingGuide = prefs.readingGuide;
}

export function motionIsReduced() {
  return (
    document.documentElement.dataset.motion === "reduced" ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
