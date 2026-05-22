"use client";

import { Link } from "@/i18n/navigation";
import { InteractiveText } from "./InteractiveText";

export function Logo() {
  return (
    <Link
      href="/"
      className="inline-flex shrink-0 whitespace-nowrap font-mono text-lg font-semibold uppercase tracking-[0.18em] md:text-xl lg:text-2xl"
      aria-label="Gaston Jouglard — Inicio"
    >
      <InteractiveText text="GJ©" animateOnMount mountDelay={0.1} />
    </Link>
  );
}
