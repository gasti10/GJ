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

/** Mate con bombilla */
export function Mate({ className = "h-3.5 w-3.5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden
    >
      <path
        d="M8 6c0-1.5 1.5-3 4-3s4 1.5 4 3v12c0 1.5-1.5 3-4 3s-4-1.5-4-3V6z"
        strokeLinejoin="round"
      />
      <path d="M8 9h8M8 13h8" strokeLinecap="round" opacity="0.5" />
      <path d="M14 4l4-2M18 2v8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="18" cy="10" r="1" fill="currentColor" stroke="none" />
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
    case "graduation":
      return <Graduation className={className} />;
  }
}
