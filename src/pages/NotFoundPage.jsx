import { Link } from "react-router-dom";
import { usePageMeta } from "../lib/meta.js";

export default function NotFoundPage() {
  usePageMeta({ title: "Seite nicht gefunden", description: "404-Seite des Klinikums Landkreis Erding.", path: "/404" });
  return (
    <section className="not-found">
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1>Diese Seite wurde nicht gefunden.</h1>
        <p>Zurück zur Startseite oder direkt zu Medizin & Zentren.</p>
        <div className="hero-actions">
          <Link className="button primary" to="/">Startseite</Link>
          <Link className="button ghost" to="/medizin-zentren">Medizin & Zentren</Link>
        </div>
      </div>
    </section>
  );
}
