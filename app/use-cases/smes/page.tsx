import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: 'ReachDem for SMEs | Customer Engagement for Growing Businesses',
  description: 'ReachDem gives SMEs a simple customer engagement platform for contacts, SMS, email, segmentation, tracked links, and campaign analytics.',
  alternates: { canonical: "/use-cases/smes" },
};

const benefits = ['Turn scattered leads into structured contact lists and segments.', 'Launch SMS and email campaigns without a complex marketing stack.', 'Measure clicks and responses so follow-up is not random.', 'Build a repeatable customer channel as the business grows.'];

export default function UseCasePage() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-24">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-[0.32em] text-primary">Use case</span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            A customer engagement system for SMEs that need traction.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Small and medium businesses need marketing that produces conversations, not vanity metrics. ReachDem helps SMEs organize contacts, run campaigns, and measure customer intent.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-xl">
              <Link href="https://app.reachdem.cc/register">Start with a simple campaign</Link>
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
