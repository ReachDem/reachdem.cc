import type { Metadata } from "next";

import { PricingExperience } from "@/components/pricing/PricingExperience";

export const metadata: Metadata = {
  title: "ReachDem Pricing | SMS, Email, Contacts & Link Tracking Plans",
  description:
    "Compare ReachDem plans for SMEs, restaurants, logistics companies, and developer teams that need SMS, email campaigns, contact management, link tracking, and API workflows.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "ReachDem",
    "description": "Customer messaging, SMS, email, and link tracking platform.",
    "brand": {
      "@type": "Brand",
      "name": "ReachDem"
    },
    "offers": {
      "@type": "AggregateOffer",
      "lowPrice": "0",
      "highPrice": "79",
      "priceCurrency": "USD",
      "offerCount": "4"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PricingExperience />
    </>
  );
}
