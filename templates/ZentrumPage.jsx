import PageHero from "../components/PageHero.jsx";
import Reveal from "../components/Reveal.jsx";
import SignageRail from "../components/SignageRail.jsx";

export default function ZentrumPage({ zentrum }) {
  return (
    <>
      <PageHero kicker="Zentrum" title={zentrum.name.de} lead={zentrum.intro.de} current={zentrum.name.de} index="07" />
      <section className="site-section">
        <div className="wrap grid-3">
          {zentrum.spektrum.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <SignageRail label={`0${index + 1}`} title={item.title}>
                <p>{item.desc}</p>
              </SignageRail>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
