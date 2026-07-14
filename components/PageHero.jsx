import Breadcrumbs from "./Breadcrumbs.jsx";
import Reveal from "./Reveal.jsx";
import { useParallax } from "../lib/motion.js";

export default function PageHero({
  kicker,
  title,
  lead,
  tone = "teal",
  current,
  actions,
  index = "01",
  children,
}) {
  const titleRef = useParallax(0.85);
  const bgRef = useParallax(1.1);
  return (
    <header className={`page-hero hero-${tone}`}>
      <Breadcrumbs current={current} />
      <div className="wrap page-hero-grid">
        <div className="page-hero-copy">
          <div className="kicker">{kicker}</div>
          <h1 ref={titleRef} className="display">
            {title}
          </h1>
          {lead ? <p className="lead">{lead}</p> : null}
          {actions ? <div className="hero-actions">{actions}</div> : null}
        </div>
        {children ? <Reveal className="page-hero-panel">{children}</Reveal> : null}
      </div>
      <span ref={bgRef} className="hero-index mono" aria-hidden="true">
        {index}
      </span>
    </header>
  );
}
