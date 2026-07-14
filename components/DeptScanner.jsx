import { Link } from "react-router-dom";
import { Icon } from "./Icons.jsx";

export default function DeptScanner({ departments = [], emptyLabel = "Keine passenden Abteilungen gefunden." }) {
  return (
    <div className="dept-scanner">
      <span className="dept-track" aria-hidden="true" />
      {departments.length ? (
        departments.map((dept, index) => (
          <Link
            className={`dept-row ${dept.highlight ? "dept-highlight" : ""} ${dept.emergency ? "dept-emergency" : ""}`}
            to={`/behandlungsangebot/${dept.slug}`}
            key={dept.slug}
          >
            <span className="dept-node" aria-hidden="true" />
            <span className="mono dept-no">{String(index + 1).padStart(2, "0")}</span>
            <span>
              <strong>{dept.name.de}</strong>
              <small>{dept.teaser.de}</small>
            </span>
            <Icon name={dept.emergency ? "warning" : "arrow"} />
          </Link>
        ))
      ) : (
        <p className="dept-empty">{emptyLabel}</p>
      )}
    </div>
  );
}
