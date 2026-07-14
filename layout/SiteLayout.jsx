import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { applyA11yPreferences, defaultA11y, loadA11yPreferences, saveA11yPreferences } from "../lib/a11y.js";
import { createScrollConductor } from "../lib/motion.js";
import { Icon } from "../components/Icons.jsx";

const SiteContext = createContext({ lang: "de", setLang: () => {} });

export function useSite() {
  return useContext(SiteContext);
}

const menuEntries = [
  ["Startseite", "/"],
  ["Behandlungsangebot", "/behandlungsangebot"],
  ["Gynäkologie & Geburtshilfe", "/gynaekologie-geburtshilfe"],
  ["Patienten & Besucher", "/patienten-besucher"],
  ["Aktuelles", "/aktuelles"],
  ["Klinikum", "/klinikum"],
  ["Kontakt & Anfahrt", "/kontakt-anfahrt"],
  ["Karriere ↗", "https://karriere.klinikum-erding.de"],
];

function VitalLine() {
  const fillRef = useRef(null);
  const tipRef = useRef(null);

  useEffect(() => {
    return createScrollConductor((smooth) => {
      const pct = Math.max(0, Math.min(100, smooth * 100));
      if (fillRef.current) fillRef.current.style.height = `${pct}%`;
      if (tipRef.current) tipRef.current.style.top = `${pct}%`;
    }, 0.08);
  }, []);

  return (
    <div className="inner-vital" aria-hidden="true">
      <span className="inner-vital-track" />
      <span ref={fillRef} className="inner-vital-fill" />
      <span ref={tipRef} className="inner-vital-tip" />
    </div>
  );
}

function A11yPanel({ open, onClose, lang }) {
  const [prefs, setPrefs] = useState(defaultA11y);
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const loaded = loadA11yPreferences();
    setPrefs(loaded);
    applyA11yPreferences(loaded);
  }, []);

  function update(key, value) {
    const next = { ...prefs, [key]: value };
    setPrefs(next);
    applyA11yPreferences(next);
    saveA11yPreferences(next);
    setAnnouncement(lang === "de" ? "Ansicht aktualisiert." : "Display updated.");
  }

  return (
    <>
      <div className="sr-live" aria-live="polite">
        {announcement}
      </div>
      {open ? (
        <div className="a11y-popover site-panel" role="dialog" aria-modal="false" aria-labelledby="a11y-title">
          <div className="panel-head">
            <h2 id="a11y-title">{lang === "de" ? "Ansicht anpassen" : "Adjust display"}</h2>
            <button type="button" className="icon-btn" onClick={onClose} aria-label="Schließen">
              <Icon name="close" />
            </button>
          </div>

          <fieldset>
            <legend>{lang === "de" ? "Farbmodus" : "Color mode"}</legend>
            <div className="segmented">
              {[
                ["standard", "Standard"],
                ["farbsehen", "Farbsehen"],
                ["kontrast", "Kontrast"],
              ].map(([value, label]) => (
                <button
                  type="button"
                  key={value}
                  className={prefs.theme === value ? "on" : ""}
                  onClick={() => update("theme", value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend>{lang === "de" ? "Schriftgröße" : "Text size"}</legend>
            <div className="segmented">
              {["100", "115", "130"].map((value) => (
                <button
                  type="button"
                  key={value}
                  className={prefs.textSize === value ? "on" : ""}
                  onClick={() => update("textSize", value)}
                >
                  {value}%
                </button>
              ))}
            </div>
          </fieldset>

          <label className="toggle-line">
            <input
              type="checkbox"
              checked={prefs.motion === "reduced"}
              onChange={(event) => update("motion", event.target.checked ? "reduced" : "system")}
            />
            <span>{lang === "de" ? "Bewegung reduzieren" : "Reduce motion"}</span>
          </label>

          <label className="toggle-line">
            <input
              type="checkbox"
              checked={prefs.readingGuide === "on"}
              onChange={(event) => update("readingGuide", event.target.checked ? "on" : "off")}
            />
            <span>{lang === "de" ? "Zeilenfokus" : "Reading guide"}</span>
          </label>
        </div>
      ) : null}
    </>
  );
}

function Header({ lang, setLang }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let raf = 0;
    const frame = () => {
      setScrolled(window.scrollY > 40);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="wrap site-header-inner">
          <Link className="site-logo" to="/" aria-label="Klinikum Landkreis Erding Startseite">
            <span className="logo-mark" aria-hidden="true">
              KE
            </span>
            <span>
              <strong>Klinikum Landkreis Erding</strong>
              <small>Spitzenmedizin ganz nah</small>
            </span>
          </Link>
          <div className="site-header-actions">
            <button type="button" className="header-a11y" onClick={() => setPanelOpen((value) => !value)}>
              <Icon name="access" />
              <span>{lang === "de" ? "Ansicht" : "Display"}</span>
            </button>
            <div className="lang-pill" aria-label="Sprache">
              <button type="button" className={lang === "de" ? "on" : ""} onClick={() => setLang("de")}>
                DE
              </button>
              <button type="button" className={lang === "en" ? "on" : ""} onClick={() => setLang("en")}>
                EN
              </button>
            </div>
            <NavLink className="emergency-link" to="/notaufnahme">
              <Icon name="warning" />
              <span>Notfall</span>
            </NavLink>
            <button type="button" className="menu-toggle" onClick={() => setMenuOpen(true)}>
              <span>Menü</span>
              <Icon name="menu" />
            </button>
          </div>
        </div>
        <A11yPanel open={panelOpen} onClose={() => setPanelOpen(false)} lang={lang} />
      </header>
      <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function FullscreenMenu({ open, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusables = () =>
      Array.from(ref.current?.querySelectorAll("a, button") || []).filter((node) => !node.hasAttribute("disabled"));

    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const nodes = focusables();
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    window.setTimeout(() => focusables()[0]?.focus(), 20);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div ref={ref} className={`fullscreen-menu ${open ? "open" : ""}`} aria-hidden={!open}>
      <div className="fullscreen-top wrap">
        <Link to="/" className="site-logo light" onClick={onClose}>
          <span className="logo-mark" aria-hidden="true">
            KE
          </span>
          <span>
            <strong>Klinikum Landkreis Erding</strong>
            <small>Konzeptstudie</small>
          </span>
        </Link>
        <button type="button" className="menu-close" onClick={onClose} aria-label="Menü schließen">
          <Icon name="close" />
        </button>
      </div>
      <div className="fullscreen-body wrap">
        <nav className="fullscreen-links" aria-label="Hauptmenü">
          {menuEntries.map(([label, to], index) =>
            to.startsWith("http") ? (
              <a key={label} href={to} target="_blank" rel="noreferrer" onClick={onClose}>
                <span className="mono">{String(index + 1).padStart(2, "0")}</span>
                {label}
              </a>
            ) : (
              <Link key={label} to={to} onClick={onClose}>
                <span className="mono">{String(index + 1).padStart(2, "0")}</span>
                {label}
              </Link>
            ),
          )}
        </nav>
        <aside className="fullscreen-contact">
          <strong>Direktkontakt</strong>
          <span className="mono">112 Notruf</span>
          <span className="mono">08122 59-0 Zentrale</span>
          <span className="mono">08122 59-1648 Gynäkologie</span>
          <p>Bajuwarenstraße 5, 85435 Erding</p>
        </aside>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <section>
          <h2>Klinikum Landkreis Erding</h2>
          <p>Kommunalunternehmen (AöR) des Landkreises Erding. Akademisches Lehrkrankenhaus der TU München.</p>
          <p className="mono">Bajuwarenstraße 5 · 85435 Erding · 08122 59-0</p>
        </section>
        <section>
          <h3>Schnellzugriff</h3>
          <Link to="/behandlungsangebot">Behandlungsangebot</Link>
          <Link to="/gynaekologie-geburtshilfe">Gynäkologie & Geburtshilfe</Link>
          <Link to="/patienten-besucher">Patienten & Besucher</Link>
          <Link to="/aktuelles">Aktuelles</Link>
        </section>
        <section>
          <h3>Rechtliches</h3>
          <Link to="/impressum">Impressum</Link>
          <Link to="/datenschutz">Datenschutz</Link>
          <Link to="/barrierefreiheit">Barrierefreiheit</Link>
          <Link to="/patienten-besucher/hausordnung">Hausordnung</Link>
        </section>
        <section>
          <h3>Partner</h3>
          <a href="https://foerderverein-kle.org" target="_blank" rel="noreferrer">Förderverein ↗</a>
          <a href="https://karriere.klinikum-erding.de" target="_blank" rel="noreferrer">Karriereportal ↗</a>
        </section>
      </div>
      <div className="wrap footer-bottom">
        <span>© 2026 Klinikum Landkreis Erding</span>
        <span>Concept study by Cogniiq</span>
      </div>
    </footer>
  );
}

function Klara({ lang }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const emergencyRe = /(notfall|herzinfarkt|brustschmerz|atemnot|bewusstlos|schlaganfall|stroke|starke blutung|unconscious|chest pain|suizid|suicide)/i;

  function send(text = input) {
    const content = text.trim();
    if (!content) return;
    const emergency = emergencyRe.test(content);
    const reply = emergency
      ? "Bei akuten Beschwerden bitte sofort 112 anrufen. Diese Demo ersetzt keine medizinische Triage."
      : "Ich kann in dieser Konzeptstudie Wege, Kontakte und Sprechstunden nennen. Medizinische Entscheidungen trifft bitte das Behandlungsteam.";
    setMessages((items) => [...items, { role: "user", content }, { role: "assistant", content: reply }]);
    setInput("");
  }

  return (
    <div className={`klara ${open ? "open" : ""}`}>
      <button type="button" className="klara-button" onClick={() => setOpen((value) => !value)}>
        <Icon name="person" />
        <span>Klara</span>
      </button>
      {open ? (
        <section className="klara-panel" aria-label="Klara digitale Empfangsassistenz">
          <h2>Klara</h2>
          <p>{lang === "de" ? "Digitale Empfangsassistenz der Konzeptstudie." : "Digital front desk assistant for this concept study."}</p>
          <div className="klara-log">
            {messages.length ? messages.map((msg, index) => <p key={index} className={msg.role}>{msg.content}</p>) : <p>Wie kann ich helfen?</p>}
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              send();
            }}
          >
            <input value={input} onChange={(event) => setInput(event.target.value)} aria-label="Nachricht an Klara" />
            <button type="submit" className="btn btn-primary">Senden</button>
          </form>
        </section>
      ) : null}
    </div>
  );
}

export default function SiteLayout() {
  const [lang, setLang] = useState("de");
  const location = useLocation();
  const mainRef = useRef(null);
  const value = useMemo(() => ({ lang, setLang }), [lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    const node = mainRef.current;
    if (node) {
      node.classList.remove("route-enter");
      void node.offsetWidth;
      node.classList.add("route-enter");
      window.setTimeout(() => node.focus({ preventScroll: true }), 20);
    }
  }, [location.pathname]);

  useEffect(() => {
    const update = (event) => {
      document.documentElement.style.setProperty("--reading-y", `${event.clientY - 24}px`);
    };
    window.addEventListener("pointermove", update, { passive: true });
    return () => window.removeEventListener("pointermove", update);
  }, []);

  return (
    <SiteContext.Provider value={value}>
      <div className="site-shell">
        <a className="skip-link" href="#main">Zum Inhalt springen</a>
        <Header lang={lang} setLang={setLang} />
        <VitalLine />
        <main id="main" ref={mainRef} className="site-main route-enter" tabIndex="-1">
          <Outlet />
        </main>
        <Footer />
        <Klara lang={lang} />
        <div className="reading-guide" aria-hidden="true" />
      </div>
    </SiteContext.Provider>
  );
}
