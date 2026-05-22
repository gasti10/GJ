"use client";

import { HeroPlaygroundProvider, useHeroPlayground } from "@/components/HeroPlaygroundProvider";
import { PILL_THEME_COLORS } from "@/lib/pill-theme";
import type { CSSProperties, ReactNode } from "react";

function ThemeScope({ children }: { children: ReactNode }) {
  const { pillTheme } = useHeroPlayground();
  const colors = PILL_THEME_COLORS[pillTheme];

  return (
    <main
      id="main-content"
      style={
        {
          "--highlight": colors.accent,
          "--highlight-hover": colors.hover,
        } as CSSProperties
      }
    >
      {children}
    </main>
  );
}

export function MainShell({ children }: { children: ReactNode }) {
  return (
    <HeroPlaygroundProvider>
      <ThemeScope>{children}</ThemeScope>
    </HeroPlaygroundProvider>
  );
}
