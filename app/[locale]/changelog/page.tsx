import type { Metadata } from "next";
import { ArrowUpRight, CheckCircle2, Clock3, GitPullRequest, Maximize2, Milestone, Radio } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const metadata: Metadata = {
  title: "ReachDem - Changelog",
  description:
    "Follow the latest ReachDem product milestones across WhatsApp onboarding, campaign execution, tracked links, contacts, and platform infrastructure.",
};

const entries = [
  {
    phase: "Current build",
    period: "May 2026",
    title: "WhatsApp onboarding, session pairing, and campaign readiness",
    excerpt:
      "The current product focus is making WhatsApp usable end-to-end: a guided onboarding flow, QR-code phone pairing, session status, test messages, and WhatsApp campaign creation.",
    status: "In progress",
    accent: "from-emerald-100 via-white to-teal-100 dark:from-emerald-500/10 dark:via-zinc-950 dark:to-zinc-900",
    bullets: [
      "WhatsApp setup flow planned around five guided screens.",
      "QR-code pairing connects a user phone through provider session APIs.",
      "Transactional WhatsApp tests validate delivery before campaigns.",
      "WhatsApp composer uses tracked links and campaign-safe message limits.",
    ],
    detail: [
      "ReachDem is adding a dedicated WhatsApp onboarding path before users create WhatsApp campaigns, so the setup feels like a product flow rather than a technical configuration page.",
      "The planned flow covers the value proposition, prerequisites, QR-code connection, a test message, and a final ready state that sends users into WhatsApp campaign creation.",
      "The connection layer is designed around session APIs: create or refresh a WhatsApp session, display the QR code, poll for connection status, and recover cleanly from disconnected or error states.",
      "The campaign side is being prepared so WhatsApp messages can use the same ReachDem primitives as other channels: audiences, drafts, tracked links, delivery jobs, and reporting context.",
      "This release turns WhatsApp from a placeholder channel into a guided workflow teams can actually understand, test, and operate.",
    ],
  },
  {
    phase: "Stage 3",
    period: "April - May 2026",
    title: "Campaign detail, async jobs, and measurable link performance",
    excerpt:
      "ReachDem is tightening the operational layer around campaigns: asynchronous workers, campaign detail views, tracked links, and clearer reporting for sends and clicks.",
    status: "In progress",
    accent: "from-violet-100 via-white to-indigo-100 dark:from-violet-500/10 dark:via-zinc-950 dark:to-zinc-900",
    bullets: [
      "Campaign detail surfaces expose launch and delivery context.",
      "Worker infrastructure supports SMS, email, WhatsApp, scheduler, and campaign jobs.",
      "rcdm.ink tracked links connect clicks back to campaigns and contacts.",
      "Reporting is moving toward delivery, engagement, and attribution in one place.",
    ],
    detail: [
      "The campaign engine is evolving from a create-and-send form into an operating console where teams can inspect what happened after a campaign launches.",
      "Async workers keep delivery work outside the main interface, making larger sends safer and easier to reason about across channels.",
      "Tracked links through rcdm.ink are being connected to messages, contacts, and campaigns so engagement can be attributed instead of only counted globally.",
      "The Links module is part of the same direction: every short link should be measurable, reusable, and tied to the business action that created it.",
      "This stage makes ReachDem more useful after the send, not only before it.",
    ],
  },
  {
    phase: "Stage 2",
    period: "March - April 2026",
    title: "Campaign engine, composer flows, and channel foundations",
    excerpt:
      "ReachDem moved from audience management into real campaign orchestration, with the first channel-specific composer flows and a delivery architecture designed for multiple providers.",
    status: "Shipped",
    accent: "from-sky-100 via-white to-indigo-100 dark:from-sky-500/10 dark:via-zinc-950 dark:to-zinc-900",
    bullets: [
      "Campaign APIs resolve audiences and create message records.",
      "SMS and email composer flows support draft, target, and launch steps.",
      "Provider-aware message records prepare the product for additional channels.",
      "Idempotency and delivery state make sends safer to retry and inspect.",
    ],
    detail: [
      "The campaigns API now resolves selected audiences, creates per-contact messages, and gives the product one place to coordinate outbound communication.",
      "Composer flows separate content, audience selection, scheduling, and launch decisions so operators can prepare campaigns with fewer mistakes.",
      "The messaging model is channel-aware, which is why WhatsApp can now be added without rewriting the whole product around a single provider.",
      "Provider logs, idempotency, and delivery status are part of the reliability layer needed before scaling larger sends.",
      "This stage created the product foundation for SMS, email, and WhatsApp to share the same operational model.",
    ],
  },
  {
    phase: "Stage 1",
    period: "Late February - March 2026",
    title: "Foundations: onboarding, contacts, imports, and audiences",
    excerpt:
      "ReachDem became a complete workspace for getting teams and audiences ready: onboarding, workspace setup, contact records, CSV import, groups, and segmentation basics.",
    status: "Shipped",
    accent: "from-amber-100 via-white to-stone-100 dark:from-amber-500/10 dark:via-zinc-950 dark:to-zinc-900",
    bullets: [
      "Guided account and workspace onboarding.",
      "Contacts with standard fields and workspace isolation.",
      "CSV import with mapping, validation, and duplicate handling.",
      "Groups, segments, and audience preview for campaign preparation.",
    ],
    detail: [
      "ReachDem introduced guided onboarding so teams can create an account, configure a workspace, and reach the product value faster.",
      "The contacts layer supports structured customer records with workspace isolation, giving campaigns a reliable audience source.",
      "CSV import includes visual mapping, validation feedback, and duplicate handling for teams bringing existing databases into ReachDem.",
      "Audience preparation is split between manual groups and segmentation logic so operators can target the right contacts before launching campaigns.",
      "This foundation matters because every later channel — SMS, email, WhatsApp, Links, and Cards — depends on clean audience data.",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <main className="min-h-screen bg-background py-16 sm:py-24">
      <section className="overflow-clip">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-24">
          <div className="border-x border-border/70">
            <div className="relative flex flex-col gap-3 px-6 py-8 sm:px-8">
              <div className="flex items-center gap-2">
                <GitPullRequest className="h-4 w-4 text-primary" />
                <p className="text-sm font-medium">Changelog</p>
              </div>
              <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Product Build Log
                <br />
                & Platform Milestones
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                A contextual view of what ReachDem has shipped, what is actively being built, and what each phase changes for teams using the platform.
              </p>
              <div className="absolute right-0 bottom-0 left-0 h-px w-[200vw] -translate-x-1/2 bg-border" />
              <div className="absolute top-0 right-0 left-0 h-px w-[200vw] -translate-x-1/2 bg-border" />
            </div>

            <div className="flex flex-col">
              {entries.map((entry) => (
                <Dialog key={entry.phase}>
                  <div className="relative flex w-full flex-col gap-6 px-6 py-12 sm:px-8 lg:flex-row lg:gap-0 lg:py-16">
                    <div className="lg:w-40 lg:shrink-0">
                      <div className="top-6 left-0 flex h-fit flex-col gap-2 lg:sticky">
                        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock3 className="h-4 w-4" />
                          {entry.period}
                        </span>
                        <Badge variant="outline" className="w-fit tracking-normal">
                          {entry.phase}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex max-w-3xl flex-1 flex-col gap-5 lg:mx-auto">
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge
                          variant="outline"
                          className={
                            entry.status === "Shipped"
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700 tracking-normal dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300"
                              : "tracking-normal"
                          }
                        >
                          {entry.status}
                        </Badge>
                      </div>

                      <div>
                        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                          {entry.title}
                        </h2>
                        <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                          {entry.excerpt}
                        </p>
                      </div>

                      <DialogTrigger asChild>
                        <button
                          type="button"
                          className={`group overflow-hidden rounded-[1.75rem] border border-border/80 bg-gradient-to-br ${entry.accent} p-6 text-left transition hover:-translate-y-0.5 hover:shadow-lg`}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <div className="inline-flex items-center gap-2 text-sm font-medium text-foreground">
                                <Milestone className="h-4 w-4 text-primary" />
                                Release overview
                              </div>
                              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
                                Open the full entry to see the key milestones, implementation highlights, and what this phase changes for teams using ReachDem.
                              </p>
                            </div>
                            <Maximize2 className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-foreground" />
                          </div>

                          <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            {entry.bullets.map((bullet) => (
                              <div
                                key={bullet}
                                className="rounded-2xl border border-black/6 bg-white/70 px-4 py-3 text-sm text-foreground dark:border-white/8 dark:bg-white/[0.03]"
                              >
                                {bullet}
                              </div>
                            ))}
                          </div>
                        </button>
                      </DialogTrigger>

                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Radio className="h-4 w-4 text-primary" />
                          ReachDem product build
                        </div>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="rounded-full">
                            Read release
                            <ArrowUpRight className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                      </div>
                    </div>

                    <div className="absolute right-0 bottom-0 left-0 h-px w-[200vw] -translate-x-1/2 bg-border" />
                  </div>

                  <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl sm:max-w-3xl">
                    <DialogHeader className="text-left">
                      <div className="flex flex-wrap items-center gap-3">
                        <Badge variant="outline" className="tracking-normal">
                          {entry.phase}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={
                            entry.status === "Shipped"
                              ? "border-emerald-200 bg-emerald-50 text-emerald-700 tracking-normal dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-300"
                              : "tracking-normal"
                          }
                        >
                          {entry.status}
                        </Badge>
                      </div>
                      <DialogTitle className="mt-2 text-2xl sm:text-3xl">{entry.title}</DialogTitle>
                      <DialogDescription className="text-sm leading-7 sm:text-base">
                        {entry.excerpt}
                      </DialogDescription>
                    </DialogHeader>

                    <div className={`rounded-[1.5rem] border border-border/80 bg-gradient-to-br ${entry.accent} p-6`}>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {entry.bullets.map((bullet) => (
                          <div
                            key={bullet}
                            className="rounded-2xl border border-black/6 bg-white/70 px-4 py-3 text-sm text-foreground dark:border-white/8 dark:bg-white/[0.03]"
                          >
                            {bullet}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4">
                      {entry.detail.map((paragraph) => (
                        <div key={paragraph} className="flex items-start gap-3">
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                          <p className="text-sm leading-7 text-muted-foreground sm:text-base">{paragraph}</p>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
