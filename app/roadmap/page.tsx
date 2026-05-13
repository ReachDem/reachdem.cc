import type { Metadata } from "next";

import { RoadmapTimeline } from "@/components/roadmap/RoadmapTimeline";

export const metadata: Metadata = {
  title: "Roadmap | ReachDem",
  description:
    "Follow the ReachDem product roadmap across contacts, campaign execution, WhatsApp onboarding, Links, Cards, analytics, and platform APIs.",
};

export default function RoadmapPage() {
  return <RoadmapTimeline />;
}
