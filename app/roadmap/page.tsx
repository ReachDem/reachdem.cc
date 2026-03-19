import type { Metadata } from "next";

import { RoadmapTimeline } from "@/components/roadmap/RoadmapTimeline";

export const metadata: Metadata = {
  title: "Roadmap | ReachDem",
  description: "See the upcoming ReachDem product roadmap across audience management, analytics, collaboration, and automation.",
};

export default function RoadmapPage() {
  return <RoadmapTimeline />;
}
