import { Link, useLocation } from "react-router-dom";

const labels = {
  behandlungsangebot: "Behandlungsangebot",
  spektrum: "Spektrum",
  team: "Team",
  kontakt: "Kontakt",
  zentren: "Zentren",
  "gynaekologie-geburtshilfe": "Gynäkologie & Geburtshilfe",
  "geburt-anmelden": "Geburt anmelden",
  notaufnahme: "Notaufnahme",
  "patienten-besucher": "Patienten & Besucher",
  besuchszeiten: "Besuchszeiten",
  aktuelles: "Aktuelles",
  klinikum: "Klinikum",
  "kontakt-anfahrt": "Kontakt & Anfahrt",
  impressum: "Impressum",
  datenschutz: "Datenschutz",
  barrierefreiheit: "Barrierefreiheit",
};

function labelFor(segment) {
  return labels[segment] || segment.replaceAll("-", " ");
}

export default function Breadcrumbs({ current }) {
  const location = useLocation();
  const parts = location.pathname.split("/").filter(Boolean);
  let path = "";

  return (
    <nav className="breadcrumbs wrap" aria-label="Breadcrumb">
      <Link className="crumb-back" to={parts.length > 1 ? `/${parts.slice(0, -1).join("/")}` : "/"}>
        ← Zurück
      </Link>
      <ol>
        <li>
          <Link to="/">Startseite</Link>
        </li>
        {parts.map((part, index) => {
          path += `/${part}`;
          const isLast = index === parts.length - 1;
          return (
            <li key={path} aria-current={isLast ? "page" : undefined}>
              {isLast ? <span>{current || labelFor(part)}</span> : <Link to={path}>{labelFor(part)}</Link>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
