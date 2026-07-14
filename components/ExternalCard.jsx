import { Icon } from "./Icons.jsx";

export default function ExternalCard({ label, url, note }) {
  return (
    <a className="external-card" href={url} target="_blank" rel="noreferrer">
      <span>
        <strong>{label}</strong>
        {note ? <small>{note}</small> : null}
      </span>
      <Icon name="external" />
    </a>
  );
}
