"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export function WordRotate({
  words,
  className,
  duration = 1500,
  smoothWidth = false,
}: {
  words: string[];
  className?: string;
  duration?: number;
  smoothWidth?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const [widths, setWidths] = useState<number[]>([]);
  const measureRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (words.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % words.length);
    }, duration);

    return () => window.clearInterval(interval);
  }, [duration, words.length]);

  useLayoutEffect(() => {
    if (words.length === 0) {
      return;
    }

    const nextWidths = measureRefs.current.map((element) => element?.offsetWidth ?? 0);

    if (nextWidths.some((width) => width > 0)) {
      setWidths(nextWidths);
    }
  }, [words]);

  return (
    <motion.span
      animate={smoothWidth && widths[index] ? { width: widths[index] } : undefined}
      transition={smoothWidth ? { duration: 0.55, ease: [0.22, 1, 0.36, 1] } : undefined}
      className={cn("relative inline-block align-baseline whitespace-nowrap", className)}
    >
      <span className="pointer-events-none absolute -z-10 opacity-0" aria-hidden="true">
        {words.map((word, wordIndex) => (
          <span
            key={word}
            ref={(element) => {
              measureRefs.current[wordIndex] = element;
            }}
            className="inline-block"
          >
            {word}
          </span>
        ))}
      </span>

      {smoothWidth ? (
        <span className="invisible inline-block" aria-hidden="true">
          {words[index]}
        </span>
      ) : null}

      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className={cn("inline-block", smoothWidth && "absolute left-0 top-0")}
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </motion.span>
  );
}
