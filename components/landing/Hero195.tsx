"use client";
import Link from "next/link";

import { BorderBeam } from "@/components/magicui/border-beam";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Tab {
  title: string;
  icon: React.ReactNode;
  image: string;
}

export interface Hero195Props {
  title: React.ReactNode;
  description: React.ReactNode;
  primaryButtonText: string;
  secondaryButtonText?: string;
  primaryButtonUrl: string;
  secondaryButtonUrl?: string;
  imageSrc?: string;
  className?: string;
}

export function Hero195({
  title,
  description,
  primaryButtonText,
  primaryButtonUrl,
  secondaryButtonText,
  secondaryButtonUrl,
  imageSrc = "/images/screens/insights.png",
  className,
}: Hero195Props) {
  return (
    <section className={cn("relative overflow-hidden bg-background py-12 md:py-20", className)}>
      <div className="absolute top-auto bottom-[13%] left-[-3%] z-10 hidden w-full xl:block">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/patterns/line.svg"
          alt=""
          className="w-full opacity-60"
        />
      </div>
      <div className="absolute top-auto bottom-[32%] left-[31%] z-0 size-full md:top-[-6%] md:bottom-auto md:left-[13.875rem]">
        <div className="aspect-square bg-[radial-gradient(closest-side,var(--color-accent),transparent)]" />
      </div>

      <div className="relative z-20 container">
        <div className="border-x border-border py-20 md:py-24">
          <div className="relative mx-auto max-w-5xl p-2">
            <div className="absolute inset-x-10 top-4 -z-10 h-40 rounded-full bg-primary/15 blur-3xl" />
            <h1 className="mx-auto mt-6 max-w-[16ch] text-center text-5xl font-bold leading-[0.95] tracking-tighter md:max-w-[22ch] md:text-7xl">
              {title}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-muted-foreground md:text-xl">
              {description}
            </p>
            <div className="mx-2 mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-7">
                <Link href={primaryButtonUrl}>{primaryButtonText}</Link>
              </Button>
              {secondaryButtonText && secondaryButtonUrl && (
                <Button variant="outline" asChild size="lg" className="rounded-full px-7">
                  <Link href={secondaryButtonUrl}>{secondaryButtonText}</Link>
                </Button>
              )}
            </div>
          </div>

          <div className="relative mx-auto mt-16 w-full max-w-[1000px] overflow-hidden rounded-xl shadow-[4px_2px_3.123rem_rgba(0,0,0,.15)]">
            <div className="relative aspect-[1.406469761/1] w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageSrc}
                alt="ReachDem dashboard preview"
                className="size-full object-cover object-top"
              />
              <BorderBeam duration={8} size={160} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
