"use client";

import * as React from "react";

type FontName = "syne" | "neue";

type FontContextValue = {
  font: FontName;
  setFont: (font: FontName) => void;
};

const FontContext = React.createContext<FontContextValue | null>(null);

const STORAGE_KEY = "reachdem-font";

export function FontProvider({ children }: { children: React.ReactNode }) {
  const [font, setFontState] = React.useState<FontName>("syne");

  React.useEffect(() => {
    const storedFont = window.localStorage.getItem(STORAGE_KEY);

    if (storedFont === "neue" || storedFont === "syne") {
      setFontState(storedFont);
    }
  }, []);

  React.useEffect(() => {
    document.body.dataset.font = font;
    document.body.classList.toggle("font-neue", font === "neue");
    document.body.classList.toggle("font-syne-default", font === "syne");
    window.localStorage.setItem(STORAGE_KEY, font);
  }, [font]);

  const value = React.useMemo(
    () => ({
      font,
      setFont: setFontState,
    }),
    [font],
  );

  return <FontContext.Provider value={value}>{children}</FontContext.Provider>;
}

export function useFont() {
  const context = React.useContext(FontContext);

  if (!context) {
    throw new Error("useFont must be used within FontProvider");
  }

  return context;
}
