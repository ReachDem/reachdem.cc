import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, CheckCircle2, Upload } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "ReachDem - Getting Started",
  description: "Set up your workspace, import contacts, launch your first campaign, and start tracking performance.",
};

const steps = [
  {
    number: "01",
    title: "Set up your workspace",
    description:
      "Start by configuring your workspace details so ReachDem can reflect your team, brand, and sending context.",
    bullets: [
      "Add your company and workspace information.",
      "Review your basic team setup and permissions.",
      "Make sure your environment is ready before sending anything.",
    ],
  },
  {
    number: "02",
    title: "Import your contacts",
    description:
      "Bring your audience into ReachDem with a clean CSV import flow and organize them into usable segments.",
    bullets: [
      "Upload a properly formatted CSV file.",
      "Check that your file includes clear column headers.",
      "Prepare groups or segments for future campaigns.",
    ],
  },
  {
    number: "03",
    title: "Create your first campaign",
    description:
      "Once your audience is ready, move into campaign creation and build your first outbound flow.",
    bullets: [
      "Choose your channel and audience.",
      "Start from a template or write from scratch.",
      "Review the content before launch.",
    ],
  },
  {
    number: "04",
    title: "Track performance",
    description:
      "After launch, use ReachDem analytics to monitor opens, clicks, and delivery quality in real time.",
    bullets: [
      "Watch campaign performance from the analytics view.",
      "Check engagement trends after launch.",
      "Use insights to improve future sends.",
    ],
  },
];

const quickActions = [
  {
    title: "Workspace setup",
    description: "Configure the basics before you send.",
    icon: Building2,
  },
  {
    title: "CSV import",
    description: "Bring your audience into ReachDem quickly.",
    icon: Upload,
  },
  {
    title: "Analytics",
    description: "Measure what happens after launch.",
    icon: CheckCircle2,
  },
];

export default function GettingStartedPage() {
  return (
    <main className="min-h-screen bg-sand-100 py-16 sm:py-24">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-24">
        <section className="overflow-hidden rounded-[2rem] border border-border/70 bg-background shadow-sm">
          <div className="grid gap-10 px-6 py-10 sm:px-8 sm:py-12 lg:grid-cols-[1.15fr_0.85fr] lg:px-12">
            <div>
              <Badge variant="subtle" className="tracking-normal">
                Getting Started
              </Badge>
              <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                Get up and running with ReachDem
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                This guide walks you through the first essentials: setting up your workspace, importing contacts,
                creating your first campaign, and tracking performance once you go live.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-xl">
                  <Link href="/support">
                    Contact support
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-xl">
                  <Link href="/faq">Read FAQs</Link>
                </Button>
              </div>
            </div>

            <Card className="rounded-[1.75rem] border-border/80 bg-card shadow-none">
              <CardHeader className="p-6">
                <CardTitle className="text-lg">Quick overview</CardTitle>
                <CardDescription>
                  A simple starting path for new teams using ReachDem.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 p-6 pt-0">
                {quickActions.map((item) => (
                  <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-border/70 bg-background px-4 py-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-foreground">{item.title}</div>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="mt-8 grid gap-6">
          {steps.map((step) => (
            <Card key={step.number} className="rounded-[1.75rem] border-border/70 shadow-none">
              <CardContent className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[96px_1fr] lg:gap-8">
                <div className="flex flex-row items-center gap-4 lg:flex-col lg:items-start">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-primary bg-background font-display text-lg font-semibold text-primary">
                    {step.number}
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {step.title}
                  </h2>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
                    {step.description}
                  </p>

                  <div className="mt-6 grid gap-3">
                    {step.bullets.map((bullet) => (
                      <div key={bullet} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                        <p className="text-sm leading-6 text-muted-foreground sm:text-base">{bullet}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <section className="mt-8">
          <Card className="rounded-[1.75rem] border-border/70 bg-[#09090b] text-white shadow-none">
            <CardContent className="flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                  Need more help?
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                  If you run into setup issues or want help planning your first campaign, the ReachDem team is ready to help.
                </p>
              </div>
              <Button asChild size="lg" className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/support">
                  Visit support
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
