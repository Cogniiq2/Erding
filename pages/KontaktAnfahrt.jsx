import ContactCard from "../components/ContactCard.jsx";
import PageHero from "../components/PageHero.jsx";
import SignageRail from "../components/SignageRail.jsx";

export default function KontaktAnfahrt() {
  return (
    <>
      <PageHero
        kicker="Kontakt & Anfahrt"
        title="Gut erreichbar in Erding und Dorfen"
        lead="S2 München-Erding, B388, Parkhaus am Haus und zentrale Kontaktwege."
        current="Kontakt & Anfahrt"
        index="15"
      />
      <section className="site-section">
        <div className="wrap grid-2">
          <ContactCard title="Klinikum Erding" phone="08122 59-0">
            <p>Bajuwarenstraße 5, 85435 Erding</p>
          </ContactCard>
          <ContactCard title="Klinik Dorfen" phone="08122 59-0">
            <p>Innere Medizin und Interdisziplinäre Schmerztherapie mit 12 tagesklinischen Plätzen.</p>
          </ContactCard>
        </div>
      </section>
      <section className="site-section tight">
        <div className="wrap grid-3">
          <SignageRail label="Bahn" title="S2 München-Erding"><p>Anbindung über die S-Bahn-Linie S2.</p></SignageRail>
          <SignageRail label="Auto" title="B388"><p>Regionale Erreichbarkeit über die B388.</p></SignageRail>
          <SignageRail label="Parken" title="Parkhaus"><p>Parkmöglichkeiten am Standort Erding.</p></SignageRail>
        </div>
      </section>
    </>
  );
}
