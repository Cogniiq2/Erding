import { Icon } from "./Icons.jsx";

export default function ContactCard({ title = "Kontakt", phone, email, children, emergency = false }) {
  return (
    <aside className={`contact-card ${emergency ? "contact-emergency" : ""}`}>
      <span className="contact-icon">
        <Icon name={emergency ? "warning" : "phone"} />
      </span>
      <h2 className="h3">{title}</h2>
      {phone ? (
        <a className="mono contact-phone" href={`tel:${phone.replace(/[^+\d]/g, "")}`}>
          {phone}
        </a>
      ) : null}
      {email ? <a href={`mailto:${email}`}>{email}</a> : null}
      {children ? <div className="contact-extra">{children}</div> : null}
    </aside>
  );
}
