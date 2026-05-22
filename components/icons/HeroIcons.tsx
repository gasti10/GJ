type IconProps = { className?: string };

export function FlagAR({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 16" aria-hidden>
      <rect width="24" height="16" fill="#74ACDF" />
      <rect y="5.33" width="24" height="5.34" fill="#fff" />
      <circle cx="12" cy="8" r="2.2" fill="#F6B40E" />
    </svg>
  );
}

/** Bandera de Brasil simplificada */
export function FlagBR({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 16" aria-hidden>
      <rect width="24" height="16" fill="#009B3A" />
      <path d="M12 1 23 8 12 15 1 8Z" fill="#FFDF00" />
      <circle cx="12" cy="8" r="3.4" fill="#002776" />
      <path
        d="M9.2 8.4c1.1.9 2.5.9 3.6 0"
        stroke="#fff"
        strokeWidth="0.7"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Bandera de Australia simplificada — Union Jack + estrellas */
export function FlagAU({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 60 30" aria-hidden>
      <rect width="60" height="30" fill="#00008B" />
      {/* Canton Union Jack */}
      <rect width="30" height="15" fill="#012169" />
      <path d="M0 0H30M0 0V15M0 0L30 15" stroke="#fff" strokeWidth="2.5" />
      <path d="M0 0H30M0 0V15M0 0L30 15" stroke="#C8102E" strokeWidth="1.2" />
      {/* Commonwealth Star */}
      <circle cx="11" cy="21" r="2.8" fill="#fff" />
      {/* Southern Cross */}
      <circle cx="44" cy="7" r="1.3" fill="#fff" />
      <circle cx="50" cy="11" r="1.7" fill="#fff" />
      <circle cx="47" cy="17" r="1.2" fill="#fff" />
      <circle cx="53" cy="20" r="1" fill="#fff" />
      <circle cx="41" cy="14" r="0.9" fill="#fff" />
    </svg>
  );
}

/** Avión lateral — silueta clásica */
export function Plane({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  );
}

export function Coffee({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M4 8h11v6a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8Z" />
      <path d="M15 10h2a3 3 0 0 1 0 6h-2" />
      <path d="M6 4v2M10 4v2M14 4v2" strokeLinecap="round" />
    </svg>
  );
}

/** Mate 🧉 — calabaza redonda + bombilla en L (silueta del emoji) */
export function Mate({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path
        d="M12 18.25c-3.45 0-6-2.85-6-6.75C6 7.6 8.55 4.75 12 4.75S18 7.6 18 11.5c0 3.9-2.55 6.75-6 6.75z"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <path d="M12 18.25c-3.45 0-6-2.85-6-6.75C6 7.6 8.55 4.75 12 4.75S18 7.6 18 11.5c0 3.9-2.55 6.75-6 6.75z" />
      <path d="M9.25 9.25h5.5" />
      <path d="M13.25 8.75 18 5.75V11" />
      <path d="M13.25 8.75V12.5" />
      <circle cx="13.25" cy="12.85" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Pelota de fútbol — pentágono central + costuras */
export function Football({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="8.25" />
      <path
        d="M12 5.2 14.35 6.9l.9 2.85-1.9 1.75L12 10.8l-1.35 1.7-1.9-1.75.9-2.85L12 5.2z"
        fill="currentColor"
        fillOpacity="0.14"
      />
      <path d="M12 5.2V3.75" />
      <path d="M14.35 6.9l1.85-1" />
      <path d="M15.25 9.75l2.15.55" />
      <path d="M12 10.8v2" />
      <path d="M8.85 9.75l-2.15.55" />
      <path d="M9.65 6.9l-1.85-1" />
    </svg>
  );
}

/** Birrete de graduación */
export function Graduation({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M12 3 2 8l10 5 10-5-10-5Z" strokeLinejoin="round" />
      <path d="M6 10v5c0 2 2.5 4 6 4s6-2 6-4v-5" strokeLinecap="round" />
      <path d="M22 8v6" strokeLinecap="round" />
    </svg>
  );
}

export function HeroItemIcon({
  icon,
  className,
}: {
  icon: NonNullable<import("@/lib/hero-items").HeroItemIcon>;
  className?: string;
}) {
  switch (icon) {
    case "flag-ar":
      return <FlagAR className={className} />;
    case "flag-au":
      return <FlagAU className={className} />;
    case "flag-br":
      return <FlagBR className={className} />;
    case "plane":
      return <Plane className={className} />;
    case "coffee":
      return <Coffee className={className} />;
    case "mate":
      return <Mate className={className} />;
    case "football":
      return <Football className={className} />;
    case "graduation":
      return <Graduation className={className} />;
  }
}
