export default function Marquee({ items = [] }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee" aria-label="Klinik Fakten">
      <div className="marquee-track">
        {doubled.map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}
