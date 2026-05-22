import type { HeroItemAction } from "./hero-actions";

export type HeroItemVariant = "pill" | "icon-only";

export type HeroItemIcon =
  | "flag-ar"
  | "flag-au"
  | "flag-br"
  | "plane"
  | "coffee"
  | "mate"
  | "graduation"
  | null;

export type HeroItemDef = {
  id: string;
  variant: HeroItemVariant;
  labelKey: string;
  icon?: HeroItemIcon;
  knockAngle?: number;
  action: HeroItemAction;
};

export type PlacedHeroItem = HeroItemDef & {
  /** Centro del footprint en % del contenedor */
  x: number;
  y: number;
  rotate: number;
  gridCol: number;
  gridRow: number;
  gridCols: number;
  gridRows: number;
  neighbors: string[];
};

export const heroItemDefs: HeroItemDef[] = [
  {
    id: "full_stack",
    variant: "pill",
    labelKey: "full_stack",
    knockAngle: 220,
    action: { type: "scroll", target: "#works" },
  },
  {
    id: "react",
    variant: "pill",
    labelKey: "react",
    knockAngle: 160,
    action: { type: "external", href: "https://react.dev" },
  },
  {
    id: "nextjs",
    variant: "pill",
    labelKey: "nextjs",
    knockAngle: 290,
    action: { type: "external", href: "https://nextjs.org" },
  },
  {
    id: "typescript",
    variant: "pill",
    labelKey: "typescript",
    knockAngle: 200,
    action: { type: "external", href: "https://www.typescriptlang.org" },
  },
  {
    id: "supabase",
    variant: "pill",
    labelKey: "supabase",
    knockAngle: 120,
    action: { type: "external", href: "https://supabase.com" },
  },
  {
    id: "postgresql",
    variant: "pill",
    labelKey: "postgresql",
    knockAngle: 340,
    action: { type: "external", href: "https://www.postgresql.org" },
  },
  {
    id: "nodejs",
    variant: "pill",
    labelKey: "nodejs",
    knockAngle: 45,
    action: { type: "external", href: "https://nodejs.org" },
  },
  {
    id: "saas",
    variant: "pill",
    labelKey: "saas",
    knockAngle: 260,
    action: { type: "scroll", target: "#project-wymaq" },
  },
  {
    id: "remote",
    variant: "pill",
    labelKey: "remote",
    knockAngle: 310,
    action: { type: "scroll", target: "#about" },
  },
  {
    id: "argentina",
    variant: "icon-only",
    labelKey: "argentina",
    icon: "flag-ar",
    knockAngle: 180,
    action: { type: "scroll", target: "#about" },
  },
  {
    id: "australia",
    variant: "icon-only",
    labelKey: "australia",
    icon: "flag-au",
    knockAngle: 90,
    action: { type: "scroll", target: "#about" },
  },
  {
    id: "brazil",
    variant: "icon-only",
    labelKey: "brazil",
    icon: "flag-br",
    knockAngle: 270,
    action: { type: "scroll", target: "#about" },
  },
  {
    id: "travel",
    variant: "pill",
    labelKey: "travel",
    icon: "plane",
    knockAngle: 140,
    action: { type: "scroll", target: "#about" },
  },
  {
    id: "antarctica",
    variant: "pill",
    labelKey: "antarctica",
    knockAngle: 200,
    action: { type: "scroll", target: "#project-antarpply" },
  },
  {
    id: "manufacturing",
    variant: "pill",
    labelKey: "manufacturing",
    knockAngle: 250,
    action: { type: "scroll", target: "#project-cladding" },
  },
  {
    id: "coffee",
    variant: "pill",
    labelKey: "coffee",
    icon: "coffee",
    knockAngle: 320,
    action: { type: "scroll", target: "#contact" },
  },
  {
    id: "mate",
    variant: "pill",
    labelKey: "mate",
    icon: "mate",
    knockAngle: 280,
    action: { type: "scroll", target: "#about" },
  },
  {
    id: "engineer",
    variant: "pill",
    labelKey: "engineer",
    icon: "graduation",
    knockAngle: 30,
    action: { type: "scroll", target: "#about" },
  },
];
