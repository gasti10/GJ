"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  PILL_THEME_COLORS,
  PILL_THEMES,
  type PillTheme,
} from "@/lib/pill-theme";
import { useHeroPlayground } from "@/components/HeroPlaygroundProvider";

function EyeIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c6.5 0 10 7 10 7a18.45 18.45 0 0 1-2.16 3.19M6.72 6.72A10.94 10.94 0 0 0 2 12s3.5 7 10 7a10.8 10.8 0 0 0 5.01-1.22" strokeLinecap="round" />
      <path d="M2 2l20 20" strokeLinecap="round" />
      <path d="M14.12 14.12A3 3 0 0 1 9.88 9.88" strokeLinecap="round" />
    </svg>
  );
}

function ShuffleIcon() {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path
        d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PaletteIcon({ color }: { color: string }) {
  return (
    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3" fill={color} stroke="none" />
    </svg>
  );
}

function ColorPreviewDots({ active }: { active: PillTheme }) {
  return (
    <span className="ml-1.5 inline-flex items-center gap-0.5" aria-hidden>
      {PILL_THEMES.map((theme) => (
        <span
          key={theme}
          className="h-1.5 w-1.5 rounded-full transition-transform duration-300"
          style={{
            backgroundColor: PILL_THEME_COLORS[theme].accent,
            transform: theme === active ? "scale(1.35)" : "scale(1)",
            opacity: theme === active ? 1 : 0.55,
          }}
        />
      ))}
    </span>
  );
}

type ControlButtonProps = {
  label: string;
  tease?: string;
  ariaLabel: string;
  onClick: () => void;
  icon: ReactNode;
  showHint?: boolean;
  entice?: boolean;
  extra?: ReactNode;
};

function ControlButton({
  label,
  tease,
  ariaLabel,
  onClick,
  icon,
  showHint = false,
  entice = false,
  extra,
}: ControlButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const expanded = hovered || showHint;

  return (
    <motion.div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      animate={
        entice && !prefersReducedMotion && !expanded
          ? { scale: [1, 1.04, 1] }
          : { scale: 1 }
      }
      transition={
        entice && !expanded
          ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
          : undefined
      }
    >
      {entice && !expanded && !prefersReducedMotion && (
        <span
          className="pointer-events-none absolute inset-0 rounded-full border border-highlight/40"
          aria-hidden
          style={{
            animation: "control-ring-pulse 2.4s ease-in-out infinite",
          }}
        />
      )}

      <button
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        title={label}
        className={`group/btn relative inline-flex h-10 items-center overflow-hidden rounded-full border border-foreground/40 bg-background/80 backdrop-blur-sm transition-[border-color,box-shadow,width] duration-300 hover:border-highlight/60 hover:shadow-[0_0_20px_color-mix(in_srgb,var(--highlight)_25%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight ${
          expanded ? "border-highlight/50 pr-3 pl-1" : "w-10 justify-center"
        }`}
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center">
          {icon}
        </span>

        <motion.span
          className="flex items-center overflow-hidden whitespace-nowrap font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-foreground/90"
          initial={false}
          animate={{
            width: expanded ? "auto" : 0,
            opacity: expanded ? 1 : 0,
            marginRight: expanded ? 4 : 0,
          }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="pr-0.5">{label}</span>
          {tease && (
            <span className="text-highlight/80 normal-case tracking-normal">
              {tease}
            </span>
          )}
          {extra}
        </motion.span>
      </button>
    </motion.div>
  );
}

const SCROLL_HINT_MS = 4200;
const SCROLL_THRESHOLD = 24;

export function HeroControls() {
  const t = useTranslations("hero.controls");
  const { pillTheme, itemsVisible, regenerateLayout, cyclePillTheme, toggleItemsVisibility } =
    useHeroPlayground();
  const themeColor = PILL_THEME_COLORS[pillTheme].accent;
  const themeLabel = t(`themes.${pillTheme}` as `themes.${typeof pillTheme}`);

  const [showScrollHint, setShowScrollHint] = useState(false);
  const [hasUsedColor, setHasUsedColor] = useState(false);
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);

  const triggerScrollHint = useCallback(() => {
    setShowScrollHint(true);
    if (hintTimer.current) clearTimeout(hintTimer.current);
    hintTimer.current = setTimeout(() => setShowScrollHint(false), SCROLL_HINT_MS);
  }, []);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const onScroll = () => {
      const delta = Math.abs(window.scrollY - lastScrollY.current);
      lastScrollY.current = window.scrollY;
      if (delta >= SCROLL_THRESHOLD || window.scrollY > SCROLL_THRESHOLD) {
        triggerScrollHint();
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (hintTimer.current) clearTimeout(hintTimer.current);
    };
  }, [triggerScrollHint]);

  const handleColorClick = () => {
    setHasUsedColor(true);
    cyclePillTheme();
  };

  return (
    <div className="relative z-30 mt-3 flex justify-center gap-2">
      <ControlButton
        label={t("color_label")}
        tease={t("color_tease")}
        ariaLabel={t("color", { theme: themeLabel })}
        onClick={handleColorClick}
        showHint={showScrollHint}
        entice={!hasUsedColor}
        icon={<PaletteIcon color={themeColor} />}
        extra={<ColorPreviewDots active={pillTheme} />}
      />
      <ControlButton
        label={itemsVisible ? t("hide_label") : t("show_label")}
        tease={itemsVisible ? t("hide_tease") : t("show_tease")}
        ariaLabel={itemsVisible ? t("hide") : t("show")}
        onClick={toggleItemsVisibility}
        icon={itemsVisible ? <EyeOffIcon /> : <EyeIcon />}
      />
      {itemsVisible && (
        <ControlButton
          label={t("shuffle_label")}
          tease={t("shuffle_tease")}
          ariaLabel={t("shuffle")}
          onClick={regenerateLayout}
          icon={<ShuffleIcon />}
        />
      )}
    </div>
  );
}
