import type { Metadata } from "next";

import { LegalDocument } from "@/components/legal/LegalDocument";
import { getLegalDocument } from "@/lib/legal-documents";

export const metadata: Metadata = {
  title: "Privacy Policy | ReachDem",
  description: "Read how ReachDem collects, uses, stores, and protects personal data across the platform and related services.",
};

export default async function PrivacyPage() {
  const content = await getLegalDocument("reachdem_privacy_policy.txt");

  return (
    <LegalDocument
      title="Privacy Policy"
      description="This page explains how ReachDem handles personal data across the website, platform, APIs, links, analytics, and communication workflows."
      aside={
        <div className="rounded-xl bg-muted/60 p-4 text-sm leading-6 text-muted-foreground">
          Applies to ReachDem services, public pages, campaign tools, integrations, analytics, and customer support.
        </div>
      }
    >
      {content}
    </LegalDocument>
  );
}
