"use client";

import { ThemeProvider } from "next-themes";
import * as React from "react";
import { FontProvider } from "@/components/FontProvider";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <FontProvider>{children}</FontProvider>
        </ThemeProvider>
    );
}
