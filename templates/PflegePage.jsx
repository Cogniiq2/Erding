import PageHero from "../components/PageHero.jsx";
import SignageRail from "../components/SignageRail.jsx";

export default function PflegePage({ department }) {
  return (
    <>
      <PageHero kicker="Pflege" title={department.name.de} lead={department.pflege.de} current={`${department.name.de} Pflege`} index="05" />
      <section className="site-section">
        <div className="wrap grid-2">
          <SignageRail label="Pflege" title="Patientennah und interdisziplinär">
            <p>{department.pflege.de}</p>
          </SignageRail>
          <div className="card">
            <h2 className="h3">Zusammenarbeit</h2>
            <p>Pflege, ärztlicher Dienst, Therapie, Sozialdienst und Entlassmanagement arbeiten in klaren Übergaben zusammen.</p>
          </div>
        </div>
      </section>
    </>
  );
}
