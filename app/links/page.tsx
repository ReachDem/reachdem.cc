import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Link2, Sparkles } from "lucide-react";

import { LinksWaitlistForm } from "@/components/links/LinksWaitlistForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "ReachDem Links - Prelaunch",
  description:
    "Join the ReachDem Links waitlist and get notified when the profile and smart-link experience becomes available.",
};

const features = [
  {
    title: "Profile-first",
    description: "Build a single profile with your links, services, and contact methods.",
  },
  {
    title: "Connected to cards",
    description: "Connect your ReachDem card to a destination you can update anytime.",
  },
  {
    title: "Early access",
    description: "Get product updates, launch notes, and first access when Links opens.",
  },
];

export default function LinksPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-br from-sand-50 via-background to-mint-50 py-20 sm:py-28">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute left-0 bottom-0 h-64 w-64 rounded-full bg-black/5 blur-3xl dark:bg-white/5" />
        </div>

        <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              <Badge variant="subtle" className="gap-2 uppercase tracking-[0.22em]">
                <Sparkles className="h-3.5 w-3.5" />
                Coming soon
              </Badge>
              <h1 className="mt-6 max-w-3xl font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                ReachDem Links gives every introduction a smarter destination.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
                Create a polished profile for your links, services, and contact options, then connect it to your
                ReachDem card and future touchpoints.
              </p>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {features.map((feature) => (
                  <Card key={feature.title} className="rounded-2xl border-border/80 bg-card/80 shadow-none">
                    <CardHeader className="p-5">
                      <CardTitle className="text-base">{feature.title}</CardTitle>
                      <CardDescription className="text-sm leading-6">{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button asChild size="lg" className="rounded-xl">
                  <a href="#waitlist">
                    Join waitlist
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-xl">
                  <Link href="https://cards-by-reachdem.vercel.app/">
                    Explore cards
                    <Link2 className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <Card className="rounded-[2rem] border-border/80 bg-card/95 shadow-[0_24px_80px_-48px_rgba(15,23,42,0.45)]">
              <CardHeader className="p-6 sm:p-8">
                <CardTitle className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Links preview</CardTitle>
                <CardDescription className="text-base leading-7">
                  A polished destination for your profile, offers, and contact actions.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 p-6 pt-0 sm:p-8 sm:pt-0">
                <Card className="rounded-[1.5rem] border-border/80 bg-background shadow-none">
                  <CardContent className="p-5">
                    <div className="h-3 w-24 rounded-full bg-primary/30" />
                    <div className="mt-4 space-y-3">
                      <div className="h-2 rounded-full bg-muted" />
                      <div className="h-2 w-5/6 rounded-full bg-muted" />
                    </div>
                    <div className="mt-6 grid gap-3">
                      <Card className="rounded-xl border-border/80 bg-card shadow-none">
                        <CardContent className="px-4 py-3 text-sm text-muted-foreground">Website</CardContent>
                      </Card>
                      <Card className="rounded-xl border-border/80 bg-card shadow-none">
                        <CardContent className="px-4 py-3 text-sm text-muted-foreground">Book a call</CardContent>
                      </Card>
                      <Card className="rounded-xl border-border/80 bg-card shadow-none">
                        <CardContent className="px-4 py-3 text-sm text-muted-foreground">WhatsApp</CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
                <p className="text-sm leading-6 text-muted-foreground">
                  Built for founders, operators, and teams who want a cleaner way to share everything that matters.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="waitlist" className="py-20 sm:py-24">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-24">
          <LinksWaitlistForm />
        </div>
      </section>
    </main>
  );
}
