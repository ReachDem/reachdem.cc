import type { MetadataRoute } from "next";

const siteUrl = "https://reachdem.cc";

const routes = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/pricing", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/use-cases", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/use-cases/smes", priority: 0.88, changeFrequency: "monthly" as const },
  { path: "/use-cases/restaurants", priority: 0.88, changeFrequency: "monthly" as const },
  { path: "/use-cases/logistics", priority: 0.88, changeFrequency: "monthly" as const },
  { path: "/use-cases/developers", priority: 0.86, changeFrequency: "monthly" as const },
  { path: "/links", priority: 0.85, changeFrequency: "weekly" as const },
  { path: "/faq", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/docs/getting-started", priority: 0.75, changeFrequency: "monthly" as const },
  { path: "/roadmap", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/support", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/changelog", priority: 0.55, changeFrequency: "monthly" as const },
  { path: "/privacy", priority: 0.35, changeFrequency: "yearly" as const },
  { path: "/terms", priority: 0.35, changeFrequency: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
