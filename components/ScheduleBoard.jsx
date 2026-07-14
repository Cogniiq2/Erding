export default function ScheduleBoard({ items = [] }) {
  return (
    <div className="schedule-board">
      {items.map((item) => (
        <div className="schedule-row" key={`${item.name.de}-${item.day.de}-${item.time}`}>
          <strong>{item.name.de}</strong>
          <span>{item.day.de}</span>
          <span className="mono">{item.time}</span>
        </div>
      ))}
    </div>
  );
}
