export default function PillNav({ items = [], active }) {
  return (
    <nav className="pill-nav" aria-label="Seitenabschnitte">
      <div className="wrap pill-nav-scroll">
        {items.map((item) => (
          <a key={item.href} className={active === item.href ? "active" : ""} href={item.href}>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
