import type { Locale } from "@/i18n/routing";

export function mapLocaleToCal(locale: Locale | string): string {
  if (locale === "en") return "en";
  if (locale === "pt") return "pt-BR";
  return "es";
}
