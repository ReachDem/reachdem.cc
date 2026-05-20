import type { Metadata } from "next";
import { SupportForm } from "@/components/support/SupportForm";

export const metadata: Metadata = {
  title: "Contact Support & Sales | ReachDem",
  description: "Get in touch with the ReachDem team for bugs, product feedback, custom integration inquiries, or enterprise messaging setups.",
  alternates: { canonical: "/support" },
};

export default function SupportPage() {
  return <SupportForm />;
}
