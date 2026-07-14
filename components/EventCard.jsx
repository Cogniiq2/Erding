import { Icon } from "./Icons.jsx";

export default function EventCard({ item }) {
  return (
    <article className="event-card">
      <span className="mono">{item.date}</span>
      <h3 className="h3">{item.title.de}</h3>
      <p>{item.location.de}</p>
      <small>
        <Icon name="calendar" /> {item.time}
      </small>
    </article>
  );
}
