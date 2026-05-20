import type { Metadata } from "next";
import { FAQSection } from "@/components/FAQSection";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | ReachDem",
  description: "Find answers about ReachDem campaigns, contactless business cards, SMS, email credits, and developer API integrations.",
  alternates: { canonical: "/faq" },
};

export default function FAQPage() {
  return <FAQSection />;
}

