import type { Metadata } from "next";

import { PricingExperience } from "@/components/pricing/PricingExperience";

export const metadata: Metadata = {
  title: "Pricing | ReachDem",
  description:
    "Explore ReachDem pricing across Basic, Growth, Pro, custom enterprise plans, and pay-as-you-use message credits.",
};

export default function PricingPage() {
  return <PricingExperience />;
}
