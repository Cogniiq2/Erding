import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import { Callout, LinkList, RailCard, Section } from "../components/ContentBlocks.jsx";
import { centers, medicalUnits, treatmentTopics } from "../content/siteContent.js";
import { usePageMeta } from "../lib/meta.js";

export default function MedicalIndexPage() {
  const [query, setQuery] = useState("");
  const [scope, setScope] = useState("alle");

  usePageMeta({
    title: "Medizin & Zentren",
    description: "Fachabteilungen, Zentren und Behandlungsfinder des Klinikums Landkreis Erding.",
    path: "/medizin-zentren",
  });

  const units = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return medicalUnits.filter((unit) => {
      const matchesScope = scope === "alle" || unit.locationScope.toLowerCase().includes(scope);
      const haystack = `${unit.title} ${unit.teaser} ${unit.reasons.join(" ")} ${unit.services.join(" ")}`.toLowerCase();
      return matchesScope && (!normalized || haystack.includes(normalized));
    });
  }, [query, scope]);

  return (
    <>
      <PageHero
        eyebrow="Medizin & Zentren"
        title="Der medizinische Wegweiser."
        intro="Fachabteilungen, Zentren und Beschwerdebild-Navigation in einer klaren, datengetriebenen Struktur."
        breadcrumbs={[{ label: "Medizin & Zentren" }]}
      />

      <Section id="finder" eyebrow="Behandlungsfinder" title="Über Anliegen zum richtigen Bereich">
        <Callout title="Wichtig" text="Der Finder unterstützt Orientierung anhand offiziell geführter Beschwerdebild-Mappings. Er stellt keine Diagnose und ersetzt keine ärztliche Beratung." />
        <div className="finder-matrix">
          {treatmentTopics.map((topic) => (
            <article key={topic.area}>
              <h3>{topic.area}</h3>
              {topic.concerns.map((concern) => (
                <div key={concern.label} className="concern-row">
                  <strong>{concern.label}</strong>
                  <div className="tag-row">
                    {concern.targets.map((slug) => {
                      const unit = medicalUnits.find((entry) => entry.slug === slug);
                      return unit ? <Link key={slug} to={`/medizin-zentren/fachabteilungen/${unit.slug}`}>{unit.title}</Link> : null;
                    })}
                  </div>
                </div>
              ))}
            </article>
          ))}
        </div>
      </Section>

      <Section eyebrow="Suche & Filter" title="Fachabteilungen schnell eingrenzen">
        <div className="directory-controls">
          <label>
            <span>Suchbegriff</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="z. B. Herz, Geburt, Schmerz" />
          </label>
          <label>
            <span>Standort</span>
            <select value={scope} onChange={(event) => setScope(event.target.value)}>
              <option value="alle">Alle Standorte</option>
              <option value="erding">Erding</option>
              <option value="dorfen">Dorfen</option>
            </select>
          </label>
        </div>
        {units.length ? (
          <LinkList items={units} basePath="/medizin-zentren/fachabteilungen" />
        ) : (
          <Callout title="Keine Treffer" text="Bitte Suchbegriff ändern oder über die Zentrale den passenden Bereich erfragen." />
        )}
      </Section>

      <Section eyebrow="Zentren" title="Spezialisierte Einrichtungen">
        <div className="center-list">
          {centers.map((center) => (
            <RailCard key={center.slug} eyebrow="Zentrum" title={center.title} text={center.teaser} to={`/medizin-zentren/zentren/${center.slug}`} />
          ))}
        </div>
      </Section>
    </>
  );
}
