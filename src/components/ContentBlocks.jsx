import { Link } from "react-router-dom";
import { Icon } from "./Icons.jsx";

export function Section({ eyebrow, title, intro, children, className = "", id }) {
  return (
    <section className={`section ${className}`} id={id}>
      <div className="wrap">
        {(eyebrow || title || intro) && (
          <header className="section-head">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2>{title}</h2>}
            {intro && <p>{intro}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}

export function RailCard({ eyebrow, title, text, tone = "default", to, href, children, actionLabel = "Öffnen" }) {
  const content = (
    <article className={`rail-card tone-${tone}`}>
      {eyebrow && <p className="rail-kicker">{eyebrow}</p>}
      <h3>{title}</h3>
      {text && <p>{text}</p>}
      {children}
      {(to || href) && (
        <span className="card-action">
          {actionLabel} <Icon name="arrow" />
        </span>
      )}
    </article>
  );

  if (to) return <Link className="unstyled-link" to={to}>{content}</Link>;
  if (href) return <a className="unstyled-link" href={href}>{content}</a>;
  return content;
}

export function FactGrid({ facts }) {
  return (
    <div className="fact-grid">
      {facts.map((fact) => (
        <div className="fact" key={fact.label}>
          <strong>{fact.value}</strong>
          <span>{fact.label}</span>
          {fact.context && <small>{fact.context}</small>}
        </div>
      ))}
    </div>
  );
}

export function Timeline({ items }) {
  return (
    <ol className="timeline">
      {items.map((item, index) => (
        <li key={item}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <p>{item}</p>
        </li>
      ))}
    </ol>
  );
}

export function Checklist({ items }) {
  return (
    <ul className="checklist">
      {items.map((item) => (
        <li key={item}>
          <Icon name="check" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function EditorialSplit({ eyebrow, title, text, children, aside }) {
  return (
    <div className="editorial-split">
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {text && <p>{text}</p>}
        {children}
      </div>
      {aside && <aside>{aside}</aside>}
    </div>
  );
}

export function LinkList({ items, basePath, typeLabel }) {
  return (
    <div className="directory-list">
      {items.map((item, index) => (
        <Link key={item.slug} to={`${basePath}/${item.slug}`}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <strong>{item.title}</strong>
          <small>{typeLabel ? `${typeLabel}: ${item.teaser}` : item.teaser}</small>
        </Link>
      ))}
    </div>
  );
}

export function Callout({ tone = "default", title, text, children }) {
  return (
    <aside className={`callout tone-${tone}`}>
      <h3>{title}</h3>
      {text && <p>{text}</p>}
      {children}
    </aside>
  );
}

export function SourceList() {
  return null;
}
