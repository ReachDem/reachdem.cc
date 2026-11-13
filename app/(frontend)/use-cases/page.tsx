import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "ReachDem Use Cases | SMEs, Restaurants, Logistics & Developers",
  description:
    "Explore how ReachDem helps SMEs, restaurants, logistics companies, and developer teams manage contacts, send campaigns, track links, and build customer communication workflows.",
  alternates: { canonical: "/use-cases" },
};

const useCases = [
  {
    title: "SMEs",
    href: "/use-cases/smes",
    description:
      "Organize leads, launch SMS and email campaigns, track clicks, and follow up with prospects before they go cold.",
  },
  {
    title: "Restaurants",
    href: "/use-cases/restaurants",
    description:
      "Promote menus, offers, bookings, and repeat orders with a direct customer channel you can measure.",
  },
  {
    title: "Logistics",
    href: "/use-cases/logistics",
    description:
      "Send customer updates, pickup reminders, delivery messages, and merchant communications with better tracking.",
  },
  {
    title: "Developers",
    href: "/use-cases/developers",
    description:
      "Connect customer messaging, tracked links, and campaign workflows to your product through API-ready infrastructure.",
  },
];

export default function UseCasesPage() {
  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.32em] text-primary">
            ReachDem use cases
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Customer messaging for the businesses that need direct traction.
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            ReachDem is built for operators who need measurable communication: contact lists, SMS, email, tracked links, and customer workflows that can scale from one campaign to a full business system.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {useCases.map((useCase) => (
            <Link
              key={useCase.href}
              href={useCase.href}
              className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h2 className="font-display text-2xl font-semibold text-foreground">
                {useCase.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {useCase.description}
              </p>
              <span className="mt-5 inline-flex text-sm font-semibold text-primary">
                Explore use case →
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="rounded-xl">
            <Link href="https://app.reachdem.cc/register">Start free</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
