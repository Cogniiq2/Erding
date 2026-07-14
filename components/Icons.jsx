export function Icon({ name, className = "icon", title }) {
  const paths = {
    menu: (
      <>
        <path d="M4 7h16" />
        <path d="M4 12h11" />
        <path d="M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="M6 6l12 12" />
        <path d="M18 6L6 18" />
      </>
    ),
    access: (
      <>
        <circle cx="12" cy="4.5" r="1.8" />
        <path d="M5 8.5h14" />
        <path d="M12 8.5v11" />
        <path d="M8.5 20l3.5-7 3.5 7" />
      </>
    ),
    phone: (
      <path d="M7.5 4.8l2.1 4.5-1.8 1.3c1.1 2.2 2.9 4 5.2 5.1l1.4-1.8 4.4 2.1-.6 3.1c-.2.8-.9 1.3-1.7 1.2C9.7 19.8 4.3 14.3 3.8 7.6c-.1-.8.4-1.5 1.2-1.7l2.5-.6z" />
    ),
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    external: (
      <>
        <path d="M8 8h8v8" />
        <path d="M16 8 7 17" />
        <path d="M6 5h13v13" />
      </>
    ),
    warning: (
      <>
        <path d="M12 3 2.8 20h18.4L12 3z" />
        <path d="M12 9v5" />
        <path d="M12 17.5h.01" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="5.5" />
        <path d="m15 15 5 5" />
      </>
    ),
    check: <path d="m5 12 4.2 4.2L19 6.5" />,
    map: (
      <>
        <path d="M9 18 3 20V6l6-2 6 2 6-2v14l-6 2-6-2z" />
        <path d="M9 4v14" />
        <path d="M15 6v14" />
      </>
    ),
    calendar: (
      <>
        <path d="M7 3v4" />
        <path d="M17 3v4" />
        <rect x="4" y="5" width="16" height="16" rx="2" />
        <path d="M4 10h16" />
      </>
    ),
    person: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
      </>
    ),
  };

  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden={title ? undefined : true} role={title ? "img" : undefined}>
      {title ? <title>{title}</title> : null}
      {paths[name] || paths.arrow}
    </svg>
  );
}
