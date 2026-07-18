export function Icon({ name, className = "icon" }) {
  const icons = {
    menu: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h12" />
        <path d="M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="M18 6 6 18" />
      </>
    ),
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    phone: <path d="M7.5 4.8 9.6 9.3l-1.8 1.3c1.1 2.2 2.9 4 5.2 5.1l1.4-1.8 4.4 2.1-.6 3.1c-.2.8-.9 1.3-1.7 1.2C9.7 19.8 4.3 14.3 3.8 7.6c-.1-.8.4-1.5 1.2-1.7l2.5-.6z" />,
    alert: (
      <>
        <path d="M12 3 2.8 20h18.4L12 3z" />
        <path d="M12 9v5" />
        <path d="M12 17.5h.01" />
      </>
    ),
    map: (
      <>
        <path d="M9 18 3 20V6l6-2 6 2 6-2v14l-6 2-6-2z" />
        <path d="M9 4v14" />
        <path d="M15 6v14" />
      </>
    ),
    check: <path d="m5 12 4.2 4.2L19 6.5" />,
    search: (
      <>
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4 4" />
      </>
    ),
    briefcase: (
      <>
        <path d="M9 7V5.8C9 4.8 9.8 4 10.8 4h2.4C14.2 4 15 4.8 15 5.8V7" />
        <path d="M4 8h16v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8z" />
        <path d="M4 13h16" />
      </>
    ),
    building: (
      <>
        <path d="M5 21V5.8L14 3v18" />
        <path d="M14 9h5v12" />
        <path d="M8 8h2M8 12h2M8 16h2M16 13h1M16 17h1" />
      </>
    ),
    portal: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 9h8M8 13h5M8 17h8" />
      </>
    ),
    chevron: <path d="m9 18 6-6-6-6" />,
  };

  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      {icons[name] || icons.arrow}
    </svg>
  );
}
