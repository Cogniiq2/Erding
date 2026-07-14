import PageHero from "../components/PageHero.jsx";
import SignageRail from "../components/SignageRail.jsx";

const copy = {
  impressum: {
    title: "Impressum",
    lead: "Platzhalter für die rechtlichen Anbieterangaben der Konzeptstudie.",
  },
  datenschutz: {
    title: "Datenschutz",
    lead: "Die Konzeptstudie vermeidet Tracking und versendet keine Formulardaten.",
  },
  barrierefreiheit: {
    title: "Barrierefreiheit",
    lead: "Die Ansicht-anpassen-Funktion ist als BFSG-relevanter Bestandteil der digitalen Patientenkommunikation angelegt.",
  },
};

export default function LegalPage({ kind }) {
  const page = copy[kind] || copy.impressum;
  return (
    <>
      <PageHero kicker="Rechtliches" title={page.title} lead={page.lead} current={page.title} index="16" />
      <section className="site-section">
        <div className="wrap grid-2">
          <SignageRail label="BFSG" title={kind === "barrierefreiheit" ? "Bedienbar, wahrnehmbar, robust" : "Konzeptstudie"}>
            <p>
              {kind === "barrierefreiheit"
                ? "Farbmodus, Schriftgröße, reduzierte Bewegung und Zeilenfokus werden über echte CSS-Tokens und data-Attribute umgesetzt. Farbe ist nie alleiniger Bedeutungsträger."
                : "Diese Seite markiert die vorgesehenen rechtlichen Inhalte für den finalen Betrieb."}
            </p>
          </SignageRail>
          <div className="card">
            <h2 className="h3">Umsetzung</h2>
            <p>Kontrastmodus nutzt harte Grenzen, unterstrichene Links und stärkere Fokusindikatoren. Reduzierte Bewegung zeigt alle Inhalte statisch.</p>
          </div>
        </div>
      </section>
    </>
  );
}
