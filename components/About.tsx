import Image from "next/image";
import { useTranslations } from "next-intl";
import { SOCIAL } from "@/lib/constants";
import { SITE_GUTTER } from "@/lib/site-layout";
import { SectionReveal } from "./SectionReveal";

const socialLinks = [
  { key: "GitHub", href: SOCIAL.github },
  { key: "LinkedIn", href: SOCIAL.linkedin },
  { key: "Instagram", href: SOCIAL.instagram },
] as const;

export function About() {
  const t = useTranslations("about");
  const tA11y = useTranslations("a11y");

  return (
    <section id="about" className="scroll-mt-24 py-20 md:py-28">
      <div className={SITE_GUTTER}>
        <SectionReveal>
          <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-start md:gap-14">
            <div className="relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-border bg-surface md:mx-0 md:h-32 md:w-32">
              <Image
                src="/images/about_me.JPG"
                alt={t("photo_alt")}
                fill
                className="object-cover object-[center_20%]"
                sizes="(max-width: 768px) 112px, 128px"
                priority
              />
            </div>

            <div>
              <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-5xl">
                {t("title")}
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                {t("body")}
              </p>
              <ul className="mt-8 flex flex-wrap gap-4">
                {socialLinks.map((link) => (
                  <li key={link.key}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${link.key} (${tA11y("external_link")})`}
                      className="text-sm font-semibold text-accent transition hover:underline"
                    >
                      {link.key}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
