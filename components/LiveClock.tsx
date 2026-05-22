"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";
import { SITE_GUTTER } from "@/lib/site-layout";
import { SectionReveal } from "./SectionReveal";

const RING_R = 92;
const RING_C = 2 * Math.PI * RING_R;

const DIGIT_CLASS =
  "text-[clamp(2.5rem,13vw,4.5rem)] leading-none sm:text-[clamp(3rem,14vw,6rem)] md:text-[clamp(4rem,12vw,9rem)]";
const COLON_CLASS =
  "text-[clamp(1.75rem,9vw,3rem)] leading-none sm:text-[clamp(2.25rem,10vw,5rem)] md:text-[clamp(3rem,10vw,7rem)]";

function BlinkColon({
  active,
  className = COLON_CLASS,
}: {
  active: boolean;
  className?: string;
}) {
  return (
    <span
      className={`transition-opacity duration-300 ${className} ${
        active ? "text-highlight opacity-100" : "text-muted opacity-25"
      }`}
      aria-hidden
    >
      :
    </span>
  );
}

function TimeDigit({
  value,
  prefersReducedMotion,
  className = DIGIT_CLASS,
}: {
  value: string;
  prefersReducedMotion: boolean | null;
  className?: string;
}) {
  if (prefersReducedMotion) {
    return (
      <span
        className={`inline-block min-w-[0.95em] text-center sm:min-w-[1.05em] md:min-w-[1.1em] ${className}`}
      >
        {value}
      </span>
    );
  }

  return (
    <span
      className={`relative inline-block min-w-[0.95em] overflow-hidden text-center sm:min-w-[1.05em] md:min-w-[1.1em] ${className}`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          className="inline-block"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function LiveClock() {
  const t = useTranslations("clock");
  const tFooter = useTranslations("footer");
  const locale = useLocale();
  const prefersReducedMotion = useReducedMotion();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const parts = useMemo(() => {
    if (!now) return null;

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const hour12 = new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone,
    }).formatToParts(now);

    const get = (type: Intl.DateTimeFormatPartTypes) =>
      hour12.find((p) => p.type === type)?.value ?? "00";

    const dateLine = new Intl.DateTimeFormat(locale, {
      weekday: "long",
      day: "numeric",
      month: "long",
      timeZone,
      timeZoneName: "short",
    }).format(now);

    return {
      hours: get("hour"),
      minutes: get("minute"),
      seconds: get("second"),
      secondValue: now.getSeconds(),
      dateLine,
      timeZone,
    };
  }, [now, locale]);

  const ringOffset = parts
    ? RING_C * (1 - parts.secondValue / 60)
    : RING_C;

  return (
    <footer
      id="now"
      aria-label={t("aria")}
      className="scroll-mt-24 overflow-clip border-t border-border py-10 pb-8 sm:py-14 sm:pb-10 md:py-20 md:pb-12"
    >
      <div className={`${SITE_GUTTER} flex justify-center`}>
        <SectionReveal className="w-full max-w-3xl">
          <div className="flex flex-col items-center text-center">
            <div className="grid w-full max-w-full place-items-center px-1 py-3 sm:px-4 sm:py-4 md:px-10 md:py-6">
              <svg
                className="col-start-1 row-start-1 h-[min(72vw,16rem)] w-[min(72vw,16rem)] text-foreground sm:h-[min(78vw,18rem)] sm:w-[min(78vw,18rem)] md:h-80 md:w-80"
                viewBox="0 0 200 200"
                aria-hidden
              >
                <circle
                  cx="100"
                  cy="100"
                  r={RING_R}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity="0.1"
                  strokeWidth="1"
                />
                <circle
                  cx="100"
                  cy="100"
                  r={RING_R}
                  fill="none"
                  stroke="var(--highlight)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray={RING_C}
                  strokeDashoffset={ringOffset}
                  transform="rotate(-90 100 100)"
                  className={
                    prefersReducedMotion
                      ? undefined
                      : "transition-[stroke-dashoffset] duration-1000 ease-linear"
                  }
                />
                {parts && !prefersReducedMotion && (
                  <g transform={`rotate(${(parts.secondValue / 60) * 360} 100 100)`}>
                    <circle cx="100" cy={100 - RING_R} r="2.5" fill="var(--highlight)" />
                  </g>
                )}
              </svg>

              {parts ? (
                <div
                  className="relative z-10 col-start-1 row-start-1 flex max-w-full flex-col items-center gap-1 sm:gap-0"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <div className="flex items-baseline justify-center font-display font-extrabold tabular-nums tracking-[-0.05em] sm:tracking-[-0.06em]">
                    <TimeDigit
                      value={parts.hours}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                    <BlinkColon active={parts.secondValue % 2 === 0} />
                    <TimeDigit
                      value={parts.minutes}
                      prefersReducedMotion={prefersReducedMotion}
                    />
                    <span className="ml-1.5 hidden self-start pt-[0.35em] font-mono text-xs font-medium text-highlight tabular-nums sm:ml-2 sm:inline sm:text-sm md:text-base">
                      {parts.seconds}
                    </span>
                  </div>
                  <span className="font-mono text-sm font-medium text-highlight tabular-nums sm:hidden">
                    {parts.seconds}
                  </span>
                </div>
              ) : (
                <div
                  className="col-start-1 row-start-1 h-[min(72vw,16rem)] w-[min(72vw,16rem)] animate-pulse rounded-full bg-surface/40 sm:h-[min(78vw,18rem)] sm:w-[min(78vw,18rem)] md:h-80 md:w-80"
                  aria-hidden
                />
              )}
            </div>

            {parts && (
              <p className="mt-4 max-w-[18rem] px-2 font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-pretty text-muted sm:mt-6 sm:max-w-md sm:px-0 sm:text-[11px] sm:tracking-[0.12em] md:text-xs">
                {parts.dateLine}
              </p>
            )}

            <p className="mt-8 text-xs text-muted sm:mt-10 sm:text-sm md:mt-14">
              {tFooter("copyright", { year: now?.getFullYear() ?? new Date().getFullYear() })}
            </p>
          </div>
        </SectionReveal>
      </div>
    </footer>
  );
}
