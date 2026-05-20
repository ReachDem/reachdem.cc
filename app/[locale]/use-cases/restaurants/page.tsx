import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: 'ReachDem for Restaurants | SMS, Email & Link Campaigns',
  description: 'ReachDem helps restaurants promote menus, offers, reservations, and repeat orders with SMS, email, customer segmentation, and tracked links.',
  alternates: { canonical: "/use-cases/restaurants" },
};

const benefits = ['Promote daily menus, events, and limited offers by SMS or email.', 'Segment diners by location, interest, or past campaign engagement.', 'Track menu links, booking links, and offer clicks before following up.', 'Keep customer contact lists organized instead of buried in WhatsApp chats.'];

export default function UseCasePage() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-24">
        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-[0.32em] text-primary">Use case</span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Customer messaging for restaurants that want repeat orders.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Restaurants cannot depend only on social algorithms. ReachDem helps you build a direct customer channel for menus, promos, reservations, delivery updates, and reactivation campaigns.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-xl">
              <Link href="https://app.reachdem.cc/register">Start building your restaurant customer list</Link>
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
