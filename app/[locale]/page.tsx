import { Hero } from "@/components/Hero";
import { LiveClockLazy } from "@/components/LiveClockLazy";
import { MainShell } from "@/components/MainShell";
import { Works } from "@/components/Works";
import { Experience } from "@/components/Experience";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <MainShell>
      <Hero />
      <Works />
      <Experience />
      <About />
      <Contact />
      <LiveClockLazy />
    </MainShell>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
