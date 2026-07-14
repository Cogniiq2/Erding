import PageHero from "../components/PageHero.jsx";
import Reveal from "../components/Reveal.jsx";

export default function LeistungsSpektrum({ department }) {
  return (
    <>
      <PageHero
        kicker="Leistungsspektrum"
        title={department.name.de}
        lead="Diagnostik, Therapie und Nachsorge sind als verständliche Behandlungspfade angelegt."
        current={`${department.name.de} Spektrum`}
        index="03"
      />
      <section className="site-section">
        <div className="wrap spectrum-list">
          {department.spektrum.map((item, index) => (
            <Reveal as="article" className="spectrum-row" delay={index * 0.08} key={item.title}>
              <span className="mono">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="h3">{item.title}</h2>
                <p>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
