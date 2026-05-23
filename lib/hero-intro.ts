/** Duración por color en la intro del hero (ms). 4 × 800ms ≈ 3.2s */
export const HERO_INTRO_THEME_MS = 800;

export const HERO_INTRO_MOUNT_DELAY = 0.55;
export const HERO_INTRO_CHAR_STAGGER = 0.088;
export const HERO_INTRO_Y = 52;

/** Inicio del cierre (ms) — coincide con el último color del ciclo (negro/blanco) */
export const HERO_INTRO_FINALE_AT_MS = HERO_INTRO_THEME_MS * 3;
/** Cuánto permanece abierto el botón de color al final */
export const HERO_INTRO_FINALE_BUTTON_MS = 3600;
/** Ventana en la que las letras se asientan hacia el centro (s) */
export const HERO_INTRO_FINALE_SETTLE_SPAN = 1.05;

export function getIntroCharSettleDelay(
  globalIndex: number,
  totalLength: number,
): number {
  const center = (totalLength - 1) / 2;
  const distance = Math.abs(globalIndex - center);
  const maxDistance = Math.max(center, totalLength - 1 - center);
  const finaleStart = HERO_INTRO_FINALE_AT_MS / 1000;

  if (maxDistance === 0) return finaleStart + HERO_INTRO_FINALE_SETTLE_SPAN;

  const inward = (maxDistance - distance) / maxDistance;
  return finaleStart + inward * HERO_INTRO_FINALE_SETTLE_SPAN;
}

export function getIntroLetterGlobalIndex(
  fullName: string,
  part: "first" | "last",
  charIndexInPart: number,
): number {
  if (part === "first") return charIndexInPart;
  const firstNameLength = fullName.indexOf(" ");
  return firstNameLength + 1 + charIndexInPart;
}
