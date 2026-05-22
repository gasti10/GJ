"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useCallback, useLayoutEffect, useRef, useState, type RefObject } from "react";
import {
  computePillOffsets,
  generateHeroLayout,
} from "@/lib/generate-hero-layout";
import { executeHeroAction } from "@/lib/hero-actions";
import type { HeroItemDef, PlacedHeroItem } from "@/lib/hero-items";
import { SITE_GUTTER } from "@/lib/site-layout";
import { HeroControls } from "./HeroControls";
import { useHeroPlayground } from "./HeroPlaygroundProvider";
import { HeroItemIcon } from "./icons/HeroIcons";

const PILL_BASE =
  "inline-flex items-center rounded-full border border-foreground/30 bg-background/60 backdrop-blur-sm transition-colors duration-300 hover:border-highlight/50 hover:bg-highlight/10 hover:text-highlight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-highlight";

function ItemContent({ item, label }: { item: HeroItemDef; label: string }) {
  if (item.variant === "icon-only" && item.icon) {
    return <HeroItemIcon icon={item.icon} className="h-6 w-6 rounded-sm" />;
  }

  return (
    <span className="flex items-center gap-1.5 whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.12em] md:text-xs">
      {item.icon && (
        <HeroItemIcon icon={item.icon} className="h-3.5 w-3.5 shrink-0" />
      )}
      {label}
    </span>
  );
}

function itemClass(item: HeroItemDef) {
  if (item.variant === "icon-only") {
    return `${PILL_BASE} h-10 w-10 justify-center overflow-hidden p-0`;
  }
  return `${PILL_BASE} px-4 py-2`;
}

function MobileItemsList({
  layout,
  layoutKey,
}: {
  layout: PlacedHeroItem[];
  layoutKey: number;
}) {
  const t = useTranslations("hero.items");
  const tA11y = useTranslations("hero.items_a11y");

  return (
    <ul className="flex flex-wrap justify-center gap-2 md:hidden">
      {layout.map((item) => {
        const label = t(item.labelKey);
        return (
          <li key={`${item.id}-${layoutKey}`}>
            <button
              type="button"
              onClick={() => executeHeroAction(item.action)}
              className={`${itemClass(item)} cursor-pointer font-mono select-none`}
              aria-label={tA11y(item.labelKey)}
            >
              <ItemContent item={item} label={label} />
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function DesktopItemsGrid({
  layout,
  layoutKey,
  containerRef,
}: {
  layout: PlacedHeroItem[];
  layoutKey: number;
  containerRef: RefObject<HTMLDivElement | null>;
}) {
  const t = useTranslations("hero.items");
  const tA11y = useTranslations("hero.items_a11y");
  const prefersReducedMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [offsets, setOffsets] = useState<Record<string, { x: number; y: number }>>(
    {},
  );

  const updateOffsets = useCallback(
    (id: string | null) => {
      if (!id || !containerRef.current) {
        setOffsets({});
        return;
      }
      const { width, height } = containerRef.current.getBoundingClientRect();
      setOffsets(computePillOffsets(layout, id, width, height));
    },
    [containerRef, layout],
  );

  useLayoutEffect(() => {
    updateOffsets(hoveredId);
  }, [hoveredId, updateOffsets]);

  return (
    <ul
      className="relative hidden md:block md:h-56 lg:h-64 xl:h-72"
      onMouseLeave={() => {
        setHoveredId(null);
        setOffsets({});
      }}
    >
      {layout.map((item, index) => {
        const label = t(item.labelKey);
        const offset = offsets[item.id] ?? { x: 0, y: 0 };

        return (
          <motion.li
            key={`${item.id}-${layoutKey}`}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
            }}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
            animate={{
              opacity: 1,
              x: offset.x,
              y: offset.y,
              rotate: item.rotate,
            }}
            transition={{
              delay: prefersReducedMotion ? 0 : index * 0.03,
              type: "spring",
              stiffness: 420,
              damping: 26,
            }}
          >
            <motion.button
              type="button"
              className={`${itemClass(item)} cursor-pointer select-none font-mono`}
              onClick={() => executeHeroAction(item.action)}
              onMouseEnter={() => setHoveredId(item.id)}
              aria-label={tA11y(item.labelKey)}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
            >
              <ItemContent item={item} label={label} />
            </motion.button>
          </motion.li>
        );
      })}
    </ul>
  );
}

export function HeroItems() {
  const tA11y = useTranslations("hero.items_a11y");
  const { layoutKey, itemsVisible } = useHeroPlayground();
  const containerRef = useRef<HTMLDivElement>(null);

  const [layout, setLayout] = useState<PlacedHeroItem[] | null>(null);

  useLayoutEffect(() => {
    // Generación solo en cliente para evitar mismatch con Math.random()
    // eslint-disable-next-line react-hooks/set-state-in-effect -- layout intencional post-hidratación
    setLayout(generateHeroLayout());
  }, [layoutKey]);

  return (
    <div
      ref={containerRef}
      className={`relative mb-4 w-full md:mb-6 ${SITE_GUTTER}`}
      aria-label={tA11y("container")}
    >
      {layout && itemsVisible && (
        <>
          <MobileItemsList layout={layout} layoutKey={layoutKey} />
          <DesktopItemsGrid
            layout={layout}
            layoutKey={layoutKey}
            containerRef={containerRef}
          />
        </>
      )}

      <HeroControls />
    </div>
  );
}
