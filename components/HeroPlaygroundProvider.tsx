"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { HERO_INTRO_FINALE_AT_MS, HERO_INTRO_FINALE_BUTTON_MS, HERO_INTRO_THEME_MS } from "@/lib/hero-intro";
import { getIntroThemeSequence, isDarkMode, nextPillTheme, type PillTheme } from "@/lib/pill-theme";

type HeroPlaygroundContextValue = {
  pillTheme: PillTheme;
  layoutKey: number;
  titleAnimationKey: number;
  itemsVisible: boolean;
  introColorHint: boolean;
  regenerateLayout: () => void;
  cyclePillTheme: () => void;
  toggleItemsVisibility: () => void;
};

const HeroPlaygroundContext = createContext<HeroPlaygroundContextValue | null>(
  null,
);

export function HeroPlaygroundProvider({ children }: { children: ReactNode }) {
  const introStarted = useRef(false);
  const [pillTheme, setPillTheme] = useState<PillTheme>("green");
  const [layoutKey, setLayoutKey] = useState(0);
  const [titleAnimationKey, setTitleAnimationKey] = useState(0);
  const [itemsVisible, setItemsVisible] = useState(false);
  const [introColorHint, setIntroColorHint] = useState(false);

  useEffect(() => {
    if (introStarted.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    introStarted.current = true;
    const timeouts: number[] = [];
    const introThemes = getIntroThemeSequence(isDarkMode());

    introThemes.forEach((theme, index) => {
      if (index === 0) return;
      timeouts.push(
        window.setTimeout(
          () => setPillTheme(theme),
          HERO_INTRO_THEME_MS * index,
        ),
      );
    });

    timeouts.push(
      window.setTimeout(
        () => setPillTheme("green"),
        HERO_INTRO_THEME_MS * introThemes.length,
      ),
    );

    timeouts.push(
      window.setTimeout(() => setIntroColorHint(true), HERO_INTRO_FINALE_AT_MS),
    );

    timeouts.push(
      window.setTimeout(
        () => setIntroColorHint(false),
        HERO_INTRO_FINALE_AT_MS + HERO_INTRO_FINALE_BUTTON_MS,
      ),
    );

    return () => {
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const regenerateLayout = useCallback(() => {
    setLayoutKey((k) => k + 1);
  }, []);

  const toggleItemsVisibility = useCallback(() => {
    setItemsVisible((visible) => !visible);
  }, []);

  const cyclePillTheme = useCallback(() => {
    setPillTheme((current) => nextPillTheme(current));
    setTitleAnimationKey((k) => k + 1);
  }, []);

  const value = useMemo(
    () => ({
      pillTheme,
      layoutKey,
      titleAnimationKey,
      itemsVisible,
      introColorHint,
      regenerateLayout,
      cyclePillTheme,
      toggleItemsVisibility,
    }),
    [
      pillTheme,
      layoutKey,
      titleAnimationKey,
      itemsVisible,
      introColorHint,
      regenerateLayout,
      cyclePillTheme,
      toggleItemsVisibility,
    ],
  );

  return (
    <HeroPlaygroundContext.Provider value={value}>
      {children}
    </HeroPlaygroundContext.Provider>
  );
}

export function useHeroPlayground(): HeroPlaygroundContextValue {
  const ctx = useContext(HeroPlaygroundContext);
  if (!ctx) {
    throw new Error(
      "useHeroPlayground must be used within HeroPlaygroundProvider",
    );
  }
  return ctx;
}
