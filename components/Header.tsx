"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { Menu, X, ChevronDown, Rocket, LifeBuoy, BookOpen, Sun, Moon } from "lucide-react";

export function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const { theme, setTheme } = useTheme();

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
                                    className="absolute left-0 top-full mt-2 w-64 rounded-lg border border-gray-100 bg-white p-2 shadow-lg ring-1 ring-gray-900/5 dark:bg-zinc-900 dark:border-zinc-800"
                                >
                                    <Link href="/features" className="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-zinc-800">
                                        <Rocket className="mt-0.5 h-5 w-5 text-primary" />
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">Features</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">Discover what ReachDem can do</div>
                                        </div>
                                    </Link>
                                    <Link href="/use-cases" className="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-zinc-800">
                                        <BookOpen className="mt-0.5 h-5 w-5 text-primary" />
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">Use Cases</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">Solutions for your needs</div>
                                        </div>
                                    </Link>
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
                                    className="absolute left-0 top-full mt-2 w-64 rounded-lg border border-gray-100 bg-white p-2 shadow-lg ring-1 ring-gray-900/5 dark:bg-zinc-900 dark:border-zinc-800"
                                >
                                    <Link href="/blog" className="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-zinc-800">
                                        <BookOpen className="mt-0.5 h-5 w-5 text-primary" />
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">Blog</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">Latest updates and stories</div>
                                        </div>
                                    </Link>
                                    <Link href="/help" className="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-zinc-800">
                                        <LifeBuoy className="mt-0.5 h-5 w-5 text-primary" />
                                        <div>
                                            <div className="font-semibold text-gray-900 dark:text-white">Help Center</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">Guides and documentation</div>
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
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="ml-4 flex items-center justify-center w-10 h-10 rounded-full bg-transparent hover:bg-gray-100 text-gray-500 transition-colors dark:text-gray-400 dark:hover:bg-zinc-800 dark:hover:text-white"
                        aria-label="Toggle theme"
                    >
                        <Sun className="h-5 w-5 dark:hidden" />
                        <Moon className="hidden h-5 w-5 dark:block" />
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
                                <Link href="/features" className="block rounded-lg px-2 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-zinc-800">Features</Link>
                                <Link href="/use-cases" className="block rounded-lg px-2 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-zinc-800">Use Cases</Link>
                            </div>
                            <div className="py-2">
                                <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Resources</div>
                                <Link href="/blog" className="block rounded-lg px-2 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-zinc-800">Blog</Link>
                                <Link href="/help" className="block rounded-lg px-2 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-zinc-800">Help Center</Link>
                            </div>
                            <Link href="/pricing" className="block rounded-lg px-2 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-zinc-800">Pricing</Link>
                            <Link href="/faq" className="block rounded-lg px-2 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-zinc-800">FAQ</Link>
                            <Link href="/support" className="block rounded-lg px-2 py-2 text-base font-medium text-gray-900 hover:bg-gray-50 dark:text-gray-100 dark:hover:bg-zinc-800">Support</Link>

                            {/* Mobile Theme Switcher */}
                            <div className="flex gap-2 py-4">
                                <button onClick={() => setTheme('light')} className="flex-1 rounded-lg border border-gray-200 p-2 text-sm font-medium text-gray-900 dark:border-zinc-800 dark:text-white dark:hover:bg-zinc-800 text-center">
                                    Light
                                </button>
                                <button onClick={() => setTheme('dark')} className="flex-1 rounded-lg border border-gray-200 p-2 text-sm font-medium text-gray-900 dark:border-zinc-800 dark:text-white dark:hover:bg-zinc-800 text-center">
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
