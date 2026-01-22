import { Button } from "@/components/ui/button";
import { Check, X, Sparkles } from "lucide-react";

export default function PricingPage() {
    const plans = [
        {
            name: "Trial",
            subtitle: "Free",
            price: "0",
            period: "month",
            description: "Risk-free test",
            target: "Discover the platform",
            features: [
                "100 Emails / month",
                "20 SMS / month",
                "100 WhatsApp Messages / month",
                "Basic dashboard access",
            ],
            note: "⚠️ SMS quota is only available in this trial plan",
            buttonText: "Get started for free",
            buttonVariant: "outline" as const,
            popular: false,
            highlight: false,
        },
        {
            name: "Starter",
            subtitle: "Solo",
            price: "5 000",
            period: "month",
            description: "For solopreneurs and beginner e-commerce",
            target: "Solopreneurs, beginner e-commerce",
            features: [
                "Basic contact management",
                "Simple sends (Manual campaigns)",
                "Link tracking (Click tracking)",
                "Email support",
            ],
            note: null,
            buttonText: "Subscribe",
            buttonVariant: "outline" as const,
            popular: false,
            highlight: false,
        },
        {
            name: "Growth",
            subtitle: "SME",
            price: "25 000",
            period: "month",
            description: "For SMEs, Marketers, and growth needs",
            target: "SMEs, Marketers, growth needs",
            features: [
                "Everything in Starter",
                "Advanced audience segmentation",
                "Automations (Workflows)",
                "Message templates",
                "Advanced analytics & ROI",
                "Priority support",
            ],
            note: null,
            buttonText: "Subscribe",
            buttonVariant: "default" as const,
            popular: true,
            highlight: true,
        },
        {
            name: "Pro",
            subtitle: "Enterprise",
            price: "50 000+",
            period: "month",
            description: "For large enterprises and high volume needs",
            target: "Large enterprises, high volume needs",
            features: [
                "Everything in Growth",
                "Multi-workspace (Multiple accounts)",
                "Role and permission management",
                "API & Webhooks integrations",
                "Guaranteed SLA",
                "High sending volumes",
            ],
            note: null,
            buttonText: "Contact us",
            buttonVariant: "outline" as const,
            popular: false,
            highlight: false,
        },
    ];

    const comparisonFeatures = [
        {
            feature: "Emails / month",
            essai: "100",
            starter: "Unlimited",
            growth: "Unlimited",
            pro: "Unlimited",
        },
        {
            feature: "SMS / month",
            essai: "20",
            starter: "0",
            growth: "0",
            pro: "0",
        },
        {
            feature: "WhatsApp Messages / month",
            essai: "100",
            starter: "Unlimited",
            growth: "Unlimited",
            pro: "Unlimited",
        },
        {
            feature: "Contact management",
            essai: "Basic",
            starter: "Basic",
            growth: "Advanced",
            pro: "Advanced",
        },
        {
            feature: "Manual campaigns",
            essai: false,
            starter: true,
            growth: true,
            pro: true,
        },
        {
            feature: "Link tracking",
            essai: false,
            starter: true,
            growth: true,
            pro: true,
        },
        {
            feature: "Advanced segmentation",
            essai: false,
            starter: false,
            growth: true,
            pro: true,
        },
        {
            feature: "Automations (Workflows)",
            essai: false,
            starter: false,
            growth: true,
            pro: true,
        },
        {
            feature: "Message templates",
            essai: false,
            starter: false,
            growth: true,
            pro: true,
        },
        {
            feature: "Analytics & ROI",
            essai: "Basic",
            starter: "Basic",
            growth: "Advanced",
            pro: "Advanced",
        },
        {
            feature: "Multi-workspace",
            essai: false,
            starter: false,
            growth: false,
            pro: true,
        },
        {
            feature: "Roles & permissions",
            essai: false,
            starter: false,
            growth: false,
            pro: true,
        },
        {
            feature: "API & Webhooks",
            essai: false,
            starter: false,
            growth: false,
            pro: true,
        },
        {
            feature: "Guaranteed SLA",
            essai: false,
            starter: false,
            growth: false,
            pro: true,
        },
        {
            feature: "Support",
            essai: "Email",
            starter: "Email",
            growth: "Priority",
            pro: "Dedicated",
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Introduction Section */}
            <section className="container mx-auto px-4 py-16 md:py-24 max-w-7xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Pricing
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Choose the plan that fits your multichannel communication needs
                    </p>
                </div>

                {/* Pricing Grids */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {plans.map((plan, index) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-xl border-2 p-6 flex flex-col transition-all duration-300 ${
                                plan.highlight
                                    ? "border-primary bg-gradient-to-br from-primary/5 to-primary/10 shadow-2xl scale-105 md:scale-105 lg:scale-110 z-10"
                                    : "border-border bg-card hover:shadow-lg"
                            }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                                        <Sparkles className="h-3 w-3" />
                                        Best Seller
                                    </span>
                                </div>
                            )}

                            <div className="mb-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                                    {plan.subtitle && (
                                        <span className="text-sm text-muted-foreground font-medium">
                                            ({plan.subtitle})
                                        </span>
                                    )}
                                </div>
                                <p className="text-sm text-muted-foreground mb-1">
                                    {plan.description}
                                </p>
                                <p className="text-xs text-muted-foreground italic mb-4">
                                    {plan.target}
                                </p>
                                <div className="flex items-baseline gap-1">
                                    {plan.price.includes("+") ? (
                                        <span className="text-3xl font-bold">
                                            {plan.price} XAF
                                        </span>
                                    ) : (
                                        <>
                                            <span className="text-3xl font-bold">
                                                {plan.price} XAF
                                            </span>
                                            <span className="text-muted-foreground">
                                                /{plan.period}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {plan.note && (
                                <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg">
                                    <p className="text-xs text-amber-800 dark:text-amber-200">
                                        {plan.note}
                                    </p>
                                </div>
                            )}

                            <ul className="flex-1 space-y-3 mb-6">
                                {plan.features.map((feature, featureIndex) => (
                                    <li
                                        key={featureIndex}
                                        className="flex items-start gap-2"
                                    >
                                        <Check className={`h-5 w-5 shrink-0 mt-0.5 ${
                                            plan.highlight ? "text-primary" : "text-primary"
                                        }`} />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                variant={plan.buttonVariant}
                                className={`w-full ${
                                    plan.highlight
                                        ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                                        : ""
                                }`}
                                size="lg"
                            >
                                {plan.buttonText}
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Comparison Table */}
                <div className="mb-16">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                        Plan Comparison
                    </h2>
                    <div className="rounded-lg border border-border overflow-hidden bg-card">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border bg-muted/50">
                                        <th className="text-left p-4 font-semibold">
                                            Features
                                        </th>
                                        <th className="text-center p-4 font-semibold">
                                            Trial
                                        </th>
                                        <th className="text-center p-4 font-semibold">
                                            Starter
                                        </th>
                                        <th className="text-center p-4 font-semibold bg-primary/10">
                                            Growth
                                        </th>
                                        <th className="text-center p-4 font-semibold">
                                            Pro
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonFeatures.map((row, index) => (
                                        <tr
                                            key={index}
                                            className="border-b border-border hover:bg-muted/30 transition-colors"
                                        >
                                            <td className="p-4 font-medium">
                                                {row.feature}
                                            </td>
                                            <td className="p-4 text-center">
                                                {typeof row.essai === "boolean" ? (
                                                    row.essai ? (
                                                        <Check className="h-5 w-5 text-primary mx-auto" />
                                                    ) : (
                                                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                                                    )
                                                ) : (
                                                    <span className="text-sm">
                                                        {row.essai}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 text-center">
                                                {typeof row.starter === "boolean" ? (
                                                    row.starter ? (
                                                        <Check className="h-5 w-5 text-primary mx-auto" />
                                                    ) : (
                                                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                                                    )
                                                ) : (
                                                    <span className="text-sm">
                                                        {row.starter}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 text-center bg-primary/5">
                                                {typeof row.growth === "boolean" ? (
                                                    row.growth ? (
                                                        <Check className="h-5 w-5 text-primary mx-auto" />
                                                    ) : (
                                                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                                                    )
                                                ) : (
                                                    <span className="text-sm font-medium">
                                                        {row.growth}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 text-center">
                                                {typeof row.pro === "boolean" ? (
                                                    row.pro ? (
                                                        <Check className="h-5 w-5 text-primary mx-auto" />
                                                    ) : (
                                                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                                                    )
                                                ) : (
                                                    <span className="text-sm">
                                                        {row.pro}
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
