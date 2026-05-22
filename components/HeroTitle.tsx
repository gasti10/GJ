"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { InteractiveText } from "./InteractiveText";
import { useHeroPlayground } from "./HeroPlaygroundProvider";

export function HeroTitle() {
  const t = useTranslations("hero");
  const { titleAnimationKey } = useHeroPlayground();
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
              mountDelay={0.35}
            />
            <span className="inline-block w-[0.32em]" aria-hidden />
            <InteractiveText
              key={`last-${animKey}`}
              text={lastName}
              animateOnMount
              mountDelay={0.35 + firstName.length * 0.045}
            />
          </span>
        ) : (
          <span className={`${sizeClass} block leading-[0.82]`}>
            <span className="block whitespace-nowrap text-left">
              <InteractiveText
                key={`first-${animKey}`}
                text={firstName}
                animateOnMount
                mountDelay={0.35}
              />
            </span>
            <span className="-mt-[0.06em] block whitespace-nowrap text-right">
              <InteractiveText
                key={`last-${animKey}`}
                text={lastName}
                animateOnMount
                mountDelay={0.35 + firstName.length * 0.045}
              />
            </span>
          </span>
        )}
      </h1>
    </div>
  );
}
