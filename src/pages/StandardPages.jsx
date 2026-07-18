import { Link, Navigate, useParams } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import { Callout, Checklist, EditorialSplit, FactGrid, LinkList, RailCard, Section, Timeline } from "../components/ContentBlocks.jsx";
import {
  aboutTopics,
  bySlug,
  careerTopics,
  centers,
  emergencyTopics,
  events,
  imageSlots,
  legalPages,
  locations,
  news,
  nursingTopics,
  patientServices,
  site,
  verifiedFacts,
} from "../content/siteContent.js";
import { JsonLd, usePageMeta } from "../lib/meta.js";

export function NewsPage() {
  usePageMeta({ title: "Aktuelles", description: "Aktuelles, Meldungen und medizinische Entwicklungen des Klinikums Landkreis Erding.", path: "/aktuelles" });
  return (
    <>
      <PageHero eyebrow="Aktuelles" title="Offizielle Meldungen aus dem Klinikum." intro="Nachrichten, medizinische Entwicklungen und Hinweise aus den offiziellen Veröffentlichungen des Klinikums." breadcrumbs={[{ label: "Aktuelles" }]} />
      <Section eyebrow="Nachrichten" title="Aktuelle Meldungen">
        <div className="news-stream">
          {news.map((item) => (
            <article key={item.slug}>
              <time>{item.date}</time>
              <div>
                <p className="rail-kicker">{item.category}</p>
                <h3>{item.title}</h3>
                <p>{item.teaser}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>
      <Section eyebrow="Themen" title="Aktuelle medizinische Entwicklung ohne Spekulation">
        <div className="innovation-row">
          <RailCard eyebrow="Medizin" title={news[1].title} text={news[1].teaser} to="/digitalisierung" />
          <RailCard eyebrow="Digital" title={news[3].title} text={news[3].teaser} to="/patienten-besucher/patientenportal-digitale-services" />
          <RailCard eyebrow="Familie" title={news[0].title} text={news[0].teaser} to="/veranstaltungen" />
        </div>
      </Section>
    </>
  );
}

export function EventsPage() {
  usePageMeta({ title: "Veranstaltungen", description: "Kurse, Infoabende und Veranstaltungen des Klinikums Landkreis Erding.", path: "/veranstaltungen" });
  return (
    <>
      <PageHero eyebrow="Veranstaltungen" title="Termine, die Orientierung geben." intro="Kurse, Infoabende, Karriereformate und medizinische Veranstaltungen aus dem offiziellen Kalender." breadcrumbs={[{ label: "Veranstaltungen" }]} />
      <Section eyebrow="Kalender" title="Veranstaltungsformate">
        <div className="event-board">
          {events.map((item) => (
            <article key={item.slug}>
              <time>{item.date}</time>
              <h3>{item.title}</h3>
              <p>{item.teaser}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section eyebrow="Geburt & Familie" title="Kurse und Infoabende als eigener Zugang">
        <EditorialSplit
          title="Werdende Eltern brauchen medizinische Klarheit und ruhige Wege."
          text="Geburtsplanung, Informationsabende, Kurse und Babysprechstunde sind im Familienbereich schnell erreichbar."
          aside={<Checklist items={["Termin und Ort", "Anmeldung", "Barriereinformation", "Kontakt bei Rückfragen"]} />}
        />
      </Section>
    </>
  );
}

export function PatientsPage() {
  usePageMeta({ title: "Patienten & Besucher", description: "Aufenthalt, Aufnahme, Besuch, Entlassung und Services am Klinikum Landkreis Erding.", path: "/patienten-besucher" });
  return (
    <>
      <PageHero eyebrow="Patienten & Besucher" title="Praktische Antworten zuerst." intro="Der Bereich beantwortet: Wo muss ich hin, was brauche ich, wer hilft, und was gilt für Erding oder Dorfen?" breadcrumbs={[{ label: "Patienten & Besucher" }]} />
      <Section eyebrow="Schnell klären" title="Vier häufige Situationen">
        <div className="question-grid">
          <Callout title="Ich komme zur Aufnahme" text="Unterlagen bereitlegen, Standort prüfen und vor Ort dem ausgeschilderten Weg folgen." />
          <Callout title="Ich besuche jemanden" text="Besuchszeiten und Hygieneregeln gelten standortübergreifend." />
          <Callout title="Ich werde entlassen" text="Anschlussversorgung und Unterlagen frühzeitig ansprechen." />
          <Callout title="Ich suche digitale Services" text="Das Patientenportal wird als eigener digitaler Einstieg geführt." />
        </div>
      </Section>
      <Section eyebrow="Services" title="Patientenwege und Besucherinformationen">
        <LinkList items={patientServices} basePath="/patienten-besucher" />
      </Section>
      <Section eyebrow="Besuchszeiten" title="Erding und Dorfen">
        <Callout title="Täglich 13:30 bis 18:30 Uhr" text="Besuche sind laut offizieller Besuchszeiten-Seite in Erding und Dorfen in diesem Zeitraum möglich. Ambulanzen nur nach vorheriger Terminvereinbarung betreten." />
      </Section>
    </>
  );
}

export function PatientServicePage() {
  const { slug } = useParams();
  const service = bySlug(patientServices, slug);
  usePageMeta({
    title: service?.title || "Patienten & Besucher",
    description: service?.teaser || "Patientenservices am Klinikum Landkreis Erding.",
    path: service ? `/patienten-besucher/${service.slug}` : "/patienten-besucher",
  });
  if (!service) return <Navigate to="/patienten-besucher" replace />;
  return (
    <>
      <PageHero eyebrow="Patientenservice" title={service.title} intro={service.teaser} breadcrumbs={[{ label: "Patienten & Besucher", to: "/patienten-besucher" }, { label: service.title }]} />
      <Section eyebrow="Ablauf" title="Schritt für Schritt">
        <Timeline items={service.pathway} />
      </Section>
      <Section eyebrow="Unterlagen" title="Was hilft">
        <Checklist items={service.checklist} />
      </Section>
      <Section eyebrow="Kontakt" title="Wenn etwas unklar bleibt">
        <Callout title="Zentrale" text={`${site.phone} · Bitte Standort und Anliegen bereithalten.`}>
          <a className="button" href={site.phoneHref}>{site.phone}</a>
        </Callout>
      </Section>
    </>
  );
}

export function EmergencyPage() {
  usePageMeta({ title: "Notfall", description: "Notfallorientierung, 112, Notaufnahme, Ankunft, Triage und Behandlung am Klinikum Landkreis Erding.", path: "/notfall" });
  return (
    <>
      <PageHero eyebrow="Notfall" title="Ruhig handeln. Richtig ankommen." intro="Lebensbedrohliche Notfälle laufen immer über 112. Der Klinikbereich erklärt die Notaufnahme als Serviceweg, nicht als Diagnoseangebot." tone="emergency" breadcrumbs={[{ label: "Notfall" }]} />
      <Section className="emergency-strip" eyebrow="Sofort" title="Die drei Wege unterscheiden">
        <div className="emergency-grid">
          <Callout tone="emergency" title="Lebensgefahr" text="Sofort 112 wählen. Nicht per E-Mail oder Formular versuchen.">
            <a className="button primary" href={site.emergencyHref}>112 anrufen</a>
          </Callout>
          <Callout title="Akute schwere Beschwerden" text="Informationen zur Notaufnahme, Ankunft und Ersteinschätzung lesen." />
          <Callout title="Nicht dringende Anliegen" text={`Zentrale ${site.phone} kontaktieren oder passende Fachabteilung suchen.`} />
        </div>
      </Section>
      <Section eyebrow="Notaufnahme" title="Der Weg durch die Notaufnahme">
        <Timeline items={["Ankunft und Anmeldung", "Ersteinschätzung nach Dringlichkeit", "Warten oder direkte Behandlung", "Diagnostik und Therapie", "Entlassung, Aufnahme oder Weiterleitung"]} />
      </Section>
      <Section eyebrow="Unterseiten" title="Notfallreise im Detail">
        <LinkList items={emergencyTopics} basePath="/notfall" />
      </Section>
    </>
  );
}

export function EmergencyTopicPage() {
  const { slug } = useParams();
  const topic = bySlug(emergencyTopics, slug);
  usePageMeta({
    title: topic?.title || "Notfall",
    description: topic?.teaser || "Notfallorientierung am Klinikum Landkreis Erding.",
    path: topic ? `/notfall/${topic.slug}` : "/notfall",
  });
  if (!topic) return <Navigate to="/notfall" replace />;
  return (
    <>
      <PageHero eyebrow="Notfall" title={topic.title} intro={topic.teaser} tone="emergency" breadcrumbs={[{ label: "Notfall", to: "/notfall" }, { label: topic.title }]} />
      <Section eyebrow="Ablauf" title="Was passiert">
        <Timeline items={topic.steps} />
      </Section>
      <Section eyebrow="Medizinische Verantwortung" title="Keine Diagnose im Online-Angebot">
        <Callout tone="emergency" title="Bei Lebensgefahr 112" text="Diese Seite gibt Orientierung zum Weg in die Versorgung. Persönliche medizinische Fragen gehören in ärztliche Hände." />
      </Section>
    </>
  );
}

export function NursingPage() {
  usePageMeta({ title: "Pflege", description: "Pflege, Pflegeleitbild, Direktion, Teams und Entwicklung am Klinikum Landkreis Erding.", path: "/pflege" });
  return (
    <>
      <PageHero eyebrow="Pflege" title="Pflege ist klinische Exzellenz." intro="Der Bereich stellt Pflege nicht als Serviceanhang dar, sondern als eigene professionelle Säule." breadcrumbs={[{ label: "Pflege" }]} />
      <Section eyebrow="Pflegebereiche" title="Profession, Leitung und Entwicklung">
        <div className="pathway-grid">
          {nursingTopics.map((topic) => (
            <RailCard key={topic.slug} eyebrow="Pflege" title={topic.title} text={topic.teaser} to={`/pflege/${topic.slug}`} />
          ))}
        </div>
      </Section>
      <Section className="ink-band" eyebrow="Ausbildung" title="Pflege entwickelt Nachwuchs und Qualität">
        <EditorialSplit title="Praxisanleitung, Fortbildung und Karrierewege gehören sichtbar zusammen." text="Pflegeinformationen werden mit Karriere und Bildung verknüpft, damit Bewerbende die fachliche Entwicklung nachvollziehen können." aside={<Link className="button" to="/karriere-bildung">Karriere & Bildung</Link>} />
      </Section>
    </>
  );
}

export function NursingTopicPage() {
  const { slug } = useParams();
  const topic = bySlug(nursingTopics, slug);
  usePageMeta({
    title: topic?.title || "Pflege",
    description: topic?.teaser || "Pflege am Klinikum Landkreis Erding.",
    path: topic ? `/pflege/${topic.slug}` : "/pflege",
  });
  if (!topic) return <Navigate to="/pflege" replace />;
  return (
    <>
      <PageHero eyebrow="Pflege" title={topic.title} intro={topic.teaser} breadcrumbs={[{ label: "Pflege", to: "/pflege" }, { label: topic.title }]} />
      <Section eyebrow="Pflegeprofil" title="Pflegealltag und Entwicklung">
        <div className="content-grid">
          <Callout title="Aufgaben" text="Rollen, Patientensituationen und Schnittstellen werden verständlich abgebildet." />
          <Callout title="Entwicklung" text="Ausbildung, Praxisanleitung und Weiterbildung werden je Bereich verknüpft." />
        </div>
      </Section>
    </>
  );
}

export function CareerPage() {
  usePageMeta({ title: "Karriere & Bildung", description: "Jobs, Ausbildung, Praktikum, PJ, Pflegekarriere und Weiterbildung am Klinikum Landkreis Erding.", path: "/karriere-bildung" });
  return (
    <>
      <PageHero eyebrow="Karriere & Bildung" title="Arbeiten, lernen, bleiben." intro="Ein Karrierebereich für einen großen regionalen Arbeitgeber, ohne erfundene Stellen oder leere Versprechen." tone="gold" breadcrumbs={[{ label: "Karriere & Bildung" }]} />
      <Section eyebrow="Einstiege" title="Berufswege im Klinikum">
        <div className="career-lanes">
          {careerTopics.map((topic) => (
            topic.externalHref ? (
              <a key={topic.slug} className="lane" href={topic.externalHref} target="_blank" rel="noreferrer">
                <span>Extern</span><strong>{topic.title}</strong><small>{topic.teaser}</small>
              </a>
            ) : (
              <Link key={topic.slug} className="lane" to={`/karriere-bildung/${topic.slug}`}>
                <span>Bereich</span><strong>{topic.title}</strong><small>{topic.teaser}</small>
              </Link>
            )
          ))}
        </div>
      </Section>
      <Section eyebrow="Region" title="Arbeiten im Landkreis Erding">
        <EditorialSplit title="Regionaler Arbeitgeber mit klinischer Vielfalt." text="Karrierekommunikation verbindet medizinische Verantwortung, Ausbildung, Alltag im Team und Lebensqualität in der Region." aside={<Checklist items={["Offizielles Karriereportal", "Externer Joblink", "Kontakt und Bewerbung über die genannten Wege"]} />} />
      </Section>
    </>
  );
}

export function CareerTopicPage() {
  const { slug } = useParams();
  const topic = bySlug(careerTopics, slug);
  usePageMeta({
    title: topic?.title || "Karriere & Bildung",
    description: topic?.teaser || "Karriere und Bildung am Klinikum Landkreis Erding.",
    path: topic ? `/karriere-bildung/${topic.slug}` : "/karriere-bildung",
  });
  if (!topic) return <Navigate to="/karriere-bildung" replace />;
  return (
    <>
      <PageHero eyebrow="Karriere & Bildung" title={topic.title} intro={topic.teaser} tone="gold" breadcrumbs={[{ label: "Karriere & Bildung", to: "/karriere-bildung" }, { label: topic.title }]} />
      <Section eyebrow="Orientierung" title="Was Bewerbende hier erwarten">
        <Checklist items={["Aufgaben und Einsatzbereiche", "Voraussetzungen", "Bewerbungsweg", "Kontakt und nächste Schritte"]} />
      </Section>
      <Section eyebrow="Aktuelle Stellen" title="Offizielles Karriereportal">
        <Callout title="Offizielles Karriereportal" text="Konkrete Stellenangebote werden aus dem offiziellen Karriereportal geöffnet.">
          <a className="button" href="https://karriere.klinikum-erding.de/" target="_blank" rel="noreferrer">Jobs öffnen</a>
        </Callout>
      </Section>
    </>
  );
}

export function KlinikumPage() {
  usePageMeta({ title: "Klinikum", description: "Profil, Auftrag, Qualität, Geschichte, Leitung und Digitalisierung des Klinikums Landkreis Erding.", path: "/klinikum" });
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Organization", name: site.name, legalName: site.organizationForm, telephone: site.phone }} />
      <PageHero eyebrow="Klinikum" title="Kommunal, akademisch, regional." intro={`${site.name} ist ${site.organizationForm} und akademisches Lehrkrankenhaus der TU München.`} breadcrumbs={[{ label: "Klinikum" }]} />
      <Section eyebrow="Profil" title="Verlässlichkeit in Zahlen">
        <FactGrid facts={verifiedFacts} />
      </Section>
      <Section eyebrow="Institution" title="Auftrag, Qualität und Entwicklung">
        <div className="pathway-grid">
          {aboutTopics.map((topic) => <RailCard key={topic.slug} eyebrow={topic.category} title={topic.title} text={topic.teaser} to={`/${topic.slug}`} />)}
        </div>
      </Section>
    </>
  );
}

export function LocationsPage() {
  usePageMeta({ title: "Standorte", description: "Klinikum Erding und Klinik Dorfen mit Adresse, Anfahrt und Standortprofil.", path: "/standorte" });
  return (
    <>
      <PageHero eyebrow="Standorte" title="Erding und Dorfen klar unterscheiden." intro="Standortseiten führen zu Adresse, Anfahrt, medizinischem Profil und praktischen Wegen." breadcrumbs={[{ label: "Standorte" }]} />
      <Section eyebrow="Übersicht" title="Die beiden Standorte">
        <div className="location-compare">
          {locations.map((location) => (
            <article key={location.slug}>
              <p className="rail-kicker">{location.eyebrow}</p>
              <h3>{location.title}</h3>
              <address>{location.address}</address>
              <p>{location.description}</p>
              <Link className="button" to={`/standorte/${location.slug}`}>Standort öffnen</Link>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}

export function LocationPage() {
  const { slug } = useParams();
  const location = bySlug(locations, slug);
  usePageMeta({
    title: location?.title || "Standorte",
    description: location?.description || "Standorte des Klinikums Landkreis Erding.",
    path: location ? `/standorte/${location.slug}` : "/standorte",
  });
  if (!location) return <Navigate to="/standorte" replace />;
  return (
    <>
      <PageHero eyebrow={location.eyebrow} title={location.title} intro={location.description} breadcrumbs={[{ label: "Standorte", to: "/standorte" }, { label: location.title }]} />
      <Section eyebrow="Adresse" title="Ankommen">
        <div className="content-grid">
          <Callout title={location.address} text={`Zentrale ${location.phone}`}>
            <a className="button" href={location.phoneHref}>{location.phone}</a>
          </Callout>
          <Checklist items={location.arrival} />
        </div>
      </Section>
      <Section eyebrow="Medizinisches Profil" title="Schwerpunkte am Standort">
        <div className="tag-row">
          {location.services.map((service) => <span key={service}>{service}</span>)}
        </div>
      </Section>
    </>
  );
}

export function ContactPage() {
  usePageMeta({ title: "Kontakt & Anfahrt", description: "Kontakt, Adresse, ÖPNV und Anfahrt zum Klinikum Landkreis Erding und zur Klinik Dorfen.", path: "/kontakt-anfahrt" });
  return (
    <>
      <PageHero eyebrow="Kontakt & Anfahrt" title="Der schnellste Weg zum richtigen Ort." intro="Adressen, ÖPNV, Autoanreise und Zentrale auf einen Blick." breadcrumbs={[{ label: "Kontakt & Anfahrt" }]} />
      <Section eyebrow="Kontakt" title="Zentrale und Adressen">
        <div className="location-compare">
          {locations.map((location) => (
            <article key={location.slug}>
              <h3>{location.title}</h3>
              <address>{location.address}</address>
              <p>{location.description}</p>
              <a className="button" href={location.phoneHref}>{location.phone}</a>
            </article>
          ))}
        </div>
      </Section>
      <Section eyebrow="Anfahrt Erding" title="ÖPNV und Auto">
        <Timeline items={locations[0].arrival} />
      </Section>
    </>
  );
}

export function DigitalPage() {
  usePageMeta({ title: "Digitalisierung", description: "Digitale Services, Patientenportal, Datenwege und verantwortliche Digitalisierung.", path: "/digitalisierung" });
  return (
    <>
      <PageHero eyebrow="Digitalisierung" title="Digital, wenn es wirklich hilft." intro="Digitale Services werden als sichere Wege konzipiert, nicht als dekorative Technikversprechen." breadcrumbs={[{ label: "Digitalisierung" }]} />
      <Section eyebrow="Prinzipien" title="Keine stillen Sackgassen">
        <EditorialSplit title="Ein digitaler Service braucht Prozess, Datenschutz und Support." text="Die Seite trennt digitale Services, Telefonwege und Notfallkommunikation klar voneinander. Medizinische Notfälle werden nicht digital kanalisiert." aside={<Checklist items={["Patientenportal als eigener Einstieg", "Schulter-Sprechstunde digital erreichbar", "Telefonische Alternativen sichtbar", "Keine Diagnosefunktion"]} />} />
      </Section>
      <Section eyebrow="Innovation" title="Robotik, Infrastruktur und Portalentwicklung">
        <div className="innovation-row">
          <Callout title="Robotik" text={news[1].teaser} />
          <Callout title="Patientenportal" text={news[3].teaser} />
          <Callout title="Medizinische Motion" text="Scan, Puls und Partikelfluss dienen Orientierung und Bedeutung, nicht Dekoration." />
        </div>
      </Section>
    </>
  );
}

export function QualityPage() {
  usePageMeta({ title: "Qualität", description: "Qualitätsmanagement, Zentren, Berichte und Vertrauen am Klinikum Landkreis Erding.", path: "/qualitaet" });
  return (
    <>
      <PageHero eyebrow="Qualität" title="Qualität braucht Nachweise und Ansprechpartner." intro="Der Qualitätsbereich bündelt Zentren, Berichte, Zertifizierungen und Patientenfürsprache." breadcrumbs={[{ label: "Qualität" }]} />
      <Section eyebrow="Nachweise" title="Vertrauenssignale">
        <div className="quality-band">
          <RailCard title="Zertifizierungen" text="Zentrums- und Zertifikatsinformationen werden als eigene Seite gepflegt." to="/zertifizierungen" />
          <RailCard title="Qualitätsberichte" text="Aktuelle Qualitätsberichte sind über den Dokumentenbereich erreichbar." to="/patienten-besucher/downloads-dokumente" />
          <RailCard title="Patientenfürsprache" text="Feedbackwege werden im Patientenbereich nachvollziehbar verlinkt." to="/patienten-besucher/feedback-patientenfuersprache" />
        </div>
      </Section>
    </>
  );
}

export function CertificatesPage() {
  usePageMeta({ title: "Zertifizierungen", description: "Zertifizierte Zentren und Spezialbereiche des Klinikums Landkreis Erding.", path: "/zertifizierungen" });
  return (
    <>
      <PageHero eyebrow="Zertifizierungen" title="Zentren und Nachweise ohne Übertreibung." intro="Offiziell gelistete Zentren und Zertifizierungen werden kompakt erreichbar gemacht." breadcrumbs={[{ label: "Zertifizierungen" }]} />
      <Section eyebrow="Zentren" title="Offiziell geführte spezialisierte Einrichtungen">
        <LinkList items={centers} basePath="/medizin-zentren/zentren" />
      </Section>
    </>
  );
}

export function LeadershipPage() {
  usePageMeta({ title: "Krankenhausleitung", description: "Leitung und Verantwortlichkeiten des Klinikums Landkreis Erding.", path: "/krankenhausleitung" });
  return (
    <>
      <PageHero eyebrow="Krankenhausleitung" title="Verantwortung sichtbar." intro="Die Leitungsseite nennt Direktion, ärztliche Leitung, Pflegeleitung und Kontakt zum Sekretariat." breadcrumbs={[{ label: "Krankenhausleitung" }]} />
      <Section eyebrow="Leitung" title="Verantwortlichkeiten und Kontaktwege">
        <div className="leadership-grid">
          {["Krankenhausdirektion", "Ärztliche Direktion", "Pflegedirektion", "Chefärztliche Leitungen", "Medizinproduktesicherheit", "Datenschutz"].map((role) => (
            <Callout key={role} title={role} text="Person, Zuständigkeit und Kontakt werden nach den offiziellen Angaben des Klinikums dargestellt." />
          ))}
        </div>
      </Section>
    </>
  );
}

export function MissionPage() {
  usePageMeta({ title: "Leitbild", description: "Leitbild, Auftrag und Haltung des Klinikums Landkreis Erding.", path: "/leitbild" });
  return (
    <>
      <PageHero eyebrow="Leitbild" title="Auftrag in klare Sprache übersetzen." intro="Das Leitbild bündelt Haltung, regionale Verantwortung, Medizin, Pflege und Ausbildung." breadcrumbs={[{ label: "Leitbild" }]} />
      <Section eyebrow="Prinzipien" title="Was der Online-Auftritt vermittelt">
        <Timeline items={["Medizinische Exzellenz mit regionaler Nähe", "Verlässliche kommunale Verantwortung", "Respektvolle Patienten- und Angehörigenkommunikation", "Pflege, Ausbildung und Medizin als gleichwertige Säulen"]} />
      </Section>
    </>
  );
}

export function HistoryPage() {
  usePageMeta({ title: "Geschichte", description: "Geschichte der Standorte Erding und Dorfen.", path: "/geschichte" });
  return (
    <>
      <PageHero eyebrow="Geschichte" title="Zwei Häuser mit regionaler Geschichte." intro="Die Seite erzählt Erding, Dorfen und den gemeinsamen Klinikverbund als regionale Entwicklung." breadcrumbs={[{ label: "Geschichte" }]} />
      <Section eyebrow="Zeitleiste" title="Historie der Standorte">
        <Timeline items={["Geschichte des Klinikums Erding", "Geschichte der Klinik Dorfen", "Entwicklung des gemeinsamen Klinikverbunds", "Aktuelle Ausbauplanung der Versorgung"]} />
      </Section>
    </>
  );
}

export function LegalPage({ kind }) {
  const page = legalPages[kind];
  usePageMeta({ title: page.title, description: page.teaser, path: `/${kind}` });
  return (
    <>
      <PageHero eyebrow="Rechtliches" title={page.title} intro={page.teaser} breadcrumbs={[{ label: page.title }]} />
      <Section eyebrow="Information" title="Angaben">
        <div className="legal-copy">
          {page.body.map((line) => <p key={line}>{line}</p>)}
        </div>
      </Section>
    </>
  );
}

export function AssetInventoryPage() {
  return (
    <Section eyebrow="Bildwelt" title="Benötigte offizielle Motive">
      <div className="slot-grid">
        {imageSlots.map((slot) => (
          <article className="slot-card" key={slot.id}>
            <h3>{slot.subject}</h3>
            <p>{slot.composition}</p>
            <p>{slot.placement}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
