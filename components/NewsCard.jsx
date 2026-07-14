import { Link } from "react-router-dom";
import { Icon } from "./Icons.jsx";

export default function NewsCard({ item }) {
  return (
    <Link className="news-card" to={`/aktuelles/${item.slug}`}>
      <span className="mono">{item.date}</span>
      <h3 className="h3">{item.title.de}</h3>
      <p>{item.teaser.de}</p>
      <small>
        Weiterlesen <Icon name="arrow" />
      </small>
    </Link>
  );
}
