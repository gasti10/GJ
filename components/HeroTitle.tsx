"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  HERO_INTRO_CHAR_STAGGER,
  HERO_INTRO_MOUNT_DELAY,
} from "@/lib/hero-intro";
import { InteractiveText } from "./InteractiveText";
import { useHeroPlayground } from "./HeroPlaygroundProvider";

export function HeroTitle() {
  const t = useTranslations("hero");
  const { titleAnimationKey } = useHeroPlayground();
  const introMode = titleAnimationKey === 0;
  const mountDelay = introMode ? HERO_INTRO_MOUNT_DELAY : 0.35;
  const charStagger = introMode ? HERO_INTRO_CHAR_STAGGER : 0.045;
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [singleLine, setSingleLine] = useState(false);

  const firstName = t("name_first").toUpperCase();
  const lastName = t("name_last").toUpperCase();
  const fullName = `${firstName} ${lastName}`;

  const sizeClass =
    "text-[clamp(3rem,14vw,9rem)] font-extrabold uppercase tracking-[-0.05em]";

  useLayoutEffect(() => {
    const check = () => {
      if (!containerRef.current || !measureRef.current) return;
      const containerW = containerRef.current.clientWidth;
      const textW = measureRef.current.scrollWidth;
      setSingleLine(textW <= containerW - 8);
    };

    check();
    const ro = new ResizeObserver(check);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", check);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", check);
    };
  }, [firstName, lastName]);

  const animKey = titleAnimationKey;

  return (
    <div ref={containerRef} className="relative w-full">
      <span
        ref={measureRef}
        className={`${sizeClass} pointer-events-none invisible absolute whitespace-nowrap`}
        aria-hidden
      >
        {fullName}
      </span>

      <h1 className="font-display text-foreground" aria-label={fullName}>
        {singleLine ? (
          <span
            className={`${sizeClass} flex justify-center whitespace-nowrap leading-[0.9]`}
          >
            <InteractiveText
              key={`first-${animKey}`}
              text={firstName}
              animateOnMount
              introMode={introMode}
              introPart="first"
              introFullName={fullName}
              mountDelay={mountDelay}
            />
            <span className="inline-block w-[0.32em]" aria-hidden />
            <InteractiveText
              key={`last-${animKey}`}
              text={lastName}
              animateOnMount
              introMode={introMode}
              introPart="last"
              introFullName={fullName}
              mountDelay={mountDelay + firstName.length * charStagger}
            />
          </span>
        ) : (
          <span className={`${sizeClass} block leading-[0.82]`}>
            <span className="block whitespace-nowrap text-left">
              <InteractiveText
                key={`first-${animKey}`}
                text={firstName}
                animateOnMount
                introMode={introMode}
                introPart="first"
                introFullName={fullName}
                mountDelay={mountDelay}
              />
            </span>
            <span className="-mt-[0.06em] block whitespace-nowrap text-right">
              <InteractiveText
                key={`last-${animKey}`}
                text={lastName}
                animateOnMount
                introMode={introMode}
                introPart="last"
                introFullName={fullName}
                mountDelay={mountDelay + firstName.length * charStagger}
              />
            </span>
          </span>
        )}
      </h1>
    </div>
  );
}
