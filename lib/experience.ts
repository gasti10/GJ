export type ExperienceKind = "job" | "project" | "education";

export type ExperienceGroup = "work" | "education";

export type ExperienceLink = {
  url: string;
  labelKey: string;
};

export type ExperienceEntry = {
  id: string;
  kind: ExperienceKind;
  group: ExperienceGroup;
  translationKey:
    | "cladding"
    | "wymaq"
    | "antarpply"
    | "matrice"
    | "softtek"
    | "uns"
    | "unlp";
  links?: ExperienceLink[];
};

export const workExperience: ExperienceEntry[] = [
  {
    id: "cladding",
    kind: "job",
    group: "work",
    translationKey: "cladding",
  },
  {
    id: "antarpply",
    kind: "project",
    group: "work",
    translationKey: "antarpply",
  },
  {
    id: "wymaq",
    kind: "job",
    group: "work",
    translationKey: "wymaq",
  },
  {
    id: "matrice",
    kind: "job",
    group: "work",
    translationKey: "matrice",
  },
  {
    id: "softtek",
    kind: "job",
    group: "work",
    translationKey: "softtek",
  },
];

export const educationExperience: ExperienceEntry[] = [
  {
    id: "unlp",
    kind: "education",
    group: "education",
    translationKey: "unlp",
    links: [
      {
        url: "https://www.agro.unlp.edu.ar/ensenanza/carreras/tecnicatura-universitaria-en-cultivos-protegidos-y-ambientes-controlados/",
        labelKey: "link_program",
      },
    ],
  },
  {
    id: "uns",
    kind: "education",
    group: "education",
    translationKey: "uns",
    links: [
      {
        url: "https://github.com/gasti10/animalstrack",
        labelKey: "link_final_project",
      },
    ],
  },
];

export const experience: ExperienceEntry[] = [
  ...workExperience,
  ...educationExperience,
];
