"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronRight,
  CreditCard,
  Gauge,
  MessageSquareMore,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { pricingPlans, pricingSignals } from "@/lib/pricing-data";

const MIN_MESSAGES = 5;
const MAX_MESSAGES = 10000;
const DEFAULT_MESSAGES = 250;
const USD_TO_XAF = 567.38;

const usageProducts = {
  sms: {
    label: "SMS",
    below500: 20,
    from500: 16,
  },
  email: {
    label: "Email",
    below500: 8,
    from500: 5,
  },
} as const;

type UsageProduct = keyof typeof usageProducts;
type DisplayCurrency = "XAF" | "USD";

function formatNumber(value: number, locale: string) {
  return new Intl.NumberFormat(locale).format(value);
}

function formatMoney(value: number, currency: DisplayCurrency, locale: string) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: currency === "USD" ? 2 : 0,
  }).format(value);
}

function getDisplayContext(): { locale: string; currency: DisplayCurrency } {
  if (typeof window === "undefined") {
    return {
      locale: "fr-CM",
      currency: "XAF" as DisplayCurrency,
    };
  }

  const locale = navigator.language || "fr-CM";
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  const isCameroon = locale.toLowerCase().includes("cm") || timezone === "Africa/Douala";
  const isUnitedStates =
    locale.toLowerCase().includes("us") || timezone.startsWith("America/");

  return {
    locale,
    currency: isCameroon ? "XAF" : isUnitedStates ? "USD" : "XAF",
  };
}

export function PricingExperience() {
  const [messages, setMessages] = useState(DEFAULT_MESSAGES);
  const [product, setProduct] = useState<UsageProduct>("sms");
  const { locale: userLocale, currency: displayCurrency } = getDisplayContext();

  const selectedProduct = usageProducts[product];
  const unitPriceXaf = messages < 500 ? selectedProduct.below500 : selectedProduct.from500;
  const totalPriceXaf = messages * unitPriceXaf;
  const unitPrice = displayCurrency === "USD" ? unitPriceXaf / USD_TO_XAF : unitPriceXaf;
  const totalPrice = displayCurrency === "USD" ? totalPriceXaf / USD_TO_XAF : totalPriceXaf;
  const mainPlans = pricingPlans.slice(0, 3);
  const enterprisePlan = pricingPlans[3];

  return (
    <div className="bg-background">
      <section className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_top,rgba(234,179,8,0.18),transparent_42%),linear-gradient(to_bottom,var(--color-background),color-mix(in_oklab,var(--color-background)_82%,var(--color-muted)))]">
        <div className="grain pointer-events-none absolute inset-0" aria-hidden="true" />
        <div
          aria-hidden="true"
          className="absolute left-[-10rem] top-20 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute right-[-8rem] top-32 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl"
        />

        <div className="container relative py-20 sm:py-24 lg:px-24 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="inline-flex items-center gap-2 text-primary rounded-full border border-border bg-background/80 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur">
              Pricing built for African SMB execution
            </div>
            <h1 className="mt-6 text-5xl font-bold tracking-[-0.05em] sm:text-6xl lg:text-7xl">
              Simple pricing for messaging, growth, and custom operations.
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground sm:text-xl">
              The structure follows the strongest signals from the Epic Report:
              simple multichannel delivery, segmentation, automation, and ROI
              tracking for businesses that outgrow manual tools.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="rounded-lg px-7">
                <Link href="/signup">
                  Get started
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-lg px-7">
                <Link href="/support">Talk to sales</Link>
              </Button>
            </div>
          </motion.div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-4 sm:grid-cols-2 xl:grid-cols-5">
            {pricingSignals.map((signal, index) => (
              <motion.div
                key={signal.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.08 * index }}
                className="rounded-xl border border-border bg-background/80 p-4 backdrop-blur"
              >
                <signal.icon className="h-5 w-5 text-primary" />
                <p className="mt-3 text-sm font-semibold">{signal.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{signal.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-18 lg:px-24 lg:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
              Monthly plans
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Three pricing tiers, plus a custom enterprise path.
            </h2>
            <p className="mt-3 text-base text-muted-foreground sm:text-lg">
              The first plan stays intentionally light. The Growth layer carries
              the strongest differentiators from the Epic Report. Enterprise is
              positioned for tailored operational rollouts.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-3">
          {mainPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 * index }}
              className={[
                "relative overflow-hidden rounded-xl border p-6 shadow-[0_8px_24px_rgba(0,0,0,0.035)]",
                plan.featured
                  ? "border-primary/30 bg-[linear-gradient(180deg,rgba(234,179,8,0.12),rgba(255,255,255,0.96))] dark:bg-[linear-gradient(180deg,rgba(234,179,8,0.16),rgba(24,24,27,0.96))]"
                  : "border-border bg-card",
              ].join(" ")}
            >
              <h3 className="mt-3 text-2xl font-semibold">{plan.name}</h3>
              <p className="mt-3 min-h-14 text-sm leading-6 text-muted-foreground">
                {plan.summary}
              </p>

              <div className="mt-8 flex items-end gap-2">
                <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                {plan.cadence ? (
                  <span className="pb-1 text-sm text-muted-foreground">{plan.cadence}</span>
                ) : null}
              </div>

              <div className="mt-8 space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/12 text-primary">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <p className="text-sm leading-6 text-foreground/90">{feature}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-3">
                <Button
                  asChild
                  size="lg"
                  className={`w-full rounded-lg ${plan.featured ? "shadow-lg shadow-primary/20" : ""}`}
                  variant={plan.featured ? "default" : "outline"}
                >
                  <Link href={plan.ctaHref}>
                    {plan.ctaLabel}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>

                {plan.secondaryLabel && plan.secondaryHref ? (
                  <Button asChild size="lg" variant="ghost" className="w-full rounded-lg">
                    <Link href={plan.secondaryHref}>{plan.secondaryLabel}</Link>
                  </Button>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2 }}
          className="mt-6 overflow-hidden rounded-xl border border-border bg-[linear-gradient(135deg,rgba(249,115,22,0.08),rgba(255,255,255,0.96))] shadow-[0_8px_24px_rgba(0,0,0,0.035)] dark:bg-[linear-gradient(135deg,rgba(249,115,22,0.12),rgba(24,24,27,0.96))]"
        >
          <div className="grid gap-8 p-6 md:p-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              {/* <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                {enterprisePlan.eyebrow}
              </p> */}
              <h3 className="mt-3 text-3xl font-semibold tracking-tight">
                {enterprisePlan.name}
              </h3>
              <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                {enterprisePlan.summary}
              </p>

              <div className="mt-6 flex flex-wrap items-end gap-2">
                <span className="text-4xl font-bold tracking-tight">{enterprisePlan.price}</span>
                {enterprisePlan.cadence ? (
                  <span className="pb-1 text-sm text-muted-foreground">{enterprisePlan.cadence}</span>
                ) : null}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg" className="rounded-lg px-7">
                  <Link href={enterprisePlan.ctaHref}>
                    {enterprisePlan.ctaLabel}
                    <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-lg px-7">
                  <Link href="/support">Book an enterprise call</Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {enterprisePlan.features.map((feature) => (
                <div
                  key={feature}
                  className="rounded-lg border border-border bg-background/80 p-4 backdrop-blur"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/12 text-primary">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <p className="text-sm leading-6 text-foreground/90">{feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="border-y border-border bg-muted/30">
        <div className="container grid gap-10 py-18 lg:grid-cols-[0.9fr_1.1fr] lg:px-24 lg:py-24">
          <motion.div
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-primary">
              Pay as you use
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Top up message credits and pay only for what you plan to send.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Use this model for transactional bursts, campaign tests, and teams
              that want spend control before committing to a larger monthly plan.
            </p>

            <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-[0_6px_18px_rgba(0,0,0,0.03)]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/12 text-primary">
                  <Gauge className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold">Usage pricing logic</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedProduct.label} costs{" "}
                    {formatMoney(
                      displayCurrency === "USD"
                        ? selectedProduct.below500 / USD_TO_XAF
                        : selectedProduct.below500,
                      displayCurrency,
                      userLocale,
                    )}{" "}
                    below 500, then{" "}
                    {formatMoney(
                      displayCurrency === "USD"
                        ? selectedProduct.    from500 / USD_TO_XAF
                        : selectedProduct.from500,
                      displayCurrency,
                      userLocale,
                    )}{" "}
                    from 500 and above.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">Credits selected</p>
                  <p className="mt-2 text-3xl font-semibold">{formatNumber(messages, userLocale)}</p>
                </div>
                <div className="rounded-lg bg-muted p-4">
                  <p className="text-sm text-muted-foreground">Unit price</p>
                  <p className="mt-2 text-3xl font-semibold">
                    {formatMoney(unitPrice, displayCurrency, userLocale)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="rounded-xl border border-border bg-card p-6 shadow-[0_8px_24px_rgba(0,0,0,0.035)] sm:p-8"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-muted-foreground">
                    Credit use model
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold">
                    Flexible message credit purchase
                  </h3>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="usage-type" className="mb-2">
                    Usage type
                  </Label>
                  <Select
                    value={product}
                    onValueChange={(value) => setProduct(value as UsageProduct)}
                  >
                    <SelectTrigger id="usage-type" className="h-12 w-full rounded-lg bg-background px-4 text-sm font-medium">
                      <SelectValue placeholder="Select a usage type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sms">SMS credits</SelectItem>
                      <SelectItem value="email">Email credits</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="rounded-lg bg-[linear-gradient(135deg,rgba(234,179,8,0.12),rgba(255,255,255,0.9))] p-5 dark:bg-[linear-gradient(135deg,rgba(234,179,8,0.14),rgba(24,24,27,0.95))]">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{selectedProduct.label} credits</p>
                    <p className="mt-2 text-4xl font-bold tracking-tight">
                      {formatNumber(messages, userLocale)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total price</p>
                    <p className="mt-2 text-4xl font-bold tracking-tight">
                      {formatMoney(totalPrice, displayCurrency, userLocale)}
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
                    <span>{MIN_MESSAGES} messages</span>
                    <span>{MAX_MESSAGES.toLocaleString("fr-FR")} messages</span>
                  </div>
                  <Slider
                    min={MIN_MESSAGES}
                    max={MAX_MESSAGES}
                    step={1}
                    value={[messages]}
                    onValueChange={(value) => setMessages(value[0] ?? DEFAULT_MESSAGES)}
                    aria-label="Select message volume"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg border border-border bg-background p-4">
                  <p className="text-sm text-muted-foreground">Usage credit</p>
                  <p className="mt-2 text-xl font-semibold">
                    {formatNumber(messages, userLocale)} {selectedProduct.label.toLowerCase()}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <p className="text-sm text-muted-foreground">Current tier</p>
                  <p className="mt-2 text-xl font-semibold">
                    {messages < 100 ? "Starter usage" : "Volume usage"}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-background p-4">
                  <p className="text-sm text-muted-foreground">Rate applied</p>
                  <p className="mt-2 text-xl font-semibold">
                    {formatMoney(unitPrice, displayCurrency, userLocale)}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-background p-4 text-sm text-muted-foreground">
                {selectedProduct.label} pricing:
                {" "}
                {formatMoney(
                  displayCurrency === "USD"
                    ? selectedProduct.below500 / USD_TO_XAF
                    : selectedProduct.below500,
                  displayCurrency,
                  userLocale,
                )}
                {" "}
                below 100, then{" "}
                {formatMoney(
                  displayCurrency === "USD"
                    ? selectedProduct.from500 / USD_TO_XAF
                    : selectedProduct.from500,
                  displayCurrency,
                  userLocale,
                )}
                {" "}
                from 100 and above.
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button size="lg" className="h-12 py-2 flex-1 rounded-lg">
                  <CreditCard className="h-4 w-4" />
                  Pay {formatMoney(totalPrice, displayCurrency, userLocale)}
                </Button>
                <Button variant="outline" size="lg" className="h-12 py-2 flex-1 rounded-lg" asChild>
                  <Link href="/support">
                    Talk to sales
                    <MessageSquareMore className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
