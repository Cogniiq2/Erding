import CTAButton from "../components/CTAButton.jsx";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="wrap">
        <span className="mono">404</span>
        <h1>Diese Seite ist nicht im Dienstplan.</h1>
        <p>Der Link führt ins Leere. Zurück zur Startseite oder in das Behandlungsangebot.</p>
        <div className="hero-actions">
          <CTAButton to="/">Zurück zur Startseite</CTAButton>
          <CTAButton to="/behandlungsangebot" tone="ghost">Behandlungsangebot</CTAButton>
        </div>
      </div>
    </section>
  );
}
