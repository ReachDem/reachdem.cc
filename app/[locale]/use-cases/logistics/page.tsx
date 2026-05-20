import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: 'ReachDem for Logistics | Customer Notifications & Campaign Tracking',
  description: 'ReachDem helps logistics and delivery companies send customer updates, reminders, pickup messages, and measurable communication campaigns.',
  alternates: { canonical: "/use-cases/logistics" },
};

const benefits = ['Send delivery updates, pickup reminders, and service announcements.', 'Group customers, merchants, riders, or regions for targeted messaging.', 'Track clicks on support, payment, tracking, or onboarding links.', 'Give operations and sales a shared customer communication workspace.'];

export default function UseCasePage() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-24">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-[0.32em] text-primary">Use case</span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Reliable customer communication for logistics teams.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Delivery and logistics businesses win trust through timely updates. ReachDem gives teams a cleaner way to manage contacts, send operational messages, and track customer actions.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-xl">
              <Link href="https://app.reachdem.cc/register">Discuss logistics messaging</Link>
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
