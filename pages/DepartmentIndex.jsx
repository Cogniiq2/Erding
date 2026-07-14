import { useMemo, useState } from "react";
import { departments } from "../content/departments.js";
import { finderMap, findDepartments } from "../content/finder.js";
import DeptScanner from "../components/DeptScanner.jsx";
import { Icon } from "../components/Icons.jsx";
import PageHero from "../components/PageHero.jsx";
import Reveal from "../components/Reveal.jsx";

const regions = [
  ["head", "Kopf / Hals"],
  ["chest", "Brust / Herz / Lunge"],
  ["abdomen", "Bauch / Unterleib"],
  ["arms", "Schulter / Hand"],
  ["back", "Wirbelsäule"],
  ["legs", "Hüfte / Knie / Fuß"],
];

export default function DepartmentIndex() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim() && !region) return departments;
    const slugs = findDepartments(query, region);
    return departments.filter((department) => slugs.includes(department.slug));
  }, [query, region]);

  return (
    <>
      <PageHero
        kicker="Behandlungsangebot"
        title="Abteilungen finden, ohne die Orientierung zu verlieren"
        lead="Der Abteilungsfinder verbindet Suche, Körperregion und eine scannerartige Ergebnisliste. Er funktioniert vollständig per Tastatur."
        current="Behandlungsangebot"
        index="01"
      />
      <section className="site-section">
        <div className="wrap finder-grid">
          <Reveal className="finder-panel">
            <label className="finder-search">
              <span>Wo haben Sie Beschwerden?</span>
              <span className="finder-input">
                <Icon name="search" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  list="symptoms"
                  placeholder="z. B. Bauch, Herz, Schulter"
                  aria-describedby="finder-status"
                />
              </span>
            </label>
            <datalist id="symptoms">
              {finderMap.map((item) => (
                <option value={item.term} key={item.term} />
              ))}
            </datalist>
            <div className="body-map" aria-label="Körperregion wählen">
              <svg viewBox="0 0 180 420" aria-hidden="true">
                <path d="M90 24c24 0 38 15 38 39 0 19-11 34-28 39v33h39c22 0 38 16 38 38v73h-35v148h-35V260H73v134H38V246H3v-73c0-22 16-38 38-38h39v-33c-17-5-28-20-28-39 0-24 14-39 38-39z" />
                <path d="M58 172h64M62 218h56M73 260h34" />
              </svg>
              {regions.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  className={`region region-${id} ${region === id ? "on" : ""}`}
                  onClick={() => setRegion(region === id ? "" : id)}
                >
                  {label}
                </button>
              ))}
            </div>
          </Reveal>
          <div>
            <div id="finder-status" className="finder-status" aria-live="polite">
              {filtered.length} passende Abteilungen
            </div>
            <DeptScanner departments={filtered} />
          </div>
        </div>
      </section>
    </>
  );
}
