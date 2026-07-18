import { Link, Navigate, useParams } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import { Callout, Checklist, RailCard, Section } from "../components/ContentBlocks.jsx";
import { bySlug, centers, medicalUnits } from "../content/siteContent.js";
import { JsonLd, usePageMeta } from "../lib/meta.js";

export default function MedicalUnitPage({ type }) {
  const { slug } = useParams();
  const collection = type === "center" ? centers : medicalUnits;
  const item = bySlug(collection, slug);
  const path = item
    ? `/medizin-zentren/${type === "center" ? "zentren" : "fachabteilungen"}/${item.slug}`
    : "/medizin-zentren";
  usePageMeta({
    title: item?.title || "Medizin & Zentren",
    description: item?.teaser || "Fachabteilungen und Zentren des Klinikums Landkreis Erding.",
    path,
  });

  if (!item) return <Navigate to="/medizin-zentren" replace />;

  return (
    <>
      {type !== "center" && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "MedicalDepartment",
            name: item.title,
            description: item.teaser,
            telephone: item.contact?.phone,
            parentOrganization: { "@type": "Hospital", name: "Klinikum Landkreis Erding" },
          }}
        />
      )}
      <PageHero
        eyebrow={type === "center" ? "Zentrum" : "Fachabteilung"}
        title={item.title}
        intro={item.teaser}
        tone={item.tone}
        breadcrumbs={[{ label: "Medizin & Zentren", to: "/medizin-zentren" }, { label: item.title }]}
      />

      <Section eyebrow="Profil" title="Orientierung für Patientinnen, Patienten und Zuweisende">
        <div className="content-grid">
          <RailCard eyebrow="Anliegen" title="Wann diese Seite hilft" text="Diese Angaben dienen der Orientierung und ersetzen keine medizinische Beratung.">
            <Checklist items={item.reasons?.length ? item.reasons : ["Offiziell gelisteter medizinischer Bereich", "Kontakt über die Zentrale oder nach ärztlicher Zuweisung"]} />
          </RailCard>
          <RailCard eyebrow={item.contact?.label || "Kontakt"} title={item.contact?.phone || "Zentrale"} text={item.contact?.email || "Für Termine, Sprechstunden und organisatorische Fragen bitte den offiziellen Kontaktweg nutzen."} href={item.contact?.href} />
        </div>
      </Section>

      {item.services?.length ? (
        <Section eyebrow="Leistungsspektrum" title="Schwerpunkte dieser Seite">
          <div className="slot-grid">
            {item.services.map((service) => (
              <article className="slot-card" key={service}>
                <h3>{service}</h3>
                <p>Teil des medizinischen Profils dieses Bereichs.</p>
              </article>
            ))}
          </div>
        </Section>
      ) : null}

      <Section eyebrow="Unterlagen" title="Vor Kontakt oder Termin">
        <div className="content-grid">
          <Callout title="Mitbringen" text="Für planbare Kontakte helfen vollständige Unterlagen und aktuelle medizinische Informationen.">
            <Checklist items={["Versichertenkarte", "Überweisung oder Einweisung, falls vorhanden", "Aktuelle Befunde", "Medikamentenplan"]} />
          </Callout>
          <Callout title="Sprechstunden und Team" text="Aktuelle Team- und Sprechstundenangaben bitte direkt über den offiziellen Kontaktweg klären." />
        </div>
      </Section>

      {item.outpatient?.length ? (
        <Section eyebrow="Ambulanz" title="Sprechstunden">
          <div className="board">
            {item.outpatient.map((line) => (
              <div className="board-row" key={line}>
                <b>{line}</b>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {item.relatedCenters?.length ? (
        <Section eyebrow="Verwandte Zentren" title="Interdisziplinäre Verknüpfungen">
          <div className="tag-row">
            {item.relatedCenters.map((centerSlug) => {
              const center = bySlug(centers, centerSlug);
              return center ? <Link key={center.slug} to={`/medizin-zentren/zentren/${center.slug}`}>{center.title}</Link> : null;
            })}
          </div>
        </Section>
      ) : null}
    </>
  );
}
