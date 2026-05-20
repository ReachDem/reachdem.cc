import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: 'ReachDem API for Developers | Messaging, Links & Customer Workflows',
  description: 'ReachDem provides API-ready customer messaging workflows for developers and tech teams that need SMS, email, tracked links, and campaign infrastructure.',
  alternates: { canonical: "/use-cases/developers" },
};

const benefits = ['Connect product events to customer SMS and email notifications.', 'Use tracked links to measure clicks from campaigns or transactional flows.', 'Build customer communication workflows without reinventing messaging infrastructure.', 'Give non-technical teams a dashboard while developers keep API control.'];

export default function UseCasePage() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-24">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-[0.32em] text-primary">Use case</span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Customer messaging infrastructure for developer teams.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Tech teams need communication primitives that connect to product events and internal tools. ReachDem is designed to support API-first workflows for messaging, links, and analytics.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-xl">
              <Link href="https://app.reachdem.cc/register">Explore API workflows</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-xl">
              <Link href="/support">Talk to sales</Link>
            </Button>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {benefits.map((benefit) => (
            <article key={benefit} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
              <h2 className="font-display text-xl font-semibold text-foreground">{benefit}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Use ReachDem to make this workflow structured, measurable, and easier to repeat every week.
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
