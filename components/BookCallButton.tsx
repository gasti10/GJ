"use client";

import { getCalApi } from "@calcom/embed-react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo } from "react";
import {
  CAL_BOOKING_LINK,
  CAL_EMBED_NAMESPACE,
} from "@/lib/constants";
import { mapLocaleToCal } from "@/lib/cal-embed";

function CalendarIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
    </svg>
  );
}

type BookCallButtonProps = {
  variant: "hero" | "contact";
};

function useCalEmbed() {
  useEffect(() => {
    void (async () => {
      const cal = await getCalApi({ namespace: CAL_EMBED_NAMESPACE });
      cal("ui", {
        layout: "month_view",
        hideEventTypeDetails: false,
      });
    })();
  }, []);
}

export function BookCallButton({ variant }: BookCallButtonProps) {
  const locale = useLocale();
  const tHero = useTranslations("hero");
  const tContact = useTranslations("contact");
  const prefersReducedMotion = useReducedMotion();
  useCalEmbed();

  const calConfig = useMemo(
    () =>
      JSON.stringify({
        layout: "month_view",
        lang: mapLocaleToCal(locale),
      }),
    [locale],
  );

  const calProps = {
    "data-cal-namespace": CAL_EMBED_NAMESPACE,
    "data-cal-link": CAL_BOOKING_LINK,
    "data-cal-config": calConfig,
  } as const;

  if (variant === "hero") {
    return (
      <button
        type="button"
        {...calProps}
        className="inline-flex items-center rounded-full border border-foreground/30 px-6 py-3 font-mono text-xs font-medium uppercase tracking-wider transition hover:border-foreground"
      >
        {tHero("cta_book")}
      </button>
    );
  }

  return (
    <motion.button
      type="button"
      {...calProps}
      aria-label={tContact("book_aria")}
      className="group mt-8 inline-flex w-full max-w-md items-center gap-4 rounded-2xl border border-highlight/40 bg-highlight/10 px-5 py-4 text-left backdrop-blur-sm transition-colors hover:border-highlight/60 hover:bg-highlight/15 md:w-auto"
      whileHover={prefersReducedMotion ? undefined : { y: -3 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-highlight/30 bg-background text-highlight">
        <CalendarIcon />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          {tContact("book_label")}
        </span>
        <span className="block text-base font-semibold text-foreground md:text-lg">
          {tContact("book_cta")}
        </span>
      </span>
    </motion.button>
  );
}
