"use client";

import { AnimatePresence, motion } from "framer-motion";

import { useFont } from "@/components/FontProvider";

export function FontSwitcher({ dark = false }: { dark?: boolean }) {
  const { font, setFont } = useFont();
  const nextFont = font === "syne" ? "neue" : "syne";
  const isSyne = font === "syne";

  return (
    <button
      type="button"
      onClick={() => setFont(nextFont)}
      aria-label={`Switch font style. Current font: ${
        isSyne ? "Syne" : "Neue Montreal"
      }.`}
      title={isSyne ? "Syne" : "Neue Montreal"}
      className={
        dark
          ? "flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-white/50 outline-none transition-colors hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:ring-primary/70"
          : "flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-gray-500 outline-none transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-primary/70 dark:text-gray-400 dark:hover:bg-zinc-800 dark:hover:text-white"
      }
    >
      <span
        className={
          dark
            ? "pointer-events-none flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5"
            : "pointer-events-none flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
        }
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={font}
            initial={{ rotate: -140, scale: 0.35, opacity: 0, y: 6 }}
            animate={{ rotate: 0, scale: 1, opacity: 1, y: 0 }}
            exit={{ rotate: 120, scale: 0.35, opacity: 0, y: -6 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
              scale: { type: "spring", stiffness: 260, damping: 16 },
            }}
            className={
              isSyne
                ? dark
                  ? "font-syne text-[0.95rem] font-semibold tracking-[-0.08em] text-white"
                  : "font-syne text-[0.95rem] font-semibold tracking-[-0.08em] text-gray-900 dark:text-white"
                : dark
                  ? "font-neue text-[0.9rem] font-medium tracking-[-0.04em] text-white"
                  : "font-neue text-[0.9rem] font-medium tracking-[-0.04em] text-gray-900 dark:text-white"
            }
          >
            <span aria-hidden="true">
              A<span className="text-[0.88em] lowercase">a</span>
            </span>
          </motion.span>
        </AnimatePresence>
      </span>
    </button>
  );
}
