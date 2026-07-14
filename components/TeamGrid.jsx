function initials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(-2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function TeamGrid({ team = [] }) {
  return (
    <div className="team-grid">
      {team.map((member) => (
        <article className="team-card" key={member.name}>
          <span className="avatar mono" aria-hidden="true">
            {initials(member.name)}
          </span>
          <div>
            <h3 className="h3">{member.name}</h3>
            <p>{member.role.de}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
