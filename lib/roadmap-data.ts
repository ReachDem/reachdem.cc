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
    id: "core-platform",
    phase: "Phase 01",
    title: "Build the multichannel communication foundation",
    description:
      "Establish the core product layer that centralizes contacts, campaign preparation, and message delivery across SMS, email, and WhatsApp.",
    icon: "LayoutList",
    accent: "bg-primary/10 text-primary",
    period: "Q1 2026",
    status: "completed",
    statusLabel: "Completed",
    highlights: [
      "Unified contact management with groups and reusable lists",
      "Campaign creation flows for SMS, email, and WhatsApp operations",
      "Shared workspace structure for teams, operators, and growing businesses",
    ],
    preview: {
      eyebrow: "Communication core",
      title:
        "ReachDem brings campaigns, contacts, and channels into one operational surface.",
      metrics: [
        { label: "Channels", value: "SMS • Email • WhatsApp" },
        { label: "Audience", value: "Contacts + groups" },
        { label: "Workspaces", value: "Team ready" },
      ],
    },
  },
  {
    id: "audience-segmentation",
    phase: "Phase 02",
    title: "Strengthen audience segmentation and contact operations",
    description:
      "Improve the way businesses import, organize, and activate their audiences with cleaner data handling and smarter segmentation rules.",
    icon: "LayoutList",
    accent: "bg-violet-500/10 text-violet-500",
    period: "Q2 2026",
    status: "in-progress",
    statusLabel: "In progress",
    reverse: true,
    highlights: [
      "CSV import flows with clearer field mapping and validation",
      "Dynamic segments based on campaign and contact attributes",
      "Cleaner audience preparation before launch across all channels",
    ],
    preview: {
      eyebrow: "Audience engine",
      title:
        "Teams can organize contacts faster and launch better-targeted campaigns with less manual work.",
      metrics: [
        { label: "Imports", value: "CSV + manual" },
        { label: "Segments", value: "Dynamic rules" },
        { label: "Readiness", value: "Campaign focused" },
      ],
    },
  },
  {
    id: "links-analytics",
    phase: "Phase 03",
    title: "Launch Link by ReachDem and unified performance analytics",
    description:
      "Expand ReachDem with link-in-bio experiences, shortened links, and a clearer analytics layer connecting campaigns, clicks, and traffic behavior.",
    icon: "LocateFixed",
    accent: "bg-sky-500/10 text-sky-500",
    period: "Q2–Q3 2026",
    status: "in-progress",
    statusLabel: "In progress",
    highlights: [
      "Short links with click tracking and campaign attribution",
      "Link by ReachDem profiles for professional identity and discovery",
      "Reporting views for delivery, engagement, and link performance",
    ],
    preview: {
      eyebrow: "Visibility and measurement",
      title:
        "Campaign reach, clicks, and profile activity come together in one reporting layer.",
      metrics: [
        { label: "Link tracking", value: "Clicks + sources" },
        { label: "Profiles", value: "Link by ReachDem" },
        { label: "Reporting", value: "Unified analytics" },
      ],
    },
  },
  {
    id: "team-collaboration",
    phase: "Phase 04",
    title: "Expand collaboration, approvals, and client operations",
    description:
      "Support agencies, internal teams, and operators with role-aware permissions, approval checkpoints, and shared execution context.",
    icon: "Users",
    accent: "bg-emerald-500/10 text-emerald-500",
    period: "Q3 2026",
    status: "planned",
    statusLabel: "Planned",
    reverse: true,
    highlights: [
      "Granular roles and permissions at workspace level",
      "Approval workflows before campaign publication or sending",
      "Shared notes and collaboration context for internal and client teams",
    ],
    preview: {
      eyebrow: "Team operations",
      title:
        "Growing teams can coordinate campaign execution with more control, less friction, and lower operational risk.",
      metrics: [
        { label: "Roles", value: "Granular access" },
        { label: "Approvals", value: "Pre-send checks" },
        { label: "Collaboration", value: "Shared context" },
      ],
    },
  },
  {
    id: "developer-integrations",
    phase: "Phase 05",
    title: "Open the platform through APIs, webhooks, and external integrations",
    description:
      "Make ReachDem more extensible for developers and businesses that need to connect campaigns, contacts, and reporting to their own systems.",
    icon: "Cpu",
    accent: "bg-orange-500/10 text-orange-500",
    period: "Q4 2026",
    status: "planned",
    statusLabel: "Planned",
    highlights: [
      "Improved APIs for messaging, audience data, and campaign events",
      "Webhook support for real-time updates and workflow triggers",
      "External integrations with CRMs, forms, and automation tools",
    ],
    preview: {
      eyebrow: "Platform connectivity",
      title:
        "ReachDem becomes easier to plug into existing tools, business workflows, and custom applications.",
      metrics: [
        { label: "APIs", value: "Core endpoints" },
        { label: "Webhooks", value: "Event driven" },
        { label: "Integrations", value: "CRM + automation" },
      ],
    },
  },
  {
    id: "ai-optimization",
    phase: "Phase 06",
    title: "Introduce AI assistance for personalization and optimization",
    description:
      "Add an intelligence layer that helps teams generate better messaging, personalize content, and predict campaign or link performance more effectively.",
    icon: "Cpu",
    accent: "bg-fuchsia-500/10 text-fuchsia-500",
    period: "2027+",
    status: "planned",
    statusLabel: "Planned",
    reverse: true,
    highlights: [
      "AI-assisted copy suggestions for campaigns and profile content",
      "Audience targeting recommendations based on behavior and engagement",
      "Predictive insights for link performance and campaign optimization",
    ],
    preview: {
      eyebrow: "Intelligence layer",
      title:
        "AI helps teams move faster, personalize better, and optimize communication based on real usage signals.",
      metrics: [
        { label: "Copy assist", value: "Guided drafts" },
        { label: "Targeting", value: "Suggested audiences" },
        { label: "Prediction", value: "Performance insights" },
      ],
    },
  },
];