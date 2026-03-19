"use client";

import { MouseEvent, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { Menu, X, ChevronDown, Sun, Moon, ArrowRight, Link2, Check, Flag, Map, History } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const productFeatures = [
    {
        title: "Contact management",
    },
    {
        title: "Email & SMS campaigns",
    },
    {
        title: "Analytics",
    },
];

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const { resolvedTheme, setTheme } = useTheme();
    const mounted = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false,
    );
    const currentTheme = resolvedTheme === "dark" ? "dark" : "light";

    const setTransitionOrigin = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;

        document.documentElement.style.setProperty("--theme-wave-x", `${x}px`);
        document.documentElement.style.setProperty("--theme-wave-y", `${y}px`);
    };

    const changeThemeWithWave = (nextTheme: "light" | "dark", element: HTMLElement) => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const currentTheme = resolvedTheme === "dark" ? "dark" : "light";

        if (currentTheme === nextTheme) {
            return;
        }

        setTransitionOrigin(element);

        const transitionDocument = document as Document & {
            startViewTransition?: (callback: () => void) => { finished: Promise<void> };
        };

        if (!transitionDocument.startViewTransition || prefersReducedMotion) {
            setTheme(nextTheme);
            return;
        }

        document.documentElement.classList.add("theme-transition");

        const transition = transitionDocument.startViewTransition(() => {
            setTheme(nextTheme);
        });

        transition.finished.finally(() => {
            document.documentElement.classList.remove("theme-transition");
        });
    };

    const toggleThemeWithWave = (event: MouseEvent<HTMLButtonElement>) => {
        changeThemeWithWave(currentTheme === "dark" ? "light" : "dark", event.currentTarget);
    };

    const setSpecificThemeWithWave = (event: MouseEvent<HTMLButtonElement>, nextTheme: "light" | "dark") => {
        changeThemeWithWave(nextTheme, event.currentTarget);
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md dark:bg-black/80 dark:border-white/10">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Block 1: Logo + Name */}
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">ReachDem</span>
                    </Link>
                </div>

                {/* Block 2: Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {/* Product Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setActiveDropdown('product')}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                            Product
                            <ChevronDown className={clsx("h-4 w-4 transition-transform", activeDropdown === 'product' && "rotate-180")} />
                        </button>
                        <AnimatePresence>
                            {activeDropdown === 'product' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="absolute left-1/2 top-full mt-4 w-[50rem] -translate-x-1/2 rounded-[1.75rem] border border-black/8 bg-white/95 p-4 shadow-[0_32px_90px_-42px_rgba(15,23,42,0.45)] ring-1 ring-black/5 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/95 dark:ring-white/10"
                                >
                                    <div className="grid grid-cols-[1.35fr_0.9fr_0.95fr] gap-2">
                                        <Card className="rounded-[1.35rem] border-black/8 bg-white shadow-none dark:border-white/10 dark:bg-zinc-950">
                                            <CardHeader className="space-y-4 p-6">
                                                <div className="flex items-center justify-between gap-3">
                                                    <Badge variant="subtle" size="sm" className="tracking-normal">Platform</Badge>
                                                    <span className="text-sm font-semibold text-gray-950 dark:text-white">ReachDem</span>
                                                </div>
                                                <div>
                                                    <CardTitle className="text-base text-gray-950 dark:text-white">
                                                        One workspace for audience growth
                                                    </CardTitle>
                                                    <CardDescription className="mt-2 max-w-xs text-xs leading-5 text-gray-600 dark:text-gray-300">
                                                        Manage contacts, launch campaigns, and follow performance without switching tools.
                                                    </CardDescription>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-6 pt-0">
                                                <div className="mb-4 flex flex-wrap gap-2">
                                                    <Badge variant="outline" size="xs" className="rounded-full bg-transparent">SMS</Badge>
                                                    <Badge variant="outline" size="xs" className="rounded-full bg-transparent">Email</Badge>
                                                    <Badge variant="outline" size="xs" className="rounded-full bg-transparent">Analytics</Badge>
                                                </div>
                                                <div className="space-y-3">
                                                {productFeatures.map((feature) => (
                                                    <div key={feature.title} className="flex items-start gap-3">
                                                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/12 text-primary">
                                                            <Check className="h-3.5 w-3.5" />
                                                        </div>
                                                        <div>
                                                            <div className="text-[13px] font-medium text-gray-950 dark:text-white">
                                                                {feature.title}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                </div>
                                            </CardContent>
                                        </Card>

                                        <Link
                                            href="/links"
                                            className="group flex min-h-[18rem] flex-col rounded-[1.35rem] border border-black/8 bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-zinc-950"
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <div className="flex items-center gap-2 text-sm font-semibold text-gray-950 dark:text-white">
                                                    <Link2 className="h-4 w-4 text-primary" />
                                                    Links
                                                </div>
                                                <Badge variant="subtle" size="xs" className="tracking-normal">
                                                    Coming soon
                                                </Badge>
                                            </div>
                                            <div className="mt-4 flex flex-1 flex-col justify-between">
                                                <div>
                                                    <div className="text-base font-semibold text-gray-950 dark:text-white">
                                                        Build your profile
                                                    </div>
                                                    <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                                                        Add links, services, and contact methods to shape the digital profile your card will share.
                                                    </p>
                                                </div>
                                                <div className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-medium text-primary">
                                                    Join the waitlist
                                                    <ArrowRight className="h-3.5 w-3.5" />
                                                </div>
                                            </div>
                                        </Link>

                                        <a
                                            href="https://cards-by-reachdem.vercel.app/order"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="group flex min-h-[18rem] flex-col rounded-[1.35rem] border border-black/8 bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-zinc-950"
                                        >
                                            <div className="text-sm font-semibold text-gray-950 dark:text-white">Cards</div>
                                            <div className="relative mt-4 h-28 overflow-hidden rounded-[0.8rem] bg-sand-50 dark:bg-zinc-900">
                                                <Image
                                                    src="/images/card-black-design2.png"
                                                    alt="ReachDem premium black contactless business card"
                                                    fill
                                                    className="object-contain transition duration-500 group-hover:scale-[1.03]"
                                                />
                                            </div>
                                            <div className="mt-4">
                                                <div className="text-base font-semibold text-gray-950 dark:text-white">
                                                    Contactless business cards
                                                </div>
                                                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                                                    Share your profile in one tap and turn every introduction into a follow-up.
                                                </p>
                                                <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary">
                                                    Pre-order now
                                                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Resources Dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setActiveDropdown('resources')}
                        onMouseLeave={() => setActiveDropdown(null)}
                    >
                        <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                            Resources
                            <ChevronDown className={clsx("h-4 w-4 transition-transform", activeDropdown === 'resources' && "rotate-180")} />
                        </button>
                        <AnimatePresence>
                            {activeDropdown === 'resources' && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute left-0 top-full mt-4 w-64 rounded-lg border border-gray-100 bg-white p-2 shadow-lg ring-1 ring-gray-900/5 dark:bg-zinc-900 dark:border-zinc-800"
                                >
                                    <Link href="/docs/getting-started" className="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-zinc-800">
                                        <Flag className="mt-0.5 h-5 w-5 text-primary" />
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">Getting Started</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">Set up your workspace and ship faster</div>
                                        </div>
                                    </Link>
                                    <Link href="/roadmap" className="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-zinc-800">
                                        <Map className="mt-0.5 h-5 w-5 text-primary" />
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">Roadmap</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">See what ReachDem is shipping next</div>
                                        </div>
                                    </Link>
                                    <Link href="/changelog" className="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-zinc-800">
                                        <History className="mt-0.5 h-5 w-5 text-primary" />
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">Changelog</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">Follow the latest product milestones</div>
                                        </div>
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link href="/faq" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                        FAQ
                    </Link>
                    <Link href="/pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                        Pricing
                    </Link>
                    <Link href="/support" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors">
                        Support
                    </Link>
                </nav>

                {/* Block 3: Actions */}
                <div className="hidden md:flex items-center gap-4">

                    <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                        Log in
                    </Link>
                    <Link href="/signup" className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 hover:shadow-md">
                        Get Started
                    </Link>

                    {/* Theme Switcher - Moved to Extreme Right */}
                    <button
                        onClick={toggleThemeWithWave}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-transparent text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                        aria-label="Toggle theme"
                    >
                        {!mounted ? (
                            <span className="flex items-center justify-center">
                                <Sun className="h-5 w-5" />
                            </span>
                        ) : (
                            <AnimatePresence mode="wait" initial={false}>
                                {currentTheme === "dark" ? (
                                    <motion.span
                                        key="moon"
                                        initial={{ rotate: 140, scale: 0.35, opacity: 0, y: 6 }}
                                        animate={{ rotate: 0, scale: 1, opacity: 1, y: 0 }}
                                        exit={{ rotate: -120, scale: 0.35, opacity: 0, y: -6 }}
                                        transition={{
                                            duration: 0.5,
                                            ease: [0.22, 1, 0.36, 1],
                                            scale: { type: "spring", stiffness: 260, damping: 16 },
                                        }}
                                        className="flex items-center justify-center"
                                    >
                                        <Moon className="h-5 w-5" />
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="sun"
                                        initial={{ rotate: -140, scale: 0.35, opacity: 0, y: 6 }}
                                        animate={{ rotate: 0, scale: 1, opacity: 1, y: 0 }}
                                        exit={{ rotate: 120, scale: 0.35, opacity: 0, y: -6 }}
                                        transition={{
                                            duration: 0.5,
                                            ease: [0.22, 1, 0.36, 1],
                                            scale: { type: "spring", stiffness: 260, damping: 16 },
                                        }}
                                        className="flex items-center justify-center"
                                    >
                                        <Sun className="h-5 w-5" />
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        )}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-zinc-800"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-gray-100 bg-white dark:bg-black dark:border-white/10"
                    >
                        <div className="space-y-1 p-4">
                            <div className="py-2">
                                <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Product</div>
                                <Link href="/#features" className="block rounded-lg px-2 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-zinc-800">Features</Link>
                                <Link href="/docs/getting-started" className="block rounded-lg px-2 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-zinc-800">Getting Started</Link>
                            </div>
                            <div className="py-2">
                                <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Resources</div>
                                <Link href="/docs/getting-started" className="block rounded-lg px-2 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-zinc-800">Getting Started</Link>
                                <Link href="/roadmap" className="block rounded-lg px-2 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-zinc-800">Roadmap</Link>
                                <Link href="/changelog" className="block rounded-lg px-2 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-zinc-800">Changelog</Link>
                            </div>
                            <Link href="/pricing" className="block rounded-lg px-2 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-zinc-800">Pricing</Link>
                            <Link href="/faq" className="block rounded-lg px-2 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-zinc-800">FAQ</Link>
                            <Link href="/support" className="block rounded-lg px-2 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-zinc-800">Support</Link>

                            {/* Mobile Theme Switcher */}
                            <div className="flex gap-2 py-4">
                                <button onClick={(event) => setSpecificThemeWithWave(event, 'light')} className="flex-1 rounded-lg border border-gray-200 p-2 text-sm font-medium text-gray-900 dark:border-zinc-800 dark:text-white dark:hover:bg-zinc-800 text-center">
                                    Light
                                </button>
                                <button onClick={(event) => setSpecificThemeWithWave(event, 'dark')} className="flex-1 rounded-lg border border-gray-200 p-2 text-sm font-medium text-gray-900 dark:border-zinc-800 dark:text-white dark:hover:bg-zinc-800 text-center">
                                    Dark
                                </button>
                            </div>

                            <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4 dark:border-white/10">
                                <Link href="/login" className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-base font-medium text-gray-900 hover:text-gray-900 hover:bg-gray-50 dark:bg-black dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800">
                                    Log in
                                </Link>
                                <Link href="/signup" className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 text-base font-medium text-primary-foreground hover:bg-primary/90">
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
