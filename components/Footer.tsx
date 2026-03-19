import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaLinkedin, FaTelegram, FaXTwitter } from "react-icons/fa6";
import { FontSwitcher } from "@/components/FontSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const navigation = [
  {
    title: "Products",
    links: [
      { name: "SMS", href: "/pricing" },
      { name: "Email", href: "/pricing" },
      { name: "Campaigns", href: "/campaigns" },
      { name: "Contacts", href: "/contacts" },
      { name: "API", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Pricing", href: "/pricing" },
      { name: "FAQ", href: "/faq" },
      { name: "Demo", href: "/demo" },
      { name: "Contact", href: "/about" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "Roadmap", href: "/roadmap" },
      { name: "About", href: "/about" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Privacy Policy", href: "/privacy" },
    ],
  },
];

const socialLinks = [
  { name: "Twitter", icon: FaXTwitter, href: "https://twitter.com" },
  { name: "Facebook", icon: FaFacebook, href: "https://facebook.com/" },
  { name: "LinkedIn", icon: FaLinkedin, href: "https://www.linkedin.com/company/101800400" },
  { name: "Telegram", icon: FaTelegram, href: "https://t.me/reachdem" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#09090b] text-white">
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="container relative z-10 mx-auto max-w-full px-4 pt-16 pb-8 sm:px-6 sm:pt-20 lg:px-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="max-w-md">
            <Link href="/" className="inline-block">
                <img
                  src="/icon.png"
                  alt="ReachDem icon"
                  className="h-10 object-cover invert"
                />
            </Link>
            <p className="mt-4 text-base leading-relaxed text-white/50">
              Building communication solutions for businesses and individuals around the globe.
              Send SMS and emails efficiently with our platform.
            </p>

            <form className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                placeholder="Your email..."
                autoComplete="email"
                className="h-11 flex-1 border-white/10 bg-white/5 px-4 text-sm text-white shadow-none placeholder:text-white/30 focus-visible:border-white/20 focus-visible:ring-white/10"
              />
              <Button
                type="submit"
                className="h-11 rounded-xl px-6 text-sm font-semibold"
              >
                Subscribe
              </Button>
            </form>
            <p className="mt-6 text-sm text-white/30">Backed by</p>
            <a
              href="https://elevenlabs.io/startup-grants"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex transition-opacity duration-200 hover:opacity-80"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://eleven-public-cdn.elevenlabs.io/payloadcms/pwsc4vchsqt-ElevenLabsGrants.webp"
                alt="ElevenLabs Startup Grants"
                width={100}
                height={25}
                loading="lazy"
                className="h-7 w-auto invert brightness-200"
              />
            </a>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {navigation.map((section) => (
              <div key={section.title}>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70">
                  {section.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/40 transition-colors duration-200 hover:text-white"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 border-t border-white/[0.06] pt-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
              <p className="text-sm text-white/30">
                &copy; {new Date().getFullYear()} ReachDem. All rights reserved.
              </p>
              <FontSwitcher dark />
            </div>

            <div className="flex items-center gap-1">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${link.name} page`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-white/40 transition-colors duration-200 hover:bg-white/5 hover:text-white"
                >
                  <link.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
