"use client";

import { Navbar } from "@/components/Navbar";
import { BackToTop } from "@/components/BackToTop";
import {
  HeroPlaygroundProvider,
  useHeroPlayground,
} from "@/components/HeroPlaygroundProvider";
import { PILL_THEME_COLORS } from "@/lib/pill-theme";
import type { CSSProperties, ReactNode } from "react";

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
