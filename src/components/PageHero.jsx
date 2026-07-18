import { Link } from "react-router-dom";

export default function PageHero({ eyebrow, title, intro, tone = "default", actions, breadcrumbs = [] }) {
  return (
    <header className={`page-hero tone-${tone}`}>
      <div className="wrap page-hero-inner">
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Startseite</Link>
          {breadcrumbs.map((crumb) => (
            crumb.to ? <Link key={crumb.label} to={crumb.to}>{crumb.label}</Link> : <span key={crumb.label}>{crumb.label}</span>
          ))}
        </nav>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
        {actions && <div className="hero-actions">{actions}</div>}
      </div>
    </header>
  );
}
