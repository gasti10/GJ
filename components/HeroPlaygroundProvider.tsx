"use client";

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { nextPillTheme, type PillTheme } from "@/lib/pill-theme";

type HeroPlaygroundContextValue = {
  pillTheme: PillTheme;
  layoutKey: number;
  titleAnimationKey: number;
  itemsVisible: boolean;
  regenerateLayout: () => void;
  cyclePillTheme: () => void;
  toggleItemsVisibility: () => void;
};

const HeroPlaygroundContext = createContext<HeroPlaygroundContextValue | null>(
  null,
);

export function HeroPlaygroundProvider({ children }: { children: ReactNode }) {
  const [pillTheme, setPillTheme] = useState<PillTheme>("green");
  const [layoutKey, setLayoutKey] = useState(0);
  const [titleAnimationKey, setTitleAnimationKey] = useState(0);
  const [itemsVisible, setItemsVisible] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    setItemsVisible(window.matchMedia("(min-width: 768px)").matches);
  }, []);

  const regenerateLayout = useCallback(() => {
    setLayoutKey((k) => k + 1);
  }, []);

  const toggleItemsVisibility = useCallback(() => {
    setItemsVisible((visible) => !(visible ?? false));
  }, []);

  const cyclePillTheme = useCallback(() => {
    setPillTheme((current) => nextPillTheme(current));
    setTitleAnimationKey((k) => k + 1);
  }, []);

  const resolvedItemsVisible = itemsVisible ?? false;

  const value = useMemo(
    () => ({
      pillTheme,
      layoutKey,
      titleAnimationKey,
      itemsVisible: resolvedItemsVisible,
      regenerateLayout,
      cyclePillTheme,
      toggleItemsVisibility,
    }),
    [
      pillTheme,
      layoutKey,
      titleAnimationKey,
      resolvedItemsVisible,
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
