export type ExperienceKind = "job" | "project";

export type ExperienceEntry = {
  id: string;
  kind: ExperienceKind;
  translationKey:
    | "cladding"
    | "wymaq"
    | "antarpply"
    | "matrice";
};

/** Experiencia curada — alineada con Works y perfil internacional */
export const experience: ExperienceEntry[] = [
  {
    id: "cladding",
    kind: "job",
    translationKey: "cladding",
  },
  {
    id: "antarpply",
    kind: "project",
    translationKey: "antarpply",
  },
  {
    id: "wymaq",
    kind: "job",
    translationKey: "wymaq",
  },
  {
    id: "matrice",
    kind: "job",
    translationKey: "matrice",
  },
];
