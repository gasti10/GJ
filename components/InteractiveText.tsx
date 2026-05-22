"use client";

import { motion, useReducedMotion } from "framer-motion";

type InteractiveTextProps = {
  text: string;
  className?: string;
  animateOnMount?: boolean;
  mountDelay?: number;
  charClassName?: string;
};

export function InteractiveText({
  text,
  className = "",
  animateOnMount = false,
  mountDelay = 0,
  charClassName = "",
}: InteractiveTextProps) {
  const prefersReducedMotion = useReducedMotion();
  const chars = text.split("");

  return (
    <span className={className} aria-label={text}>
      {chars.map((char, index) => {
        if (char === " ") {
          return (
            <span key={`sp-${index}`} className="inline-block w-[0.28em]" />
          );
        }

        if (prefersReducedMotion || !animateOnMount) {
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

        return (
          <motion.span
            key={`${char}-${index}`}
            className={`inline-block cursor-default hover:text-highlight ${charClassName}`}
            initial={{ opacity: 0, y: 36, color: "var(--highlight)" }}
            animate={{ opacity: 1, y: 0, color: "var(--foreground)" }}
            whileHover={{ y: -5, scale: 1.06, color: "var(--highlight)" }}
            transition={{
              opacity: { duration: 0.35, delay: mountDelay + index * 0.045 },
              y: {
                type: "spring",
                stiffness: 420,
                damping: 22,
                delay: mountDelay + index * 0.045,
              },
              color: { duration: 0.45, delay: mountDelay + index * 0.045 + 0.15 },
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </span>
  );
}
