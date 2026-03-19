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
  description: "Follow the latest product milestones and what has already shipped across ReachDem.",
};

const entries = [
  {
    phase: "Stage 3",
    period: "Planned",
    title: "Campaign detail, aggregated stats, and links analytics",
    excerpt:
      "The next phase focuses on turning ReachDem into a stronger reporting surface, with dedicated campaign views, aggregated metrics, and clearer links analytics.",
    status: "Planned",
    accent: "from-violet-100 via-white to-indigo-100 dark:from-violet-500/10 dark:via-zinc-950 dark:to-zinc-900",
    bullets: [
      "Dedicated campaign detail screen.",
      "Aggregated statistics backed by Redis caching.",
      "Links module with listing and analytics.",
      "More actionable performance reporting.",
    ],
    detail: [
      "A dedicated campaign screen will make it easier to track delivery progress, click activity, and message-level status in one place.",
      "A stats API will aggregate delivery and engagement data while keeping response times fast through Redis caching.",
      "The Links module will provide a focused view of tracked links, tied back to the campaign or message that created them.",
      "This phase is about turning ReachDem into a stronger operating console, not just a sending engine.",
      "The goal is to make it obvious what is working, what is blocked, and what needs optimization next.",
    ],
  },
  {
    phase: "Stage 2",
    period: "March 9 - March 14, 2026",
    title: "Campaign engine, async messaging, and tracked links",
    excerpt:
      "ReachDem moved from contact operations to full campaign orchestration, asynchronous sending, and tracked-link infrastructure for measurable engagement.",
    status: "In progress",
    accent: "from-sky-100 via-white to-indigo-100 dark:from-sky-500/10 dark:via-zinc-950 dark:to-zinc-900",
    bullets: [
      "Campaign orchestration API delivered.",
      "Async delivery architecture under review.",
      "Tracked links through rcdm.ink in progress.",
      "Campaign management interface in progress.",
    ],
    detail: [
      "The campaigns API now resolves audiences, creates per-contact messages, and orchestrates sends through a single product flow.",
      "Async processing through workers is being introduced so large sends no longer block the main interface.",
      "Tracked links under the rcdm.ink domain are being connected to campaigns, messages, and contacts for click-level visibility.",
      "The campaign interface is moving toward one place to draft, target, save, and launch outbound communication.",
      "This phase lays the operational foundation for reliable execution at scale with stronger engagement visibility.",
    ],
  },
  {
    phase: "Stage 1",
    period: "Late February - March 7, 2026",
    title: "Foundations: onboarding, contacts, and audiences",
    excerpt:
      "ReachDem became a complete workspace for importing, organizing, and segmenting contacts, with the infrastructure required to support reliable outbound messaging.",
    status: "Shipped",
    accent: "from-amber-100 via-white to-stone-100 dark:from-amber-500/10 dark:via-zinc-950 dark:to-zinc-900",
    bullets: [
      "Guided onboarding and workspace setup.",
      "Contacts with standard and custom fields.",
      "CSV import with visual mapping.",
      "Groups, segments, and audience preview.",
    ],
    detail: [
      "ReachDem introduced a guided four-step onboarding flow so teams can create an account, configure a workspace, and get moving faster.",
      "The contacts layer now supports both standard and custom fields, with workspace isolation and duplicate management built in.",
      "CSV import includes visual mapping, line-by-line error feedback, and duplicate detection for larger databases.",
      "Audience building is split between manual groups and dynamic segments with a visual query builder and real-time preview.",
      "The messaging foundation already includes provider logs, automatic fallback behavior, and idempotent SMS delivery in production.",
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
                Latest Enhancements
                <br />
                & Platform News
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                A running view of what ReachDem has already shipped, what is currently in progress, and what is planned next.
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
                          ReachDem MVP
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
