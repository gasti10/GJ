"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/Navbar";
import {
  HeroPlaygroundProvider,
  useHeroPlayground,
} from "@/components/HeroPlaygroundProvider";
import { PILL_THEME_COLORS } from "@/lib/pill-theme";
import type { CSSProperties, ReactNode } from "react";

const BackToTop = dynamic(
  () => import("@/components/BackToTop").then((m) => m.BackToTop),
  { ssr: false },
);

function ThemeScope({ children }: { children: ReactNode }) {
  const { pillTheme } = useHeroPlayground();
  const colors = PILL_THEME_COLORS[pillTheme];

  return (
    <div
      style={
        {
          "--highlight": colors.accent,
          "--highlight-hover": colors.hover,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

export function MainShell({ children }: { children: ReactNode }) {
  return (
    <HeroPlaygroundProvider>
      <ThemeScope>
        <Navbar />
        <main id="main-content">{children}</main>
        <BackToTop />
      </ThemeScope>
    </HeroPlaygroundProvider>
  );
}
