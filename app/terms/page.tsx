import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal/LegalDocument";
import { getLegalDocument } from "@/lib/legal-documents";

export const metadata: Metadata = {
  title: "Terms of Service | ReachDem",
  description: "Review the terms governing access to ReachDem, including use of messaging tools, public pages, APIs, billing, and related services.",
};

export default async function TermsPage() {
  const content = await getLegalDocument("reachdem_terms_of_service.txt");

  return (
    <LegalDocument
      title="Terms of Service"
      description="These terms govern access to ReachDem, including messaging workflows, public pages, analytics, APIs, billing, and AI-assisted features."
      aside={
        <div className="rounded-xl bg-muted/60 p-4 text-sm leading-6 text-muted-foreground">
          Covers use of the ReachDem website, platform, communication features, links, analytics, and related offerings.
        </div>
      }
    >
      {content}
    </LegalDocument>
  );
}
