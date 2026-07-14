import { Link } from "react-router-dom";
import CTAButton from "../components/CTAButton.jsx";
import EcgDivider from "../components/EcgDivider.jsx";
import ExternalCard from "../components/ExternalCard.jsx";
import PageHero from "../components/PageHero.jsx";
import Reveal from "../components/Reveal.jsx";
import SignageRail from "../components/SignageRail.jsx";

export default function DeptIntro({ department }) {
  return (
    <>
      <PageHero
        kicker="Behandlungsangebot"
        title={department.name.de}
        lead={department.intro.de}
        current={department.name.de}
        tone={department.highlight ? "gold" : department.emergency ? "red" : "teal"}
        index="02"
        actions={
          <>
            <CTAButton to={`/behandlungsangebot/${department.slug}/kontakt`} icon="phone">
              Kontakt & Sprechstunden
            </CTAButton>
            <CTAButton to={`/behandlungsangebot/${department.slug}/spektrum`} tone="ghost">
              Spektrum ansehen
            </CTAButton>
          </>
        }
      />
      <section className="site-section">
        <div className="wrap grid-2">
          <Reveal>
            <SignageRail
              tone={department.emergency ? "red" : department.highlight ? "gold" : "teal"}
              label={department.emergency ? "Notfall" : "Abteilung"}
              title={department.teaser.de}
            >
              <p>{department.intro.de}</p>
            </SignageRail>
          </Reveal>
          <Reveal delay={0.08} className="link-stack card">
            <h2 className="h3">Seiten dieser Abteilung</h2>
            <Link to={`/behandlungsangebot/${department.slug}/spektrum`}>Leistungsspektrum</Link>
            <Link to={`/behandlungsangebot/${department.slug}/team`}>Team</Link>
            <Link to={`/behandlungsangebot/${department.slug}/kontakt`}>Kontakt & Sprechstunden</Link>
            {department.slug === "gynaekologie-geburtshilfe" ? <Link to="/gynaekologie-geburtshilfe">Lighthouse-Seite Frauenklinik</Link> : null}
          </Reveal>
        </div>
      </section>
      <EcgDivider />
      {department.zentren?.length ? (
        <section className="site-section tight">
          <div className="wrap">
            <div className="section-head">
              <span className="kicker">Verknüpfte Zentren</span>
              <h2 className="h2">Interdisziplinär verbunden</h2>
            </div>
            <div className="tag-list">
              {department.zentren.map((slug) => (
                <Link key={slug} to={`/zentren/${slug}`}>{slug.replaceAll("-", " ")}</Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      {department.external?.length ? (
        <section className="site-section tight">
          <div className="wrap grid-3">
            {department.external.map((item) => (
              <ExternalCard key={item.url} {...item} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
