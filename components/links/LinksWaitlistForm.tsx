"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LinksWaitlistForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setEmail("");
  };

  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-white/6 bg-[#06070a] px-6 py-16 text-white shadow-[0_30px_120px_-60px_rgba(0,0,0,0.85)] sm:px-10 sm:py-20 lg:px-16 lg:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 30%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-80"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at center, rgba(33,153,255,0.65) 0%, rgba(33,153,255,0.24) 16%, rgba(6,7,10,0) 58%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 opacity-50"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.7) 0.8px, transparent 0.8px)",
          backgroundSize: "18px 18px",
          maskImage: "linear-gradient(to top, rgba(0,0,0,0.95), transparent)",
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,0.95), transparent)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h2 className="font-display text-5xl font-semibold leading-[0.92] tracking-[-0.05em] text-white sm:text-6xl lg:text-[5.5rem]">
          Subscribe for
          <br />
          New Releases
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-[#707791] sm:text-lg">
          Join the ReachDem Links waitlist to get launch updates, early-access invites, and product news as soon as
          new releases are ready.
        </p>

        <form className="mx-auto mt-10 flex max-w-3xl flex-col gap-3 sm:flex-row" onSubmit={handleSubmit}>
          <div className="flex-1">
            <Input
              id="links-waitlist-email"
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              required
              className="h-16 rounded-[1.35rem] border-0 bg-[#111318] px-5 text-base text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)] placeholder:text-[#858ca1] focus-visible:ring-2 focus-visible:ring-white/10 dark:bg-[#111318]"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="h-16 rounded-[1.35rem] bg-[#f3f3f5] px-8 text-base font-semibold text-[#0a0b0f] shadow-[0_14px_40px_-24px_rgba(255,255,255,0.45)] hover:bg-white"
          >
            Subscribe
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        <div className="mt-4 min-h-6 text-sm">
          {submitted ? (
            <p className="inline-flex items-center gap-2 text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
              You are on the list. We will email you when ReachDem Links is ready.
            </p>
          ) : (
            <p className="text-[#676f84]">No spam. Only launch updates and occasional product news.</p>
          )}
        </div>
      </div>
    </div>
  );
}
