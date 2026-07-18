import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { searchIndex, site } from "../content/siteContent.js";
import { Icon } from "./Icons.jsx";

const menuGroups = [
  {
    title: "Patientenwege",
    links: [
      ["Patienten & Besucher", "/patienten-besucher"],
      ["Notfall", "/notfall"],
      ["Patientenportal", "/patienten-besucher/patientenportal-digitale-services"],
      ["Kontakt & Anfahrt", "/kontakt-anfahrt"],
    ],
  },
  {
    title: "Medizin",
    links: [
      ["Medizin & Zentren", "/medizin-zentren"],
      ["Behandlungsfinder", "/medizin-zentren#finder"],
      ["Gynäkologie & Geburtshilfe", "/medizin-zentren/fachabteilungen/gynaekologie-geburtshilfe"],
      ["Zertifizierungen", "/zertifizierungen"],
    ],
  },
  {
    title: "Klinikum",
    links: [
      ["Klinikum", "/klinikum"],
      ["Standorte", "/standorte"],
      ["Pflege", "/pflege"],
      ["Karriere & Bildung", "/karriere-bildung"],
    ],
  },
];

export default function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const mainRef = useRef(null);
  const searchRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    window.setTimeout(() => mainRef.current?.focus({ preventScroll: true }), 20);
  }, [location.pathname]);

  useEffect(() => {
    const locked = menuOpen || searchOpen;
    document.body.style.overflow = locked ? "hidden" : "";
    const onKey = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    if (searchOpen) window.setTimeout(() => searchRef.current?.focus(), 40);
  }, [searchOpen]);

  const searchResults = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return searchIndex.slice(0, 9);
    return searchIndex
      .filter((item) => `${item.title} ${item.type} ${item.text || ""}`.toLowerCase().includes(needle))
      .slice(0, 12);
  }, [query]);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">Zum Inhalt springen</a>
      <header className="site-header">
        <div className="wrap header-grid">
          <Link className="brand" to="/" aria-label={`${site.name} Startseite`}>
            <span className="brand-mark">KE</span>
            <span>
              <strong>{site.name}</strong>
              <small>{site.claim}</small>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Hauptnavigation">
            {site.primaryNav.slice(0, 6).map(([label, to]) => (
              <NavLink key={to} to={to}>{label}</NavLink>
            ))}
          </nav>

          <div className="header-actions">
            <button className="icon-button" type="button" onClick={() => setSearchOpen(true)} aria-label="Suche öffnen">
              <Icon name="search" />
            </button>
            <NavLink className="utility-link" to="/patienten-besucher/patientenportal-digitale-services">
              <Icon name="portal" />
              <span>Portal</span>
            </NavLink>
            <NavLink className="emergency-pill" to="/notfall">
              <Icon name="alert" />
              <span>Notfall</span>
            </NavLink>
            <button className="menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Menü öffnen">
              <span>Menü</span>
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      {searchOpen && (
        <div className="search-overlay" role="dialog" aria-modal="true" aria-label="Seitensuche">
          <div className="wrap search-panel">
            <div className="dialog-top">
              <h2>Suche</h2>
              <button className="icon-button" type="button" onClick={() => setSearchOpen(false)} aria-label="Suche schließen">
                <Icon name="close" />
              </button>
            </div>
            <label className="search-field">
              <span>Suchbegriff</span>
              <input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Abteilung, Service, Standort ..." />
            </label>
            <div className="search-results" aria-live="polite">
              {searchResults.map((result) => (
                <Link key={`${result.type}-${result.path}-${result.title}`} to={result.path}>
                  <span>{result.type}</span>
                  <strong>{result.title}</strong>
                  {result.text && <small>{result.text}</small>}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {menuOpen && (
        <div className="menu-overlay" role="dialog" aria-modal="true" aria-label="Hauptmenü">
          <div className="wrap menu-top">
            <Link className="brand brand-light" to="/">
              <span className="brand-mark">KE</span>
              <span><strong>{site.name}</strong><small>Navigation</small></span>
            </Link>
            <button className="icon-button" type="button" onClick={() => setMenuOpen(false)} aria-label="Menü schließen">
              <Icon name="close" />
            </button>
          </div>

          <div className="wrap menu-grid">
            <section className="menu-hero">
              <p className="eyebrow">Direkt</p>
              <h2>Was suchen Sie?</h2>
              <div className="menu-quick">
                <Link to="/notfall"><Icon name="alert" /> Notfall</Link>
                <Link to="/medizin-zentren#finder"><Icon name="search" /> Behandlungsfinder</Link>
                <Link to="/standorte"><Icon name="map" /> Standorte</Link>
                <Link to="/karriere-bildung"><Icon name="briefcase" /> Karriere</Link>
              </div>
            </section>
            <nav className="mega-groups" aria-label="Alle Bereiche">
              {menuGroups.map((group) => (
                <div key={group.title}>
                  <h3>{group.title}</h3>
                  {group.links.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}
                </div>
              ))}
            </nav>
            <aside className="menu-contact">
              <p className="rail-kicker">Kontakt</p>
              <strong>Notruf {site.emergencyPhone}</strong>
              <strong>Zentrale {site.phone}</strong>
              <span>Bajuwarenstraße 5 · 85435 Erding</span>
              <span>Erdinger Str. 17 · 84405 Dorfen</span>
            </aside>
          </div>
        </div>
      )}

      <main id="main" ref={mainRef} tabIndex="-1">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="wrap footer-grid">
          <section>
            <h2>{site.name}</h2>
            <p>{site.description}</p>
            <p className="mono">{site.organizationForm}</p>
            <p className="mono">Bajuwarenstraße 5 · 85435 Erding · {site.phone}</p>
          </section>
          <nav aria-label="Footer Navigation">
            <h3>Bereiche</h3>
            {site.primaryNav.slice(0, 7).map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}
          </nav>
          <nav aria-label="Rechtliches">
            <h3>Rechtliches</h3>
            {site.legalNav.map(([label, to]) => <Link key={to} to={to}>{label}</Link>)}
          </nav>
        </div>
      </footer>
    </div>
  );
}
