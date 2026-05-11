import type { Metadata } from "next";
import { CTASection } from "@/components/landing/CTASection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { Hero195 } from "@/components/landing/Hero195";
import { LogosSection } from "@/components/landing/LogosSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { WordRotate } from "@/components/magicui/word-rotate";

const siteUrl = "https://reachdem.cc";
const appUrl = "https://app.reachdem.cc/register";

export const metadata: Metadata = {
  title: "ReachDem | Messaging OS for SMEs, Restaurants, Logistics & APIs",
  description:
    "ReachDem centralizes contacts, SMS and email campaigns, tracked links, and customer engagement workflows for SMEs, restaurants, logistics companies, and developer teams.",
  alternates: {
    canonical: "/",
  },
};

const faqSchema = [
  {
    question: "What is ReachDem?",
    answer:
      "ReachDem is a customer messaging and engagement platform for businesses that need to manage contacts, send SMS and email campaigns, track links, and measure communication performance from one workspace.",
  },
  {
    question: "Who is ReachDem built for?",
    answer:
      "ReachDem is built for SMEs, restaurants, logistics companies, agencies, and tech teams in Francophone Africa and global markets that need simple, measurable customer communication.",
  },
  {
    question: "Can developers integrate ReachDem through an API?",
    answer:
      "Yes. ReachDem is designed with API-first workflows for teams that want to connect messaging, contacts, links, analytics, and customer notifications to their own products.",
  },
  {
    question: "Does ReachDem support link tracking?",
    answer:
      "Yes. ReachDem includes link tracking and smart-link workflows so teams can measure clicks, campaigns, and customer actions more clearly.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "ReachDem",
      url: siteUrl,
      logo: `${siteUrl}/icon.png`,
      description:
        "ReachDem builds customer messaging, campaign, link tracking, and API tools for SMEs, restaurants, logistics companies, and tech teams.",
      sameAs: ["https://github.com/ReachDem"],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "ReachDem",
      description:
        "Customer messaging, SMS, email, link tracking, and engagement workflows for modern businesses.",
      publisher: { "@id": `${siteUrl}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/faq?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: "ReachDem",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: siteUrl,
      offers: {
        "@type": "Offer",
        url: `${siteUrl}/pricing`,
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      audience: {
        "@type": "Audience",
        audienceType:
          "SMEs, restaurants, logistics companies, agencies, and developer teams",
      },
      featureList: [
        "SMS campaigns",
        "Email campaigns",
        "Contact management",
        "Audience segmentation",
        "Tracked links",
        "Campaign analytics",
        "Customer engagement API",
      ],
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: faqSchema.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};

const marketAngles = [
  {
    title: "For SMEs",
    body: "Centralize customer contacts, launch targeted campaigns, and stop losing leads across spreadsheets and scattered inboxes.",
  },
  {
    title: "For restaurants",
    body: "Promote menus, offers, reservations, and repeat orders with measurable SMS, email, and smart-link campaigns.",
  },
  {
    title: "For logistics teams",
    body: "Send delivery updates, customer notifications, pickup reminders, and operational messages with better tracking.",
  },
  {
    title: "For tech teams",
    body: "Connect messaging, links, campaign data, and customer notifications to your product through API-first workflows.",
  },
];

const proofPoints = [
  "SMS and email campaign workflows",
  "Contacts, groups, and audience segmentation",
  "Tracked links for measurable customer actions",
  "Built for Francophone Africa, usable globally",
  "API-ready foundation for technical teams",
  "Simple enough for operators, structured enough for growth",
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero195
        title={
          <>
            <span className="block lg:hidden">
              <span className="block">Reach customers</span>
              <WordRotate
                className="mt-1 block"
                duration={3500}
                words={["faster", "everywhere", "with proof"]}
              />
            </span>
            <span className="hidden lg:inline-flex lg:items-baseline lg:gap-[0.35em] lg:whitespace-nowrap">
              <span className="inline">Reach customers</span>
              <WordRotate
                className="lg:min-w-0"
                duration={3500}
                smoothWidth
                words={["faster", "everywhere", "with proof"]}
              />
            </span>
          </>
        }
        description="The customer messaging operating system for SMEs, restaurants, logistics companies, and developer teams: manage contacts, send SMS and email campaigns, track links, and measure what converts."
        primaryButtonText="Start free"
        primaryButtonUrl={appUrl}
        secondaryButtonText="Talk to Sales"
        secondaryButtonUrl="/support"
      />
      <LogosSection />
      <section className="bg-background py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.32em] text-primary">
              Built for real business communication
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              One platform for the teams that cannot afford missed customers.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              ReachDem turns contact lists, campaigns, links, and customer messaging into a measurable system so operators know who was contacted, who clicked, and what to do next.
            </p>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {marketAngles.map((angle) => (
              <article
                key={angle.title}
                className="rounded-3xl border border-border bg-card p-6 shadow-sm"
              >
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {angle.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {angle.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <FeaturesSection />
      <section className="border-y border-border bg-muted/30 py-16 sm:py-24">
        <div className="container mx-auto grid gap-10 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-24">
          <div>
            <span className="text-sm font-semibold uppercase tracking-[0.32em] text-primary">
              Why ReachDem
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Marketing that operators can actually measure.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Instead of posting and hoping, ReachDem helps businesses build direct channels: contact lists, campaigns, tracked links, and repeatable workflows for customer engagement.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {proofPoints.map((point) => (
              <div
                key={point}
                className="rounded-2xl border border-border bg-background px-5 py-4 text-sm font-medium text-foreground shadow-sm"
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>
      <ProcessSection />
      <section className="bg-background py-16 sm:py-24">
        <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-24">
          <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm sm:p-10">
            <span className="text-sm font-semibold uppercase tracking-[0.32em] text-primary">
              API and automation
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              For technical teams, ReachDem is more than a campaign dashboard.
            </h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Use ReachDem as customer communication infrastructure: connect product events, transactional messaging, tracked links, contact data, and campaign analytics to your own workflows.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/docs/getting-started"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Read the docs
              </a>
              <a
                href="/support"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-border px-5 text-sm font-semibold transition hover:bg-muted"
              >
                Discuss an integration
              </a>
            </div>
          </div>
        </div>
      </section>
      <CTASection />
    </>
  );
}
