import { useEffect, useRef } from "react";

export default function EcgDivider() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || document.documentElement.dataset.motion === "reduced") return undefined;

    let raf = 0;
    const frame = () => {
      const rect = node.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      node.style.setProperty("--ecg", String(1 - progress));
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <svg ref={ref} className="ecg-divider" viewBox="0 0 900 120" aria-hidden="true">
      <path pathLength="1" d="M0 68H160l22-38 38 74 32-48h120l24-34 44 72 34-38h130l20-28 44 60 28-20h204" />
    </svg>
  );
}
