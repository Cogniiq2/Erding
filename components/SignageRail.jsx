import { Icon } from "./Icons.jsx";

export default function SignageRail({ tone = "teal", label, title, children, icon }) {
  const iconName = icon || (tone === "red" ? "warning" : "check");
  return (
    <article className={`rail rail-${tone}`}>
      <div className="rail-label">
        <Icon name={iconName} />
        <span>{label}</span>
      </div>
      <h3 className="h3">{title}</h3>
      <div className="rail-body">{children}</div>
    </article>
  );
}
