"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { projects, type Project } from "@/lib/projects";
import { PILL_THEME_COLORS } from "@/lib/pill-theme";
import { SITE_GUTTER } from "@/lib/site-layout";
import { SectionReveal } from "./SectionReveal";

function projectAccentStyle(project: Project): CSSProperties {
  const colors = PILL_THEME_COLORS[project.accentTheme];
  return {
    "--card-accent": colors.accent,
    "--card-accent-hover": colors.hover,
  } as React.CSSProperties;
}

function ProjectCardHeader({
  project,
  name,
}: {
  project: Project;
  name: string;
}) {
  if (project.image) {
    return (
      <div className="relative h-44 overflow-hidden">
        <Image
          src={project.image}
          alt=""
          fill
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={project.slug === "cladding" || project.slug === "antarpply"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/10" />
        <div
          className="absolute inset-0 opacity-50 mix-blend-soft-light transition-opacity duration-300 group-hover:opacity-70"
          style={{
            background: `linear-gradient(135deg, color-mix(in srgb, var(--card-accent) 45%, transparent), transparent 55%)`,
          }}
        />
        <div className="relative flex h-full items-end p-6">
          <span className="font-display text-2xl font-bold text-white drop-shadow-sm">
            {name}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative flex h-44 items-end bg-gradient-to-br p-6 ${project.gradient}`}
    >
      <span className="font-display text-2xl font-bold text-white">{name}</span>
    </div>
  );
}

export function Works() {
  const t = useTranslations("works");
  const tA11y = useTranslations("a11y");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="works" className="scroll-mt-24 py-20 md:py-28">
      <div className={SITE_GUTTER}>
        <SectionReveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
        </SectionReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-12 md:gap-8">
          {projects.map((project, index) => {
            const name = t(`${project.slug}.name`);
            const description = t(`${project.slug}.description`);
            const spanClass =
              index === 0
                ? "md:col-span-7"
                : index === 1
                  ? "md:col-span-5 md:mt-16"
                  : "md:col-span-6 md:col-start-4";

            return (
              <SectionReveal
                key={project.slug}
                delay={index * 0.08}
                className={spanClass}
              >
                <motion.article
                  id={`project-${project.slug}`}
                  tabIndex={-1}
                  style={projectAccentStyle(project)}
                  whileHover={
                    prefersReducedMotion
                      ? undefined
                      : { y: -4, transition: { duration: 0.2 } }
                  }
                  className="group flex h-full scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-border bg-surface outline-none transition-[border-color,box-shadow] duration-300 hover:border-[color:var(--card-accent)] hover:shadow-[0_12px_40px_color-mix(in_srgb,var(--card-accent)_18%,transparent)] focus-visible:ring-2 focus-visible:ring-[color:var(--card-accent)]"
                >
                  <ProjectCardHeader project={project} name={name} />
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-sm leading-relaxed text-muted">
                      {description}
                    </p>
                    {project.collaboration && (
                      <p className="mt-3 text-xs leading-relaxed text-muted/90">
                        {t.rich(`${project.slug}.collaboration`, {
                          link: (chunks) => (
                            <a
                              href={project.collaboration!.partnerUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-[color:var(--card-accent)] underline-offset-2 transition hover:text-[color:var(--card-accent-hover)] hover:underline"
                            >
                              {chunks}
                            </a>
                          ),
                        })}
                      </p>
                    )}
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-[color:color-mix(in_srgb,var(--card-accent)_30%,var(--border))] bg-[color:color-mix(in_srgb,var(--card-accent)_8%,transparent)] px-2.5 py-0.5 text-xs text-foreground transition-colors group-hover:border-[color:color-mix(in_srgb,var(--card-accent)_50%,var(--border))]"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${name} — ${t("visit")} (${tA11y("external_link")})`}
                      className="mt-6 inline-flex items-center text-sm font-semibold text-[color:var(--card-accent)] transition hover:text-[color:var(--card-accent-hover)] group-hover:underline"
                    >
                      {t("visit")} →
                    </a>
                  </div>
                </motion.article>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
