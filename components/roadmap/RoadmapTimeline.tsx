"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Cpu, LayoutList, LocateFixed, Rocket, Users } from "lucide-react";
import { useRef } from "react";

import { roadmapData } from "@/lib/roadmap-data";
import { cn } from "@/lib/utils";

const iconMap = {
  LayoutList,
  LocateFixed,
  Users,
  Cpu,
};

const statusStyles = {
  planned: "bg-amber-500/12 text-amber-700 ring-1 ring-amber-500/20 dark:text-amber-300",
  "in-progress": "bg-sky-500/12 text-sky-700 ring-1 ring-sky-500/20 dark:text-sky-300",
  completed: "bg-emerald-500/12 text-emerald-700 ring-1 ring-emerald-500/20 dark:text-emerald-300",
} as const;

export function RoadmapTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const timelineItems = [...roadmapData].reverse();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,rgba(232,186,70,0.16),transparent_60%)]" />

      <div className="border-y border-border/80">
        <div className="container flex flex-col gap-6 border-x border-border/80 py-8 lg:py-12">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground shadow-sm">
            <Rocket className="h-4 w-4 text-primary" />
            Product roadmap
          </div>
          <div className="max-w-4xl">
            <h1 className="font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              How ReachDem is evolving across audience, analytics, and automation.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              This roadmap translates the platform direction into concrete milestones so the product can scale from
              campaign execution to full communication operations.
            </p>
          </div>
        </div>
      </div>

      <div
        ref={ref}
        className="container relative border-x border-border/80 pb-16 lg:pb-24 [&>*:last-child]:pb-12 [&>div>div:first-child]:pt-16"
      >
        <div className="pointer-events-none absolute top-0 z-0 h-full w-[3px] translate-x-5 lg:left-1/2 lg:-translate-x-1/2">
          <div className="h-4 w-[3px] bg-linear-to-b from-transparent to-foreground/10" />
          <div className="relative h-[calc(100%-1rem)] w-full bg-linear-to-b from-foreground/10 via-foreground/10 to-transparent">
            <motion.div
              className="absolute top-0 left-0 z-10 w-[3px] rounded-full bg-linear-to-b from-transparent via-primary to-transparent"
              style={{ height }}
            />
          </div>
        </div>

        {timelineItems.map((item) => {
          const Icon = iconMap[item.icon];

          return (
            <div key={item.id} className="relative flex">
              <div
                className={cn(
                  "flex w-full justify-center px-1 py-10 text-end md:gap-6 lg:gap-10",
                  item.reverse && "lg:flex-row-reverse lg:text-start",
                )}
              >
                <div className="flex-1 max-lg:hidden">
                  <div className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                    {item.phase} / {item.period}
                  </div>
                  <h2 className="mt-4 font-display text-2xl tracking-tight text-foreground">{item.title}</h2>
                  <p
                    className={cn(
                      "mt-3 max-w-[360px] text-base leading-7 text-muted-foreground",
                      !item.reverse && "ml-auto",
                    )}
                  >
                    {item.description}
                  </p>
                  <div className={cn("mt-5 flex flex-wrap gap-2", !item.reverse && "justify-end")}>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-medium",
                        statusStyles[item.status],
                      )}
                    >
                      {item.statusLabel}
                    </span>
                  </div>
                </div>

                <div className="z-[-1] size-fit -translate-y-5 bg-background p-4 max-lg:-translate-x-4">
                  <div className="rounded-[10px] border border-border bg-card p-[5px] shadow-md">
                    <div className={cn("size-fit rounded-md border border-border bg-muted p-2", item.accent)}>
                      <Icon className="size-4 shrink-0" />
                    </div>
                  </div>
                </div>

                <div className="flex-1 max-lg:-translate-x-4">
                  <div className="text-start lg:pointer-events-none lg:hidden">
                    <div className="inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-[0.24em] text-muted-foreground">
                      {item.phase} / {item.period}
                    </div>
                    <h2 className="mt-4 font-display text-2xl tracking-tight text-foreground">{item.title}</h2>
                    <p className="mt-3 mb-4 max-w-[320px] text-base leading-7 text-muted-foreground">{item.description}</p>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-medium",
                        statusStyles[item.status],
                      )}
                    >
                      {item.statusLabel}
                    </span>
                  </div>

                  <div className="flex items-start justify-start">
                    <div className={cn(item.reverse && "lg:ml-auto")}>
                      <div className="px-6 lg:px-10">
                        <DiagonalPattern className="h-6 lg:h-10" />
                      </div>
                      <div className="relative grid grid-cols-[auto_1fr_auto] items-stretch">
                        <DiagonalPattern className="h-full w-6 lg:w-10" />
                        <div className="min-h-[300px] border-y border-border bg-card p-6 sm:min-h-[360px] sm:p-8">
                          <div className="flex h-full flex-col justify-between gap-6">
                            <div>
                              <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                                {item.preview.eyebrow}
                              </p>
                              <h3 className="mt-3 max-w-sm font-display text-2xl font-semibold tracking-tight text-foreground">
                                {item.preview.title}
                              </h3>
                            </div>

                            <dl className="flex flex-col space-y-3">
                              {item.preview.metrics.map((metric) => (
                                <div key={metric.label} className="flex items-center justify-between border-b border-border/40 pb-3 last:border-0 last:pb-0">
                                  <dt className="text-sm text-muted-foreground">{metric.label}</dt>
                                  <dd className="text-sm font-medium text-foreground">{metric.value}</dd>
                                </div>
                              ))}
                            </dl>

                            <div className="rounded-xl border border-border bg-muted/40 p-5">
                              <div className="text-sm font-medium text-foreground">Included in this milestone</div>
                              <ul className="mt-3 space-y-3 text-sm leading-6 text-muted-foreground">
                                {item.highlights.map((highlight) => (
                                  <li key={highlight} className="flex items-start gap-3">
                                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" />
                                    <span>{highlight}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                        <DiagonalPattern className="w-6 lg:w-10" />
                      </div>
                      <div className="px-6 lg:px-10">
                        <DiagonalPattern className="h-6 lg:h-10" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="h-8 w-full border-y border-border/80 md:h-12 lg:h-20">
        <div className="container h-full w-full border-x border-border/80" />
      </div>
    </section>
  );
}

function DiagonalPattern({ className }: { className?: string }) {
  return (
    <div
      className={cn("h-full w-full border-2 border-dashed border-border bg-card/70", className)}
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, transparent 0 10px, rgb(from var(--color-foreground) r g b / 0.06) 10px 12px)",
      }}
    />
  );
}
