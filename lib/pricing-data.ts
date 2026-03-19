import {
  BarChart3,
  Briefcase,
  Link2,
  Mail,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Users,
  Webhook,
} from "lucide-react";

export type PricingPlan = {
  name: string;
  price: string;
  cadence: string;
  summary: string;
  eyebrow: string;
  accent: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  featured?: boolean;
  features: string[];
  icon: typeof MessageSquare;
};

export const pricingPlans: PricingPlan[] = [
  {
    name: "Basic",
    price: "5,000 XAF",
    cadence: "/month",
    eyebrow: "For solo operators",
    summary:
      "Built for early teams that need simple outreach without scattered tools.",
    accent: "bg-primary/10 text-primary",
    ctaLabel: "Start basic",
    ctaHref: "/signup",
    secondaryLabel: "See FAQ",
    secondaryHref: "/faq",
    icon: MessageSquare,
    features: [
      "Bulk SMS sends with a clean sending workflow",
      "Contact lists with CSV import and manual entry",
      "Basic link tracking to monitor clicks",
    ],
  },
  {
    name: "Growth",
    price: "15,000 XAF",
    cadence: "/month",
    eyebrow: "For growing SMBs",
    summary:
      "The core package for businesses that want multichannel campaigns and measurable ROI.",
    accent: "bg-emerald-500/10 text-emerald-500",
    ctaLabel: "Choose growth",
    ctaHref: "/signup",
    secondaryLabel: "Book a demo",
    secondaryHref: "/support",
    featured: true,
    icon: Sparkles,
    features: [
      "SMS and email campaigns from one workspace",
      "Dynamic audience segmentation and filters",
      "Reusable message templates for repeat sends",
      "Campaign analytics and ROI-oriented reporting",
      "Automation flows for status updates and follow-ups",
      "Short links with attribution and click tracking",
    ],
  },
  {
    name: "Pro",
    price: "50,000 XAF",
    cadence: "/month",
    eyebrow: "operators and agencies",
    summary:
      "Higher-control delivery for teams managing volume, approvals, and integrations.",
    accent: "bg-sky-500/10 text-sky-500",
    ctaLabel: "Scale with pro",
    ctaHref: "/signup",
    secondaryLabel: "Talk to sales",
    secondaryHref: "/support",
    icon: Briefcase,
    features: [
      "Everything in Growth, with higher sending volume",
      "Multi-workspace setup for clients, brands, or teams",
      "Advanced roles and approval workflows",
      "Priority support for operational campaigns",
      "Webhooks and integration-ready architecture",
      "Dedicated onboarding for team rollout",
    ],
  },
  {
    name: "Custom Enterprise",
    price: "Custom",
    cadence: "",
    eyebrow: "For tailored deployments",
    summary:
      "Designed for custom business rules, integrations, compliance needs, and dedicated rollout support.",
    accent: "bg-orange-500/10 text-orange-500",
    ctaLabel: "Contact sales",
    ctaHref: "/support",
    icon: ShieldCheck,
    features: [
      "Custom integrations and API design support",
      "Dedicated account setup and migration help",
      "SLA, governance, and deployment planning",
      "Role-specific workflows for larger organizations",
      "Webhook, reporting, and data export requirements",
      "Commercial terms adapted to your volume",
    ],
  },
];

export const pricingSignals = [
  {
    label: "Multichannel",
    value: "SMS, Email, WhatsApp-ready",
    icon: Mail,
  },
  {
    label: "Segmentation",
    value: "Audience groups and dynamic filters",
    icon: Users,
  },
  {
    label: "ROI Tracking",
    value: "Analytics + short links in one layer",
    icon: BarChart3,
  },
  {
    label: "Integrations",
    value: "APIs and webhooks for scale",
    icon: Webhook,
  },
  {
    label: "Link Layer",
    value: "Brand, shorten, and measure clicks",
    icon: Link2,
  },
];
