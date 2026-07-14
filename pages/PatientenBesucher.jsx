import { Link } from "react-router-dom";
import PageHero from "../components/PageHero.jsx";
import SignageRail from "../components/SignageRail.jsx";
import { services } from "../content/services.js";

export default function PatientenBesucher() {
  return (
    <>
      <PageHero
        kicker="Patienten & Besucher"
        title="Alles Wichtige für Aufenthalt und Besuch"
        lead="Kurze Wege zu Besuchszeiten, Sozialdienst, Entlassmanagement, Seelsorge und Service A-Z."
        current="Patienten & Besucher"
        index="11"
      />
      <section className="site-section">
        <div className="wrap grid-3">
          {services.map((service) => (
            <Link className="link-card" to={`/patienten-besucher/${service.slug}`} key={service.slug}>
              <SignageRail label="Service" title={service.title.de}>
                <p>{service.teaser.de}</p>
              </SignageRail>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
