"use client";

import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { cn } from "@/lib/utils";

interface FeaturesSectionProps {
  className?: string;
}

const FeaturesSection = ({ className }: FeaturesSectionProps) => {
  return (
    <section id="features" className={cn("relative overflow-hidden bg-background py-24 sm:py-32", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-24">
        <div className="flex w-full flex-col items-center justify-center">
          <span className="text-sm font-semibold uppercase tracking-[0.32em] text-primary">Platform</span>
          <h2 className="relative z-20 mt-3 text-center font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl">
            Everything You Need to Turn Attention Into Customers
          </h2>
          <p className="mt-4 text-center text-lg text-muted-foreground mx-auto max-w-xl">
            SMS, email, contacts, segmentation, tracked links, and APIs in one customer communication platform.
          </p>

          <div className="mt-16 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <Card
              defaultText="SMS Campaigns"
              revealText="Send targeted SMS campaigns for promos, delivery updates, reminders, and customer reactivation. Schedule, segment, and monitor performance."
              animationSpeed={3}
              containerClassName="bg-primary"
              colors={[[59, 130, 246]]}
            />
            <Card
              defaultText="Email Marketing"
              revealText="Create clear customer updates, newsletters, and follow-up campaigns with templates, personalization, and analytics built in."
              animationSpeed={3}
              colors={[
                [59, 130, 246],
                [147, 197, 253],
              ]}
              dotSize={2}
            />
            <Card
              defaultText="Contact Management"
              revealText="Organize customers into groups and segments for restaurants, logistics teams, agencies, and SMEs. Import from CSV or sync with your tools."
              animationSpeed={3}
              containerClassName="bg-emerald-600"
              colors={[[16, 185, 129]]}
            />
            <Card
              defaultText="Link Shortener"
              revealText="Shorten, brand, and track every campaign link. Understand clicks, sources, and customer intent before you follow up."
              animationSpeed={4}
              containerClassName="bg-orange-600"
              colors={[[249, 115, 22]]}
              dotSize={3}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export { FeaturesSection };

const Card = ({
  defaultText,
  revealText,
  animationSpeed = 3,
  containerClassName = "bg-primary",
  colors = [[255, 255, 255]],
  dotSize = 1,
  hasRadialGradient = false,
}: {
  defaultText: string;
  revealText: string;
  animationSpeed?: number;
  containerClassName?: string;
  colors?: number[][];
  dotSize?: number;
  hasRadialGradient?: boolean;
}) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group/canvas-card border-border relative mx-auto flex h-[25rem] w-full max-w-sm items-center justify-center rounded-2xl border bg-card p-4 transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.04]"
    >
      <BorderIllustration className="text-foreground absolute -top-3 -left-3 h-6 w-6" />
      <BorderIllustration className="text-foreground absolute -bottom-3 -left-3 h-6 w-6" />
      <BorderIllustration className="text-foreground absolute -top-3 -right-3 h-6 w-6" />
      <BorderIllustration className="text-foreground absolute -right-3 -bottom-3 h-6 w-6" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 h-full w-full rounded-2xl overflow-hidden"
          >
            <CanvasRevealEffect
              animationSpeed={animationSpeed}
              containerClassName={containerClassName}
              colors={colors}
              dotSize={dotSize}
            />
            {hasRadialGradient && (
              <div className="bg-muted/50 absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)]" />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20">
        <div className="absolute inset-0 mx-auto flex w-full items-center justify-center p-2 text-center font-display text-2xl font-semibold tracking-tight transition duration-200 group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 text-foreground">
          {defaultText}
        </div>
        <div className="absolute relative inset-0 z-10 flex flex-col items-center justify-center p-2 text-center text-base font-medium tracking-tight opacity-0 transition duration-200 group-hover/canvas-card:-translate-y-2 group-hover/canvas-card:text-white group-hover/canvas-card:opacity-100">
          <span className="mb-2 font-display text-xl font-bold">{defaultText}</span>
          <span>{revealText}</span>
        </div>
      </div>
    </div>
  );
};

export const BorderIllustration = ({
  className,
  ...rest
}: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
