import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import SignageRail from "../components/SignageRail.jsx";
import { zentren } from "../content/zentren.js";

export default function ZentrenIndex() {
  return (
    <>
      <PageHero
        kicker="Zentren"
        title="Spezialisierte Versorgung mit kurzen Wegen"
        lead="Elf Zentren bündeln Fachabteilungen, Therapie, Diagnostik und Nachsorge."
        current="Zentren"
        index="07"
      />
      <section className="site-section">
        <div className="wrap grid-3">
          {zentren.map((zentrum) => (
            <Link className="link-card" to={`/zentren/${zentrum.slug}`} key={zentrum.slug}>
              <SignageRail label="Zentrum" title={zentrum.name.de}>
                <p>{zentrum.teaser.de}</p>
              </SignageRail>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
