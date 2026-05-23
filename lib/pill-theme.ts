export type PillTheme = "green" | "blue" | "yellow" | "white" | "black";

export const PILL_THEMES: PillTheme[] = ["green", "blue", "yellow", "white"];

export const PILL_THEME_COLORS: Record<
  PillTheme,
  { accent: string; hover: string; label: string }
> = {
  green: { accent: "#52b788", hover: "#74c69d", label: "Verde" },
  blue: { accent: "#60a5fa", hover: "#93c5fd", label: "Azul" },
  yellow: { accent: "#facc15", hover: "#fde047", label: "Amarillo" },
  white: { accent: "#ffffff", hover: "#f4f4f4", label: "Blanco" },
  black: { accent: "#000000", hover: "#1a1a1a", label: "Negro" },
};

export function getIntroThemeSequence(isDark: boolean): PillTheme[] {
  return ["green", "blue", "yellow", isDark ? "black" : "white"];
}

export function isDarkMode(): boolean {
  if (typeof document === "undefined") return true;
  return document.documentElement.classList.contains("dark");
}

export function nextPillTheme(current: PillTheme): PillTheme {
  const index = PILL_THEMES.indexOf(current);
  return PILL_THEMES[(index + 1) % PILL_THEMES.length];
}

export const GRID_COLS = 16;
export const GRID_ROWS = 7;
