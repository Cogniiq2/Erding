import { useEffect, useRef } from "react";

export const EASE = "cubic-bezier(.2,.6,.2,1)";

export function lerp(value, target, k = 0.08) {
  return value + (target - value) * k;
}

export function createScrollConductor(callback, k = 0.08) {
  let raf = 0;
  let current = 0;
  let running = true;

  const frame = () => {
    if (!running) return;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const target = window.scrollY / max;
    current = lerp(current, target, k);
    callback(current, target);
    raf = requestAnimationFrame(frame);
  };

  raf = requestAnimationFrame(frame);

  return () => {
    running = false;
    cancelAnimationFrame(raf);
  };
}

export function useReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (document.documentElement.dataset.motion === "reduced") {
      node.classList.add("in");
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("in");
          observer.disconnect();
        }
      },
      { threshold: 0.14, ...options },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return ref;
}

export function useParallax(multiplier = 0.85) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || document.documentElement.dataset.motion === "reduced") return undefined;

    let raf = 0;
    let y = 0;

    const frame = () => {
      const rect = node.getBoundingClientRect();
      const target = rect.top * (1 - multiplier);
      y = lerp(y, target, 0.07);
      node.style.transform = `translate3d(0, ${y}px, 0)`;
      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [multiplier]);

  return ref;
}
