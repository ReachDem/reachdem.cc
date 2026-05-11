"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { Button } from "@/components/ui/button";

export function CTASection() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden bg-primary py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-black/[0.06]" />
        <div className="absolute -bottom-12 -left-12 h-60 w-60 rounded-full bg-black/[0.06]" />
        <div className="absolute right-1/3 bottom-0 h-40 w-40 rounded-full bg-black/[0.04]" />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-24">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl lg:text-5xl">
            Build a Customer Channel You Own.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/70">
            Start with SMS, email, contacts, and tracked links. Grow into a measurable customer messaging system for your business.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="group h-12 rounded-xl bg-[#09090b] px-8 text-base font-semibold text-white hover:bg-[#09090b]/90"
              asChild
            >
              <Link href="https://app.reachdem.cc/register">
                Start Free
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-xl border-primary-foreground/20 bg-transparent px-8 text-base text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              asChild
            >
              <Link href="/support">Talk to Sales</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
