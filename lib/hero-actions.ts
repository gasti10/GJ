export type HeroItemAction =
  | { type: "scroll"; target: string }
  | { type: "external"; href: string };

const HIGHLIGHT_CLASS = "project-highlight";

export function executeHeroAction(action: HeroItemAction) {
  if (action.type === "external") {
    window.open(action.href, "_blank", "noopener,noreferrer");
    return;
  }

  const el = document.querySelector(action.target);
  if (!(el instanceof HTMLElement)) return;

  el.scrollIntoView({ behavior: "smooth", block: "center" });
  el.focus({ preventScroll: true });
  el.classList.add(HIGHLIGHT_CLASS);
  window.setTimeout(() => el.classList.remove(HIGHLIGHT_CLASS), 2200);
}
