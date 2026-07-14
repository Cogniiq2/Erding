import Marquee from "../components/Marquee.jsx";
import PageHero from "../components/PageHero.jsx";
import SignageRail from "../components/SignageRail.jsx";
import Stat from "../components/Stat.jsx";
import { facts } from "../content/i18n.js";

export default function Klinikum() {
  return (
    <>
      <PageHero
        kicker="Klinikum"
        title="Kommunal getragen, akademisch angebunden, nah versorgend"
        lead="Das Klinikum Landkreis Erding ist ein Kommunalunternehmen des Landkreises Erding und akademisches Lehrkrankenhaus der TU München."
        current="Klinikum"
        index="14"
      />
      <Marquee items={facts} />
      <section className="site-section">
        <div className="wrap stats-grid wide">
          <Stat value={330} label="Betten" />
          <Stat value={12} label="tagesklinische Plätze" />
          <Stat value={1000} suffix="+" label="Mitarbeitende" />
          <Stat value={50} suffix=" Mio €" label="Investitionen / 10 Jahre" />
        </div>
      </section>
      <section className="site-section tight">
        <div className="wrap grid-3">
          {["Über uns", "Geschichte Erding/Dorfen", "Leitung", "Vision/Leitbild", "Qualitätsmanagement", "Zertifizierungen"].map((title) => (
            <SignageRail key={title} label="Klinikum" title={title}>
              <p>In der Konzeptstudie ist dieser Bereich als ruhiger Hub mit klaren Unterseiten vorbereitet.</p>
            </SignageRail>
          ))}
        </div>
      </section>
    </>
  );
}
