import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContactCard from "../components/ContactCard.jsx";
import CTAButton from "../components/CTAButton.jsx";
import ExternalCard from "../components/ExternalCard.jsx";
import PageHero from "../components/PageHero.jsx";
import PillNav from "../components/PillNav.jsx";
import ScheduleBoard from "../components/ScheduleBoard.jsx";
import SignageRail from "../components/SignageRail.jsx";
import Stat from "../components/Stat.jsx";
import TeamGrid from "../components/TeamGrid.jsx";
import { getDepartment } from "../content/departments.js";

const pills = [
  ["#gyn", "Gynäkologie"],
  ["#geburt", "Geburtshilfe"],
  ["#brust", "Brustzentrum"],
  ["#sprechstunden", "Sprechstunden"],
  ["#team", "Team"],
  ["#kontakt", "Kontakt"],
].map(([href, label]) => ({ href, label }));

export default function GynPage() {
  const department = getDepartment("gynaekologie-geburtshilfe");
  const [active, setActive] = useState("#gyn");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0.2, 0.45, 0.7] },
    );
    pills.forEach((item) => {
      const node = document.querySelector(item.href);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <PageHero
        kicker="Frauenklinik · Klinikum Erding"
        title="Gynäkologie & Geburtshilfe"
        lead="Ruhige, persönliche Versorgung von der Sprechstunde bis zur Geburt. Mit zertifiziertem Brustzentrum, Urogynäkologie und Endometriose-Sprechstunde."
        tone="gold"
        current="Gynäkologie & Geburtshilfe"
        index="08"
        actions={
          <>
            <CTAButton href="tel:+498122591648" icon="phone" tone="gold">08122 59-1648</CTAButton>
            <CTAButton to="/gynaekologie-geburtshilfe/geburt-anmelden" tone="ghost">Zur Geburt anmelden</CTAButton>
          </>
        }
      />
      <PillNav items={pills} active={active} />

      <section id="gyn" className="site-section">
        <div className="wrap grid-2">
          <SignageRail tone="gold" label="Frauenklinik" title="Breit aufgestellt, nah am Alltag">
            <p>{department.intro.de}</p>
          </SignageRail>
          <div className="stats-grid">
            <Stat value={600} suffix="+" label="Geburten pro Jahr" />
            <Stat value={7} label="Sprechstunden" />
            <Stat value={2028} label="Kinderklinik Sommer" />
          </div>
        </div>
      </section>

      <section id="geburt" className="site-section dark-band">
        <div className="wrap grid-3">
          <SignageRail tone="gold" label="Geburtshilfe" title="Anmeldung und Planung">
            <p>Geburtsplanung Dienstag und Donnerstag 08:00-14:00. Der Infoabend für werdende Eltern findet jeden ersten Mittwoch im Monat statt.</p>
          </SignageRail>
          <SignageRail tone="gold" label="2028" title="Kinderklinik">
            <p>Geburtshilfe und Kinderversorgung rücken künftig unter ein Dach. Für Familien im Landkreis ist das ein spürbarer Versorgungsschritt.</p>
          </SignageRail>
          <ExternalCard label="Babygalerie" url="https://www.babygalerie24.de/erding-dorfen" note="Externe Galerie" />
        </div>
      </section>

      <section id="brust" className="site-section">
        <div className="wrap grid-2">
          <SignageRail tone="gold" label="Zertifiziert" title="Brustzentrum mit TUM-Kooperation">
            <p>Das Brustzentrum arbeitet zertifiziert und in Kooperation mit dem Klinikum rechts der Isar der TU München.</p>
          </SignageRail>
          <Link className="link-card" to="/zentren/kontinenz-beckenboden-zentrum">
            <SignageRail label="Cross-Link" title="Kontinenz- & Beckenbodenzentrum">
              <p>Urogynäkologische Beschwerden werden interdisziplinär betrachtet und klar weitergeleitet.</p>
            </SignageRail>
          </Link>
        </div>
      </section>

      <section id="sprechstunden" className="site-section">
        <div className="wrap">
          <div className="section-head">
            <span className="kicker">Sprechstunden</span>
            <h2 className="h2">Mono-Zeiten, klare Zuständigkeiten</h2>
          </div>
          <ScheduleBoard items={department.sprechstunden} />
        </div>
      </section>

      <section id="team" className="site-section">
        <div className="wrap">
          <div className="section-head">
            <span className="kicker">Team</span>
            <h2 className="h2">Namen statt Symbolfotos</h2>
          </div>
          <TeamGrid team={department.team} />
        </div>
      </section>

      <section id="kontakt" className="site-section">
        <div className="wrap grid-2">
          <ContactCard title="Sekretariat Gynäkologie" phone="08122 59-1648" email="sekretariat.gynaekologie@klinikum-erding.de" />
          <SignageRail tone="gold" label="Hinweis" title="Termine bitte telefonisch abstimmen">
            <p>Für Tumorgenetik, Babysprechstunde und besondere Fragestellungen vereinbart das Sekretariat die passenden Wege.</p>
          </SignageRail>
        </div>
      </section>
    </>
  );
}
