"use client";

import { useId } from "react";

import { useFont } from "@/components/FontProvider";

export function FontSwitcher({ dark = false }: { dark?: boolean }) {
  const id = useId();
  const { font, setFont } = useFont();

  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor={id}
        className={dark ? "text-sm text-white/40" : "text-sm text-gray-500"}
      >
        Font
      </label>
      <select
        id={id}
        value={font}
        onChange={(event) => setFont(event.target.value as "syne" | "neue")}
        className={
          dark
            ? "h-10 rounded-lg border border-white/10 bg-white/5 px-3 text-sm text-white outline-none transition-colors hover:border-white/20 focus:border-primary"
            : "h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 shadow-sm outline-none transition-colors hover:border-gray-300 focus:border-primary dark:border-zinc-800 dark:bg-zinc-950 dark:text-gray-200"
        }
      >
        <option value="syne">Syne</option>
        <option value="neue">Neue Montreal</option>
      </select>
    </div>
  );
}
