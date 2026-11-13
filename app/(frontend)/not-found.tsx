import Link from "next/link";
import { ArrowLeft, Compass, LifeBuoy, Rocket } from "lucide-react";

import { Button } from "@/components/ui/button";

const quickLinks = [
  {
    href: "/",
    title: "Back to home",
    description: "Return to the main ReachDem experience.",
    icon: ArrowLeft,
  },
  {
    href: "/roadmap",
    title: "See the roadmap",
    description: "Explore what the team is shipping next.",
    icon: Rocket,
  },
  {
    href: "/faq",
    title: "Read the FAQ",
    description: "Jump to the most common product and support answers.",
    icon: LifeBuoy,
  },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.22),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="absolute right-[-12rem] top-28 h-80 w-80 rounded-full bg-primary/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute left-[-10rem] bottom-12 h-72 w-72 rounded-full bg-black/5 blur-3xl dark:bg-white/5"
      />

      <div className="container relative py-16 md:py-24">
        <div className="mx-auto max-w-6xl border-x border-border">
          <div className="grid gap-8 px-6 py-10 md:px-10 md:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
            <div className="flex flex-col justify-center">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur">
                <Compass className="h-4 w-4 text-primary" />
                Lost route
              </div>

              <p className="mt-8 text-sm font-semibold uppercase tracking-[0.28em] text-primary">
                Error 404
              </p>
              <h1 className="mt-4 max-w-[10ch] text-5xl font-bold leading-[0.9] tracking-[-0.04em] md:text-7xl">
                This page went off-script.
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
                The link may be outdated, incomplete, or pointing to a route
                that does not exist in ReachDem right now.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="rounded-full px-7">
                  <Link href="/">Go home</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-7">
                  <Link href="/faq">Need help?</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-primary/10 blur-3xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-xl border border-border bg-background/90 p-6 shadow-[0_8px_24px_rgba(0,0,0,0.04)] backdrop-blur md:p-8 dark:shadow-[0_10px_30px_rgba(0,0,0,0.16)]">
                <div className="flex items-center justify-between">
                    <span className="rounded-sm bg-primary/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                    Recovery Panel
                  </span>
                  <span className="text-sm text-muted-foreground">reachdem.cc</span>
                </div>

                <div className="mt-8 rounded-[.5rem] border border-border bg-sand-100 p-5 dark:bg-white/5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Requested route</p>
                      <p className="mt-2 font-mono text-3xl font-semibold tracking-tight md:text-4xl">
                        /404
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Status</p>
                      <p className="mt-2 text-xl font-semibold">Not found</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex items-start gap-4 rounded-xl border border-border bg-background px-4 py-4 transition-colors hover:bg-accent"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/12 text-primary">
                        <link.icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-base font-semibold">
                          {link.title}
                        </span>
                        <span className="mt-1 block text-sm text-muted-foreground">
                          {link.description}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
