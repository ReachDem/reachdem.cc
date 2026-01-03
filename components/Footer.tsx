import Link from 'next/link';
import Image from 'next/image';
import { Rocket, Twitter, Github, Linkedin } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-gray-100 bg-gray-50">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    {/* Brand & Context */}
                    <div className="space-y-4 xl:col-span-1">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="relative h-8 w-8">
                                <Image
                                    src="/Black.png"
                                    alt="ReachDem Logo"
                                    fill
                                    className="object-contain dark:hidden"
                                />
                                <Image
                                    src="/White Variant.png"
                                    alt="ReachDem Logo"
                                    fill
                                    className="object-contain hidden dark:block"
                                />
                            </div>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">ReachDem</span>
                        </Link>
                        <p className="max-w-xs text-sm text-gray-500">
                            Empowering your communication with seamless reach and engagement. The platform for growth.
                        </p>
                        <div className="flex space-x-5">
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Twitter</span>
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">GitHub</span>
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Product</h3>
                                <ul className="mt-4 space-y-3">
                                    <li>
                                        <Link href="#" className="text-sm text-gray-500 hover:text-gray-900">Features</Link>
                                    </li>
                                    <li>
                                        <Link href="/pricing" className="text-sm text-gray-500 hover:text-gray-900">Pricing</Link>
                                    </li>
                                    <li>
                                        <Link href="/use-cases" className="text-sm text-gray-500 hover:text-gray-900">Use Cases</Link>
                                    </li>
                                    <li>
                                        <Link href="/faq" className="text-sm text-gray-500 hover:text-gray-900">FAQ</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-12 md:mt-0">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Company</h3>
                                <ul className="mt-4 space-y-3">
                                    <li>
                                        <Link href="/about" className="text-sm text-gray-500 hover:text-gray-900">About</Link>
                                    </li>
                                    <li>
                                        <Link href="/blog" className="text-sm text-gray-500 hover:text-gray-900">Blog</Link>
                                    </li>
                                    <li>
                                        <Link href="/contact" className="text-sm text-gray-500 hover:text-gray-900">Contact</Link>
                                    </li>
                                    <li>
                                        <Link href="/careers" className="text-sm text-gray-500 hover:text-gray-900">Careers</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Legal</h3>
                                <ul className="mt-4 space-y-3">
                                    <li>
                                        <Link href="/legal/terms" className="text-sm text-gray-500 hover:text-gray-900">Terms of Service</Link>
                                    </li>
                                    <li>
                                        <Link href="/legal/privacy" className="text-sm text-gray-500 hover:text-gray-900">Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link href="/legal/cookie" className="text-sm text-gray-500 hover:text-gray-900">Cookie Policy</Link>
                                    </li>
                                    <li>
                                        <Link href="/legal/compliance" className="text-sm text-gray-500 hover:text-gray-900">Security</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 border-t border-gray-200 pt-8">
                    <p className="text-base text-gray-400 xl:text-center">
                        &copy; {currentYear} ReachDem. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
