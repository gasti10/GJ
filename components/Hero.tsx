"use client";

import { useTranslations } from "next-intl";
import { PILL_THEME_COLORS } from "@/lib/pill-theme";
import { SITE_GUTTER } from "@/lib/site-layout";
import { BookCallButton } from "./BookCallButton";
import { HeroItems } from "./HeroItems";
import { useHeroPlayground } from "./HeroPlaygroundProvider";
import { HeroTitle } from "./HeroTitle";
import { SectionReveal } from "./SectionReveal";
import { TechMarquee } from "./TechMarquee";

function HeroContent() {
  const t = useTranslations("hero");
  const { pillTheme } = useHeroPlayground();
  const themeColors = PILL_THEME_COLORS[pillTheme];

  return (
    <section
      className="relative overflow-hidden pt-24 pb-12 md:pt-28 md:pb-20"
      style={
        {
          "--highlight": themeColors.accent,
          "--highlight-hover": themeColors.hover,
        } as React.CSSProperties
      }
    >
      <HeroItems />

      <div className={SITE_GUTTER}>
        <HeroTitle />

        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-[1fr_1.1fr] md:items-end md:gap-16 lg:mt-12">
          <SectionReveal delay={0.9}>
            <h2 className="font-display text-2xl font-bold leading-snug tracking-tight md:text-3xl lg:text-4xl xl:text-5xl">
              {t("headline")}
            </h2>
          </SectionReveal>

          <SectionReveal delay={1}>
            <p className="max-w-xl text-sm leading-relaxed text-muted md:text-base lg:text-lg">
              {t("subheadline")}
            </p>
          </SectionReveal>
        </div>

        <SectionReveal delay={1.05}>
          <div className="mt-10 flex flex-wrap gap-3 md:mt-14">
            <a
              href="#works"
              className="inline-flex items-center rounded-full bg-foreground px-6 py-3 font-mono text-xs font-medium uppercase tracking-wider text-background transition hover:opacity-90"
            >
              {t("cta_works")}
            </a>
            <a
              href="#about"
              className="inline-flex items-center rounded-full border border-foreground/30 px-6 py-3 font-mono text-xs font-medium uppercase tracking-wider transition hover:border-foreground"
            >
              {t("cta_about")}
            </a>
            <BookCallButton variant="hero" />
          </div>
        </SectionReveal>
      </div>

      <TechMarquee />
    </section>
  );
}

export function Hero() {
  return <HeroContent />;
}
