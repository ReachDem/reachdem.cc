export type RoadmapMilestone = {
  id: string;
  phase: string;
  title: string;
  description: string;
  icon: "LayoutList" | "LocateFixed" | "Users" | "Cpu";
  accent: string;
  period: string;
  status: "completed" | "in-progress" | "planned";
  statusLabel: string;
  reverse?: boolean;
  highlights: string[];
  preview: {
    title: string;
    eyebrow: string;
    metrics: Array<{
      label: string;
      value: string;
    }>;
  };
};

export const roadmapData: RoadmapMilestone[] = [
  {
    id: "core-workspace",
    phase: "Phase 01",
    title: "Ship the operating base for contacts, workspaces, and campaigns",
    description:
      "Complete the product foundation teams need before they can run reliable outreach: onboarding, workspace context, contacts, imports, audiences, and the first campaign execution layer.",
    icon: "LayoutList",
    accent: "bg-primary/10 text-primary",
    period: "Q1 2026",
    status: "completed",
    statusLabel: "Completed",
    highlights: [
      "Guided onboarding and workspace setup for new teams",
      "Contacts, groups, CSV import, field mapping, and audience preparation",
      "Campaign orchestration foundation for SMS, email, and future channels",
    ],
    preview: {
      eyebrow: "Product foundation",
      title:
        "ReachDem is moving from a simple sending tool into a structured communication workspace.",
      metrics: [
        { label: "Workspace", value: "Onboarding + teams" },
        { label: "Audience", value: "Contacts + groups" },
        { label: "Execution", value: "Campaign core" },
      ],
    },
  },
  {
    id: "campaign-engine-links",
    phase: "Phase 02",
    title: "Make campaigns measurable with async delivery and tracked links",
    description:
      "Strengthen the campaign engine so every send can be queued safely, attributed correctly, and measured through ReachDem links instead of disappearing after delivery.",
    icon: "LocateFixed",
    accent: "bg-sky-500/10 text-sky-500",
    period: "Q2 2026",
    status: "in-progress",
    statusLabel: "In progress",
    reverse: true,
    highlights: [
      "Asynchronous workers for SMS, email, campaign scheduling, and delivery jobs",
      "rcdm.ink tracked links connected to campaigns, contacts, and messages",
      "Campaign detail views with delivery, click, and engagement reporting",
    ],
    preview: {
      eyebrow: "Measurement layer",
      title:
        "Teams should see what was sent, who engaged, and which links actually created intent.",
      metrics: [
        { label: "Delivery", value: "Queued workers" },
        { label: "Links", value: "rcdm.ink tracking" },
        { label: "Reporting", value: "Campaign analytics" },
      ],
    },
  },
  {
    id: "whatsapp-channel",
    phase: "Phase 03",
    title: "Bring WhatsApp online with QR onboarding and campaign sending",
    description:
      "Add a complete WhatsApp channel that guides users from phone pairing to test messages and campaign creation, powered by session-based provider APIs.",
    icon: "LayoutList",
    accent: "bg-emerald-500/10 text-emerald-500",
    period: "Q2–Q3 2026",
    status: "in-progress",
    statusLabel: "In progress",
    highlights: [
      "WhatsApp onboarding flow with prerequisites, QR pairing, and session status",
      "Evolution API-backed WhatsApp sessions with reconnect and error handling",
      "WhatsApp campaign composer, tracked links, and transactional test messages",
    ],
    preview: {
      eyebrow: "WhatsApp operations",
      title:
        "A user should be able to connect a phone, verify delivery, then launch a WhatsApp campaign without technical setup.",
      metrics: [
        { label: "Pairing", value: "QR session" },
        { label: "Provider", value: "Evolution API" },
        { label: "Campaigns", value: "WhatsApp ready" },
      ],
    },
  },
  {
    id: "reachdem-links-cards",
    phase: "Phase 04",
    title: "Connect ReachDem Links, Cards, and identity surfaces to campaigns",
    description:
      "Unify the public-facing products around the same growth loop: cards create contacts, links capture intent, and campaigns reactivate the audience.",
    icon: "LocateFixed",
    accent: "bg-violet-500/10 text-violet-500",
    period: "Q3 2026",
    status: "planned",
    statusLabel: "Planned",
    reverse: true,
    highlights: [
      "ReachDem Links profiles and short links as measurable identity surfaces",
      "Cards by ReachDem flows that turn offline networking into CRM-ready contacts",
      "Attribution between card taps, link clicks, contact records, and campaigns",
    ],
    preview: {
      eyebrow: "Identity and acquisition",
      title:
        "ReachDem becomes the bridge between meeting someone, capturing the relationship, and following up at scale.",
      metrics: [
        { label: "Profiles", value: "Links" },
        { label: "Networking", value: "Cards" },
        { label: "Attribution", value: "Tap → contact → campaign" },
      ],
    },
  },
  {
    id: "team-controls",
    phase: "Phase 05",
    title: "Add team controls, approvals, and safer campaign operations",
    description:
      "Give founders, agencies, and operators the controls they need before campaigns go out: permissions, approval checkpoints, audit trails, and clearer accountability.",
    icon: "Users",
    accent: "bg-orange-500/10 text-orange-500",
    period: "Q4 2026",
    status: "planned",
    statusLabel: "Planned",
    highlights: [
      "Granular roles for owners, operators, reviewers, and clients",
      "Approval workflows before high-volume sends or sensitive WhatsApp campaigns",
      "Activity history across imports, edits, provider sessions, and campaign launches",
    ],
    preview: {
      eyebrow: "Operational control",
      title:
        "Growing teams can move faster without losing control over who can launch, edit, or approve communication.",
      metrics: [
        { label: "Roles", value: "Granular access" },
        { label: "Approvals", value: "Pre-launch checks" },
        { label: "Audit", value: "Activity history" },
      ],
    },
  },
  {
    id: "platform-automation-ai",
    phase: "Phase 06",
    title: "Open ReachDem through APIs, webhooks, automation, and AI assistance",
    description:
      "Make ReachDem programmable for teams that want to connect their CRM, forms, products, or internal tools while using AI to draft and optimize better messages.",
    icon: "Cpu",
    accent: "bg-fuchsia-500/10 text-fuchsia-500",
    period: "2027+",
    status: "planned",
    statusLabel: "Planned",
    reverse: true,
    highlights: [
      "REST APIs and webhooks for contacts, campaigns, messages, links, and events",
      "Integrations with CRMs, forms, ecommerce flows, and automation tools",
      "AI-assisted campaign copy, audience suggestions, and performance recommendations",
    ],
    preview: {
      eyebrow: "Extensible platform",
      title:
        "ReachDem evolves into a communication layer that can be triggered by products, workflows, and real customer behavior.",
      metrics: [
        { label: "APIs", value: "REST + webhooks" },
        { label: "Automation", value: "CRM + forms" },
        { label: "AI", value: "Copy + targeting" },
      ],
    },
  },
];
