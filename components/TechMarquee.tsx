"use client";

import {
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siSupabase,
  siTypescript,
  type SimpleIcon,
} from "simple-icons";

type TechBrand = {
  id: string;
  label: string;
  icon: SimpleIcon;
};

const techBrands: TechBrand[] = [
  { id: "react", label: "React", icon: siReact },
  { id: "nextjs", label: "Next.js", icon: siNextdotjs },
  { id: "typescript", label: "TypeScript", icon: siTypescript },
  { id: "supabase", label: "Supabase", icon: siSupabase },
  { id: "postgresql", label: "PostgreSQL", icon: siPostgresql },
  { id: "nodejs", label: "Node.js", icon: siNodedotjs },
];

function BrandMark({ icon }: { icon: SimpleIcon }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className="h-7 w-7 shrink-0 opacity-50 md:h-8 md:w-8"
      fill="currentColor"
      aria-hidden
    >
      <path d={icon.path} />
    </svg>
  );
}

function BrandItem({ brand }: { brand: TechBrand }) {
  return (
    <span className="flex shrink-0 items-center gap-3 text-foreground md:gap-4">
      <span className="font-mono text-xl font-medium uppercase tracking-tight opacity-40 md:text-2xl lg:text-3xl">
        {brand.label}
      </span>
      <BrandMark icon={brand.icon} />
    </span>
  );
}

export function TechMarquee() {
  return (
    <div
      className="mt-16 overflow-hidden border-y border-border py-4 md:mt-24 md:py-6"
      aria-hidden
    >
      <div className="flex w-max animate-marquee items-center gap-12 md:gap-20">
        {[0, 1].map((copy) =>
          techBrands.map((brand) => (
            <BrandItem key={`${copy}-${brand.id}`} brand={brand} />
          )),
        )}
      </div>
    </div>
  );
}
