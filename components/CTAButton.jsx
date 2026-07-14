import { Link } from "react-router-dom";
import { Icon } from "./Icons.jsx";

export default function CTAButton({ to, href, children, tone = "primary", icon = "arrow", ...props }) {
  const className = `btn btn-${tone}`;
  const content = (
    <>
      <span>{children}</span>
      {icon ? <Icon name={icon} /> : null}
    </>
  );

  if (to) {
    return (
      <Link className={className} to={to} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <a className={className} href={href} {...props}>
      {content}
    </a>
  );
}
