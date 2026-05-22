"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

const locales: Locale[] = [...routing.locales];

export function LocaleSwitcher({ className = "" }: { className?: string }) {
  const t = useTranslations("a11y");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (nextLocale: Locale) => {
    const hash =
      typeof window !== "undefined" ? window.location.hash : "";
    router.replace(`${pathname}${hash}`, { locale: nextLocale });
  };

  return (
    <div
      className={`flex shrink-0 items-center gap-1 text-xs font-medium tracking-wide ${className}`}
      role="group"
      aria-label={t("locale_switcher")}
    >
      {locales.map((code, index) => (
        <span key={code} className="flex items-center gap-1">
          {index > 0 && (
            <span className="text-muted" aria-hidden>
              ·
            </span>
          )}
          <button
            type="button"
            onClick={() => switchLocale(code)}
            aria-current={locale === code ? "true" : undefined}
            className={`uppercase transition ${
              locale === code
                ? "text-accent"
                : "text-muted hover:text-foreground"
            }`}
          >
            {code}
          </button>
        </span>
      ))}
    </div>
  );
}
