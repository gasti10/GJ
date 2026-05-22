import { useTranslations } from "next-intl";
import { experience, type ExperienceEntry } from "@/lib/experience";
import { SITE_GUTTER } from "@/lib/site-layout";
import { SectionReveal } from "./SectionReveal";

function ExperienceItem({ entry, index }: { entry: ExperienceEntry; index: number }) {
  const t = useTranslations("experience");
  const highlights = t.raw(`${entry.translationKey}.highlights`) as string[];

  return (
    <SectionReveal delay={index * 0.06}>
      <li className="border-l-2 border-accent/40 pl-5">
        <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
          <span className="min-w-[7.5rem] shrink-0 text-sm font-medium text-accent">
            {t(`${entry.translationKey}.period`)}
          </span>
          <div className="min-w-0 flex-1 space-y-1">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <span className="text-base font-semibold text-foreground md:text-lg">
                {t(`${entry.translationKey}.role`)}
              </span>
              <span className="text-muted" aria-hidden>
                ·
              </span>
              <span className="text-base text-foreground md:text-lg">
                {t(`${entry.translationKey}.company`)}
              </span>
              {entry.kind === "project" && (
                <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                  {t("project_label")}
                </span>
              )}
            </div>
            <p className="text-sm text-muted">{t(`${entry.translationKey}.location`)}</p>
            {Array.isArray(highlights) && highlights.length > 0 && (
              <ul className="mt-2 space-y-1 text-sm leading-relaxed text-muted">
                {highlights.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="text-accent" aria-hidden>
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </li>
    </SectionReveal>
  );
}

export function Experience() {
  const t = useTranslations("experience");

  return (
    <section id="experience" className="scroll-mt-24 border-y border-border py-16 md:py-20">
      <div className={SITE_GUTTER}>
        <SectionReveal>
          <h2 className="font-display text-2xl font-extrabold tracking-tight md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            {t("subtitle")}
          </p>
        </SectionReveal>

        <ul className="mt-10 space-y-8">
          {experience.map((entry, index) => (
            <ExperienceItem key={entry.id} entry={entry} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}
