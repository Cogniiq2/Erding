export default function TiltCard({ className = "", children }) {
  function move(event) {
    if (document.documentElement.dataset.motion === "reduced") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.transform = `perspective(900px) rotateX(${y * -4}deg) rotateY(${x * 5}deg) translateY(-3px)`;
  }

  function leave(event) {
    event.currentTarget.style.transform = "";
  }

  return (
    <article className={`tilt-card ${className}`} onMouseMove={move} onMouseLeave={leave}>
      {children}
    </article>
  );
}
