import PageHero from "../components/PageHero.jsx";
import SignageRail from "../components/SignageRail.jsx";

export default function ServicePage({ service }) {
  return (
    <>
      <PageHero kicker="Patienten & Besucher" title={service.title.de} lead={service.teaser.de} current={service.title.de} index="08" />
      <section className="site-section">
        <div className="wrap grid-2">
          <SignageRail label="Service" title={service.teaser.de}>
            <p>{service.body.de}</p>
          </SignageRail>
          <div className="card">
            <h2 className="h3">Kurzinfo</h2>
            <p className="mono">{service.slug === "besuchszeiten" ? "Erding & Dorfen täglich 13:30-18:30" : "08122 59-0"}</p>
            <p>Ambulanzen bitte nur mit Termin aufsuchen. Bei Fieber oder Infektzeichen vorher telefonisch klären.</p>
          </div>
        </div>
      </section>
    </>
  );
}
