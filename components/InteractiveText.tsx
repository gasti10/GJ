"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  HERO_INTRO_CHAR_STAGGER,
  HERO_INTRO_Y,
  getIntroCharSettleDelay,
  getIntroLetterGlobalIndex,
} from "@/lib/hero-intro";

type InteractiveTextProps = {
  text: string;
  className?: string;
  animateOnMount?: boolean;
  mountDelay?: number;
  charClassName?: string;
  introMode?: boolean;
  introPart?: "first" | "last";
  introFullName?: string;
};

function AnimatedChar({
  char,
  charDelay,
  settleDelay,
  introMode,
  charClassName,
}: {
  char: string;
  charDelay: number;
  settleDelay: number;
  introMode: boolean;
  charClassName: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const entryY = introMode ? HERO_INTRO_Y : 36;
  const [settled, setSettled] = useState(!introMode);

  useEffect(() => {
    if (!introMode) return;
    const id = window.setTimeout(() => setSettled(true), settleDelay * 1000);
    return () => window.clearTimeout(id);
  }, [introMode, settleDelay]);

  if (prefersReducedMotion) {
    return (
      <motion.span
        className={`inline-block cursor-default transition-colors duration-300 hover:text-highlight ${charClassName}`}
        whileHover={{ y: -5, scale: 1.06 }}
        transition={{ type: "spring", stiffness: 500, damping: 18 }}
      >
        {char}
      </motion.span>
    );
  }

  return (
    <motion.span
      className={`inline-block cursor-default transition-colors duration-700 ease-out hover:text-highlight ${
        settled ? "text-foreground" : "text-highlight"
      } ${charClassName}`}
      initial={{ opacity: 0, y: entryY }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.06 }}
      transition={{
        opacity: {
          duration: introMode ? 0.55 : 0.35,
          delay: charDelay,
        },
        y: {
          type: "spring",
          stiffness: introMode ? 300 : 420,
          damping: introMode ? 28 : 22,
          delay: charDelay,
        },
      }}
    >
      {char}
    </motion.span>
  );
}

export function InteractiveText({
  text,
  className = "",
  animateOnMount = false,
  mountDelay = 0,
  charClassName = "",
  introMode = false,
  introPart = "first",
  introFullName = "",
}: InteractiveTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const chars = text.split("");
  const charStagger = introMode ? HERO_INTRO_CHAR_STAGGER : 0.045;
  let letterOffset = 0;

  return (
    <span className={className} aria-label={text}>
      {chars.map((char, index) => {
        if (char === " ") {
          return (
            <span key={`sp-${index}`} className="inline-block w-[0.28em]" />
          );
        }

        const charDelay = mountDelay + letterOffset * charStagger;
        const settleDelay =
          introMode && introFullName
            ? getIntroCharSettleDelay(
                getIntroLetterGlobalIndex(introFullName, introPart, letterOffset),
                introFullName.length,
              )
            : charDelay + 0.15;
        letterOffset += 1;

        if (!animateOnMount || prefersReducedMotion) {
          return (
            <motion.span
              key={`${char}-${index}`}
              className={`inline-block cursor-default transition-colors duration-300 hover:text-highlight ${charClassName}`}
              whileHover={{ y: -5, scale: 1.06 }}
              transition={{ type: "spring", stiffness: 500, damping: 18 }}
            >
              {char}
            </motion.span>
          );
        }

        if (introMode) {
          return (
            <AnimatedChar
              key={`${char}-${index}`}
              char={char}
              charDelay={charDelay}
              settleDelay={settleDelay}
              introMode
              charClassName={charClassName}
            />
          );
        }

        return (
          <motion.span
            key={`${char}-${index}`}
            className={`inline-block cursor-default hover:text-highlight ${charClassName}`}
            initial={{ opacity: 0, y: 36, color: "var(--highlight)" }}
            animate={{ opacity: 1, y: 0, color: "var(--foreground)" }}
            whileHover={{ y: -5, scale: 1.06, color: "var(--highlight)" }}
            transition={{
              opacity: { duration: 0.35, delay: charDelay },
              y: {
                type: "spring",
                stiffness: 420,
                damping: 22,
                delay: charDelay,
              },
              color: {
                duration: 0.45,
                delay: charDelay + 0.15,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </span>
  );
}
