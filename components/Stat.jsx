import { useEffect, useRef, useState } from "react";

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

export default function Stat({ value, suffix = "", label }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const numeric = Number(value);
    if (Number.isNaN(numeric)) {
      setDisplay(value);
      return undefined;
    }

    let raf = 0;
    let start = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const tick = (now) => {
          if (!start) start = now;
          const t = Math.min(1, (now - start) / 1400);
          setDisplay(Math.round(easeOutCubic(t) * numeric));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <div ref={ref} className="stat">
      <strong className="mono">
        {display}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  );
}
