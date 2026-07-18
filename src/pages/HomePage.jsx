import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Callout, Checklist, EditorialSplit, FactGrid, RailCard, Section, Timeline } from "../components/ContentBlocks.jsx";
import { JsonLd, usePageMeta } from "../lib/meta.js";
import {
  careerTopics,
  centers,
  events,
  locations,
  medicalUnits,
  news,
  nursingTopics,
  patientServices,
  site,
  treatmentTopics,
  verifiedFacts,
} from "../content/siteContent.js";

const SignatureHelix = lazy(() => import("../components/SignatureHelix.jsx"));

const storyActs = [
  {
    eyebrow: "Klinikum Landkreis Erding · Erding & Dorfen",
    title: "Medizin, die bei Ihnen bleibt.",
    text: "Ein kommunales Klinikum mit akademischem Anspruch, zwei Standorten und klaren Wegen für Menschen, die schnelle Orientierung brauchen.",
  },
  {
    eyebrow: "Universitätsnah",
    title: "Wissen, das dort ankommt, wo Sie leben.",
    text: "Als akademisches Lehrkrankenhaus der TU München verbindet das Klinikum regionale Versorgung mit medizinischer Entwicklung.",
  },
  {
    eyebrow: "Notfall und Vertrauen",
    title: "Jede Behandlung beginnt mit ruhiger Klarheit.",
    text: "Im Notfall zählt Eindeutigkeit: 112 bei Lebensgefahr, Notaufnahme bei akuten schweren Beschwerden, Zentrale für nicht dringende Anliegen.",
  },
  {
    eyebrow: "Geburt und neue Lebensphasen",
    title: "Wo neues Leben beginnt, braucht Medizin Wärme und Präzision.",
    text: "Die Frauenklinik erhält eine eigene, ruhigere Erlebniswelt innerhalb derselben klinischen Designsprache.",
  },
  {
    eyebrow: "Ein Klinikum",
    title: "Erding und Dorfen, verbunden in einem System.",
    text: "330 stationäre Betten, 12 ambulante Plätze in der Schmerztagesklinik und über 1000 Beschäftigte bilden die verlässliche Basis.",
  },
];

function useStoryAct(ref) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let raf = 0;
    let last = -1;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const el = ref.current;
      if (!el) return;
      const total = Math.max(1, el.offsetHeight - window.innerHeight);
      const rect = el.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / total, 0), 1);
      const cuts = [0, 0.28, 0.5, 0.72, 0.9];
      let next = 0;
      cuts.forEach((cut, index) => {
        if (progress >= cut) next = index;
      });
      if (next !== last) {
        last = next;
        setActive(next);
      }
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [ref]);

  return active;
}

export default function HomePage() {
  const storyRef = useRef(null);
  const activeAct = useStoryAct(storyRef);

  usePageMeta({
    title: site.name,
    description:
      "Klinikum Landkreis Erding: Krankenhaus Erding und Klinik Dorfen mit Notfallzugang, Medizin, Pflege, Karriere und Patientenservices.",
    path: "/",
  });

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Hospital",
          name: site.name,
          telephone: site.phone,
          slogan: site.claim,
          legalName: site.organizationForm,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Bajuwarenstraße 5",
            postalCode: "85435",
            addressLocality: "Erding",
            addressCountry: "DE",
          },
        }}
      />

      <section className="home-story" ref={storyRef} aria-labelledby="home-title">
        <div className="home-stage">
          <Suspense fallback={<div className="signature-helix signature-loading" aria-hidden="true" />}>
            <SignatureHelix />
          </Suspense>
          <div className="story-vignette" aria-hidden="true" />
          <div className="wrap story-copy">
            {storyActs.map((act, index) => (
              <article key={act.title} className={`story-act ${activeAct === index ? "is-active" : ""}`}>
                <p className="eyebrow">{act.eyebrow}</p>
                {index === 0 ? <h1 id="home-title">{act.title}</h1> : <h2>{act.title}</h2>}
                <p>{act.text}</p>
                {index === 0 && (
                  <div className="hero-actions">
                    <Link className="button primary" to="/notfall">Im Notfall</Link>
                    <Link className="button" to="/medizin-zentren">Abteilung finden</Link>
                    <Link className="button ghost" to="/patienten-besucher/patientenportal-digitale-services">Patientenportal</Link>
                  </div>
                )}
              </article>
            ))}
          </div>
          <div className="story-dots" aria-hidden="true">
            {storyActs.map((act, index) => <span key={act.title} className={activeAct === index ? "is-active" : ""} />)}
          </div>
        </div>
      </section>

      <Section className="emergency-strip" eyebrow="Direktzugang" title="Wenn es dringend ist, zählt ein klarer Weg.">
        <div className="emergency-grid">
          <Callout tone="emergency" title="Lebensbedrohlicher Notfall" text="Bei akuter Lebensgefahr sofort den Notruf wählen.">
            <a className="button primary" href={site.emergencyHref}>112 anrufen</a>
          </Callout>
          <Callout title="Notaufnahme" text="Informationen zur Ankunft, Ersteinschätzung, Wartebereich und Behandlung.">
            <Link className="button" to="/notfall">Notfallbereich öffnen</Link>
          </Callout>
          <Callout title="Nicht dringende Anliegen" text="Für organisatorische Fragen, Termine und Orientierung hilft die Zentrale weiter.">
            <a className="button" href={site.phoneHref}>{site.phone}</a>
          </Callout>
        </div>
      </Section>

      <Section eyebrow="Profil" title="Medizinische Autorität mit regionaler Glaubwürdigkeit">
        <EditorialSplit
          title="Ein Klinikum für den Landkreis, nicht für eine abstrakte Zielgruppe."
          text="Die Website stellt praktische Wege, fachliche Tiefe und institutionelle Verantwortung nach vorne. Design und Sprache bleiben ruhig, präzise und menschlich."
          aside={<FactGrid facts={verifiedFacts} />}
        />
      </Section>

      <Section eyebrow="Standorte" title="Zwei Orte, ein Versorgungssystem">
        <div className="location-compare">
          {locations.map((location) => (
            <article key={location.slug}>
              <p className="rail-kicker">{location.eyebrow}</p>
              <h3>{location.title}</h3>
              <p>{location.description}</p>
              <address>{location.address}</address>
              <Link className="text-link" to={`/standorte/${location.slug}`}>Standort ansehen</Link>
            </article>
          ))}
        </div>
      </Section>

      <Section id="finder" eyebrow="Behandlungsfinder" title="Wenn der Fachbegriff fehlt, führt der Weg über Anliegen.">
        <HomeFinder />
      </Section>

      <Section eyebrow="Patientenwege" title="Vor, während und nach dem Aufenthalt">
        <div className="pathway-grid">
          {patientServices.slice(0, 6).map((service) => (
            <RailCard key={service.slug} eyebrow="Service" title={service.title} text={service.teaser} to={`/patienten-besucher/${service.slug}`} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Medizin & Zentren" title="Fachbereiche, Zentren und Schwerpunkte schnell erfassen">
        <div className="split-list">
          <div>
            <h3>Fachabteilungen</h3>
            {medicalUnits.slice(0, 9).map((unit) => (
              <Link key={unit.slug} to={`/medizin-zentren/fachabteilungen/${unit.slug}`}>{unit.title}</Link>
            ))}
          </div>
          <div>
            <h3>Zentren</h3>
            {centers.slice(0, 9).map((center) => (
              <Link key={center.slug} to={`/medizin-zentren/zentren/${center.slug}`}>{center.title}</Link>
            ))}
          </div>
        </div>
      </Section>

      <Section className="ink-band" eyebrow="Innovation" title="Medizinische Entwicklung sichtbar, aber faktentreu">
        <div className="innovation-row">
          <RailCard tone="gold" eyebrow="Robotik" title="Dexter und neue OP-Verfahren" text="Als Innovationsfläche vorbereitet; Veröffentlichung erst mit aktueller offizieller Freigabe." to="/digitalisierung" />
          <RailCard tone="gold" eyebrow="Digital" title="Patientenportal" text="Digitale Services werden als eigener Weg geführt, ohne noch nicht produktive Funktionen vorzutäuschen." to="/patienten-besucher/patientenportal-digitale-services" />
          <RailCard tone="gold" eyebrow="Planung" title="Kinderklinik" text="Die Kinderklinik bleibt als redaktionell zu bestätigendes Zukunftsthema markiert." to="/aktuelles" />
        </div>
      </Section>

      <Section eyebrow="Qualität" title="Vertrauen entsteht aus Nachweisen, Struktur und Ansprechbarkeit">
        <div className="quality-band">
          <div>
            <h3>Zentren und Zertifizierungen</h3>
            <p>Die offiziellen Zentren werden als prüfbare Struktur sichtbar gemacht. Einzelne Nachweise, Laufzeiten und Zertifikatsdokumente brauchen finale Freigabe.</p>
            <Link className="button" to="/zertifizierungen">Zertifizierungen ansehen</Link>
          </div>
          <div>
            <h3>Akademisches Lehrkrankenhaus</h3>
            <p>Die TUM-Anbindung ist ein zentraler Vertrauensanker und wird auf Startseite, Klinikum-Profil und Karrierebereich wiederholt eingebunden.</p>
            <Link className="button" to="/klinikum">Profil öffnen</Link>
          </div>
        </div>
      </Section>

      <Section eyebrow="Digitale Services" title="Digitaler Zugang mit ehrlichen Grenzen">
        <EditorialSplit
          title="Ein Patient:innenportal darf kein Scheinformular sein."
          text="Der digitale Bereich beschreibt Orientierung, Support und Datenschutzanforderungen, bis konkrete Portal-Funktionen und Backendprozesse freigegeben sind."
          aside={<Checklist items={["Kein medizinischer Notfall per Formular", "Klare Telefonwege", "Datenschutzfreigabe vor Aktivierung"]} />}
        >
          <Link className="button" to="/digitalisierung">Digitalisierung ansehen</Link>
        </EditorialSplit>
      </Section>

      <Section eyebrow="Aktuelles & Termine" title="Nachrichten und Veranstaltungen nur mit sauberer Freigabe">
        <div className="card-grid two">
          <RailCard eyebrow={news[0].category} title={news[0].title} text={news[0].teaser} to="/aktuelles" />
          <RailCard eyebrow={events[0].category} title={events[0].title} text={events[0].teaser} to="/veranstaltungen" />
        </div>
      </Section>

      <Section className="birth-band" eyebrow="Geburt & Familie" title="Eine wärmere Welt innerhalb derselben klinischen Identität">
        <div className="birth-layout">
          <div>
            <h3>Gynäkologie und Geburtshilfe</h3>
            <p>Geburtsplanung, Sprechstunden, Kurse, Babysprechstunde und Brustzentrum erhalten eine eigene Informationsarchitektur ohne klischeehafte Farbwelt.</p>
            <Link className="button primary" to="/medizin-zentren/fachabteilungen/gynaekologie-geburtshilfe">Frauenklinik öffnen</Link>
          </div>
          <Timeline items={["Geburtsplanung vorbereiten", "Infoabend oder Kurs prüfen", "Aufnahme und Kreißsaalweg klären", "Nachsorge und Babysprechstunde finden"]} />
        </div>
      </Section>

      <Section eyebrow="Pflege" title="Pflege als eigenständige Exzellenz, nicht als Unterpunkt">
        <div className="pathway-grid">
          {nursingTopics.slice(0, 4).map((topic) => (
            <RailCard key={topic.slug} eyebrow="Pflege" title={topic.title} text={topic.teaser} to={`/pflege/${topic.slug}`} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Karriere & Bildung" title="Einer der großen Arbeitgeber der Region braucht eine klare Karrierewelt">
        <div className="career-panel">
          <div>
            <h3>Jobs, Ausbildung, Praktikum und Entwicklung</h3>
            <p>Freie Stellen werden nicht erfunden. Die Seite führt zum offiziellen Karriereportal und strukturiert Berufswege im Klinikum.</p>
          </div>
          <div className="tag-row">
            {careerTopics.slice(0, 6).map((topic) => (
              topic.externalHref ? <a key={topic.slug} href={topic.externalHref} rel="noreferrer" target="_blank">{topic.title}</a> : <Link key={topic.slug} to={`/karriere-bildung/${topic.slug}`}>{topic.title}</Link>
            ))}
          </div>
        </div>
      </Section>

      <Section eyebrow="Anfahrt" title="Ankommen, ohne lange suchen zu müssen">
        <div className="location-compare">
          {locations.map((location) => (
            <article key={location.slug}>
              <h3>{location.title}</h3>
              <address>{location.address}</address>
              <Checklist items={location.arrival.slice(0, 2)} />
              <Link className="text-link" to="/kontakt-anfahrt">Kontakt & Anfahrt</Link>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}

function HomeFinder() {
  const [area, setArea] = useState(treatmentTopics[0].area);
  const selected = treatmentTopics.find((topic) => topic.area === area) || treatmentTopics[0];
  const targetMap = Object.fromEntries(medicalUnits.map((unit) => [unit.slug, unit]));

  return (
    <div className="finder-panel">
      <div className="segmented" role="tablist" aria-label="Körperregion auswählen">
        {treatmentTopics.map((topic) => (
          <button
            type="button"
            key={topic.area}
            className={topic.area === area ? "is-active" : ""}
            onClick={() => setArea(topic.area)}
          >
            {topic.area}
          </button>
        ))}
      </div>
      <div className="finder-results" aria-live="polite">
        {selected.concerns.map((concern) => (
          <article key={concern.label}>
            <h3>{concern.label}</h3>
            <p>Navigation nach offiziell geführtem Beschwerdebild. Keine Diagnose und keine Therapieempfehlung.</p>
            <div className="tag-row">
              {concern.targets.map((slug) => {
                const unit = targetMap[slug];
                return unit ? <Link key={slug} to={`/medizin-zentren/fachabteilungen/${unit.slug}`}>{unit.title}</Link> : null;
              })}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
