import type { Metadata } from "next";

import { PricingExperience } from "@/components/pricing/PricingExperience";

export const metadata: Metadata = {
  title: "ReachDem Pricing | SMS, Email, Contacts & Link Tracking Plans",
  description:
    "Compare ReachDem plans for SMEs, restaurants, logistics companies, and developer teams that need SMS, email campaigns, contact management, link tracking, and API workflows.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return <PricingExperience />;
}
