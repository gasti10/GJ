import { useTranslations } from "next-intl";
import {
  educationExperience,
  workExperience,
  type ExperienceEntry,
} from "@/lib/experience";
import { SITE_GUTTER } from "@/lib/site-layout";
import { SectionReveal } from "./SectionReveal";

function KindBadge({
  kind,
  label,
}: {
  kind: ExperienceEntry["kind"];
  label: string;
}) {
  if (kind === "job") return null;

  return (
    <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
      {label}
    </span>
  );
}

function ExperienceItem({
  entry,
  index,
  projectLabel,
  educationLabel,
}: {
  entry: ExperienceEntry;
  index: number;
  projectLabel: string;
  educationLabel: string;
}) {
  const t = useTranslations("experience");
  const tA11y = useTranslations("a11y");
  const highlights = t.raw(`${entry.translationKey}.highlights`) as string[];
  const badgeLabel = entry.kind === "project" ? projectLabel : educationLabel;
  const isEducation = entry.kind === "education";

  return (
    <SectionReveal delay={index * 0.06}>
      <li
        className={`border-l-2 pl-5 ${
          isEducation ? "border-muted/50" : "border-accent/40"
        }`}
      >
        <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-6">
          <span
            className={`min-w-[7.5rem] shrink-0 text-sm font-medium ${
              isEducation ? "text-muted" : "text-accent"
            }`}
          >
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
              <KindBadge kind={entry.kind} label={badgeLabel} />
            </div>
            <p className="text-sm text-muted">
              {t(`${entry.translationKey}.location`)}
            </p>
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
            {entry.links && entry.links.length > 0 && (
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
                {entry.links.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${t(`${entry.translationKey}.${link.labelKey}`)} (${tA11y("external_link")})`}
                      className="text-sm font-semibold text-accent transition hover:underline"
                    >
                      {t(`${entry.translationKey}.${link.labelKey}`)} →
                    </a>
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

function ExperienceList({
  entries,
  startIndex,
  projectLabel,
  educationLabel,
}: {
  entries: ExperienceEntry[];
  startIndex: number;
  projectLabel: string;
  educationLabel: string;
}) {
  return (
    <ul className="space-y-8">
      {entries.map((entry, index) => (
        <ExperienceItem
          key={entry.id}
          entry={entry}
          index={startIndex + index}
          projectLabel={projectLabel}
          educationLabel={educationLabel}
        />
      ))}
    </ul>
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

        <div className="mt-10">
          <ExperienceList
            entries={workExperience}
            startIndex={0}
            projectLabel={t("project_label")}
            educationLabel={t("education_label")}
          />
        </div>

        <SectionReveal delay={0.12}>
          <h3 className="mt-14 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted">
            {t("education_heading")}
          </h3>
        </SectionReveal>

        <div className="mt-6">
          <ExperienceList
            entries={educationExperience}
            startIndex={workExperience.length}
            projectLabel={t("project_label")}
            educationLabel={t("education_label")}
          />
        </div>
      </div>
    </section>
  );
}
