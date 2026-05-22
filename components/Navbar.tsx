"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { SITE_GUTTER } from "@/lib/site-layout";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { href: "#works", key: "works" as const },
  { href: "#about", key: "about" as const },
  { href: "#contact", key: "contact" as const },
];

function MenuIcon({ open }: { open: boolean }) {
  if (open) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M6 6l12 12M18 6L6 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Navbar() {
  const t = useTranslations("nav");
  const tA11y = useTranslations("a11y");
  const prefersReducedMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (mq.matches) setMenuOpen(false);
    };
    closeOnDesktop();
    mq.addEventListener("change", closeOnDesktop);
    return () => mq.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const navLinkClass =
    "font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted transition hover:text-foreground md:text-xs";

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "border-b border-border/60 bg-background/80 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-highlight focus:px-4 focus:py-2 focus:text-background"
      >
        {tA11y("skip_to_content")}
      </a>
      <nav
        className={`flex items-center justify-between py-4 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:py-6 ${SITE_GUTTER}`}
        aria-label={tA11y("navigation")}
      >
        <Logo />

        <ul className="hidden items-center gap-6 md:flex md:gap-10">
          {navItems.map((item) => (
            <li key={item.key}>
              <a href={item.href} className={navLinkClass}>
                {t(item.key)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center justify-end gap-2 md:gap-3">
          <LocaleSwitcher className="max-[360px]:hidden" />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? tA11y("menu_close") : tA11y("menu_open")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:border-accent hover:text-accent md:hidden"
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden border-t border-border/40 bg-background/95 backdrop-blur-md md:hidden"
          >
            <div className={`${SITE_GUTTER} py-5`}>
              <ul className="flex flex-col gap-5">
                {navItems.map((item) => (
                  <li key={item.key}>
                    <a
                      href={item.href}
                      onClick={closeMenu}
                      className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted transition hover:text-foreground"
                    >
                      {t(item.key)}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-5 hidden border-t border-border/40 pt-5 max-[360px]:block">
                <LocaleSwitcher />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
