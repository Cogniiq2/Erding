import PageHero from "../components/PageHero.jsx";
import TeamGrid from "../components/TeamGrid.jsx";

export default function TeamPage({ department }) {
  return (
    <>
      <PageHero
        kicker="Team"
        title={department.name.de}
        lead="Initial-Avatare statt Platzhalterfotos: ruhig, glaubwürdig und wartbar."
        current={`${department.name.de} Team`}
        index="04"
      />
      <section className="site-section">
        <div className="wrap">
          <TeamGrid team={department.team} />
        </div>
      </section>
    </>
  );
}
