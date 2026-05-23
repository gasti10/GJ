import type { PillTheme } from "./pill-theme";

export type ProjectSlug = "cladding" | "antarpply" | "wymaq";

export type Project = {
  slug: ProjectSlug;
  url: string;
  tags: string[];
  gradient: string;
  image?: string;
  accentTheme: PillTheme;
  collaboration?: {
    partnerUrl: string;
  };
};

export const projects: Project[] = [
  {
    slug: "cladding",
    url: "https://claddingcreations.com.au",
    tags: ["React", "Supabase", "AppSheet", "Vite"],
    gradient: "from-stone-700 to-zinc-900",
    image: "/images/cladding_creations_hota.jpg",
    accentTheme: "green",
  },
  {
    slug: "antarpply",
    url: "https://antarpplyexpeditions.com",
    tags: ["Next.js", "TypeScript", "Supabase", "PayPal", "Flywire"],
    gradient: "from-slate-800 to-indigo-950",
    image: "/images/antarpply.jpg",
    accentTheme: "blue",
    collaboration: {
      partnerUrl: "https://www.mardd.com/",
    },
  },
  {
    slug: "wymaq",
    url: "https://wymaq.com",
    tags: ["SaaS", "Full Stack", "PHP", "Laravel"],
    gradient: "from-amber-700 to-orange-900",
    image: "/images/wymaq.jpg",
    accentTheme: "yellow",
  },
];
