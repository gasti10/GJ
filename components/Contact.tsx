"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { CONTACT_EMAIL, SOCIAL } from "@/lib/constants";
import { SITE_GUTTER } from "@/lib/site-layout";
import { SectionReveal } from "./SectionReveal";

const socialLinks = [
  { key: "GitHub", href: SOCIAL.github, icon: GitHubIcon },
  { key: "LinkedIn", href: SOCIAL.linkedin, icon: LinkedInIcon },
  { key: "Instagram", href: SOCIAL.instagram, icon: InstagramIcon },
] as const;

function MailIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CopyIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function EmailCopyButton({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean | null;
}) {
  const t = useTranslations("contact");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`;
    }
  };

  return (
    <motion.button
      type="button"
      onClick={handleCopy}
      aria-label={t("email_copy_aria")}
      className="group mt-8 inline-flex w-full max-w-md items-center gap-4 rounded-2xl border border-border bg-surface/60 px-5 py-4 text-left backdrop-blur-sm transition-colors hover:border-highlight/50 hover:bg-highlight/5 md:w-auto"
      whileHover={prefersReducedMotion ? undefined : { y: -3 }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
    >
      <motion.span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-background text-highlight"
        animate={
          copied && !prefersReducedMotion
            ? { scale: [1, 1.12, 1], rotate: [0, 8, 0] }
            : { scale: 1, rotate: 0 }
        }
        transition={{ duration: 0.35 }}
      >
        <MailIcon />
      </motion.span>
      <span className="min-w-0 flex-1">
        <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
          {t("email_label")}
        </span>
        <span
          className={`block text-base font-semibold transition-colors md:text-lg ${
            copied ? "text-highlight" : "text-foreground"
          }`}
        >
          {copied ? t("email_copied") : t("email_copy_hint")}
        </span>
      </span>
      <motion.span
        className={`transition-colors ${copied ? "text-highlight" : "text-muted group-hover:text-highlight"}`}
        animate={copied && !prefersReducedMotion ? { scale: [1, 1.2, 1] } : { scale: 1 }}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </motion.span>
    </motion.button>
  );
}

function GitHubIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.062 2.062 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

export function Contact() {
  const t = useTranslations("contact");
  const tA11y = useTranslations("a11y");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="contact" className="scroll-mt-24 border-t border-border py-20 md:py-28">
      <div className={SITE_GUTTER}>
        <SectionReveal>
          <h2 className="font-display text-3xl font-extrabold tracking-tight md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-3 max-w-2xl text-xl leading-relaxed text-muted md:text-2xl">
            {t("subtitle")}
          </p>
          <p className="mt-2 max-w-2xl text-base text-muted/90 md:text-lg">
            {t("meet_hint")}
          </p>

          <EmailCopyButton prefersReducedMotion={prefersReducedMotion} />

          <ul className="mt-8 flex flex-wrap gap-3">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.li
                  key={link.key}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: prefersReducedMotion ? 0 : 0.08 * index,
                    duration: 0.35,
                  }}
                >
                  <motion.a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.key} (${tA11y("external_link")})`}
                    className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/40 px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:border-highlight/50 hover:text-highlight"
                    whileHover={prefersReducedMotion ? undefined : { y: -2, scale: 1.03 }}
                    whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
                  >
                    <Icon className="h-4 w-4" />
                    {link.key}
                  </motion.a>
                </motion.li>
              );
            })}
          </ul>

        </SectionReveal>
      </div>
    </section>
  );
}
