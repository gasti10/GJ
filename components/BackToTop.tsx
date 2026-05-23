"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

const SHOW_AFTER_PX = 480;

function ArrowUpIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M12 19V5" strokeLinecap="round" />
      <path d="M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BackToTop() {
  const t = useTranslations("a11y");
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: 12, scale: 0.92 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-40 md:bottom-8 md:right-10 lg:right-14 xl:right-16 2xl:right-20"
        >
          <button
            type="button"
            onClick={scrollToTop}
            aria-label={t("back_to_top")}
            title={t("back_to_top")}
            className="group inline-flex h-10 items-center overflow-hidden rounded-full border border-foreground/40 bg-background/80 pl-3 pr-3 backdrop-blur-sm transition-[border-color,box-shadow,padding] duration-300 hover:border-highlight/60 hover:pr-4 hover:pl-2 hover:shadow-[0_0_20px_color-mix(in_srgb,var(--highlight)_25%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight"
          >
            <ArrowUpIcon />
            <span className="max-w-0 overflow-hidden whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-foreground/90 opacity-0 transition-[max-width,opacity,margin] duration-300 group-hover:ml-2 group-hover:max-w-[8rem] group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:max-w-[8rem] group-focus-visible:opacity-100">
              {t("back_to_top")}
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
