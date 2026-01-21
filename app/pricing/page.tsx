import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";

export default function PricingPage() {
    const plans = [
        {
            name: "Free",
            price: "0",
            period: "month",
            description: "Perfect for getting started",
            features: [
                "Up to 1,000 sends/month",
                "Email support",
                "Basic API",
                "Documentation",
                "Up to 3 projects",
            ],
            limitations: [
                "No priority support",
                "No advanced customization",
            ],
            buttonText: "Get started for free",
            buttonVariant: "outline" as const,
            popular: false,
        },
        {
            name: "Standard",
            price: "29",
            period: "month",
            description: "For small teams",
            features: [
                "Up to 10,000 sends/month",
                "Priority support",
                "Full API",
                "Webhooks",
                "Up to 10 projects",
                "Advanced statistics",
            ],
            limitations: [],
            buttonText: "Choose Standard",
            buttonVariant: "default" as const,
            popular: true,
        },
        {
            name: "Pro",
            price: "99",
            period: "month",
            description: "For growing businesses",
            features: [
                "Up to 100,000 sends/month",
                "24/7 support",
                "Advanced API",
                "Custom webhooks",
                "Unlimited projects",
                "Detailed statistics",
                "Advanced customization",
                "Premium integrations",
            ],
            limitations: [],
            buttonText: "Choose Pro",
            buttonVariant: "default" as const,
            popular: false,
        },
        {
            name: "Enterprise",
            price: "Custom",
            period: "",
            description: "Custom solutions",
            features: [
                "Unlimited sends",
                "Dedicated support",
                "Custom API",
                "Guaranteed SLA",
                "Unlimited projects",
                "Advanced analytics",
                "Full customization",
                "Custom integrations",
                "Team training",
                "Dedicated account manager",
            ],
            limitations: [],
            buttonText: "Contact us",
            buttonVariant: "outline" as const,
            popular: false,
        },
    ];

    const comparisonFeatures = [
        {
            feature: "Sends per month",
            gratuit: "1,000",
            standard: "10,000",
            pro: "100,000",
            entreprise: "Unlimited",
        },
        {
            feature: "Support",
            gratuit: "Email",
            standard: "Priority",
            pro: "24/7",
            entreprise: "Dedicated",
        },
        {
            feature: "API",
            gratuit: "Basic",
            standard: "Full",
            pro: "Advanced",
            entreprise: "Custom",
        },
        {
            feature: "Webhooks",
            gratuit: false,
            standard: true,
            pro: "Custom",
            entreprise: "Custom",
        },
        {
            feature: "Projects",
            gratuit: "3",
            standard: "10",
            pro: "Unlimited",
            entreprise: "Unlimited",
        },
        {
            feature: "Statistics",
            gratuit: "Basic",
            standard: "Advanced",
            pro: "Detailed",
            entreprise: "Advanced analytics",
        },
        {
            feature: "Customization",
            gratuit: false,
            standard: false,
            pro: "Advanced",
            entreprise: "Full",
        },
        {
            feature: "Integrations",
            gratuit: "Standard",
            standard: "Standard",
            pro: "Premium",
            entreprise: "Custom",
        },
        {
            feature: "SLA",
            gratuit: false,
            standard: false,
            pro: false,
            entreprise: "Guaranteed",
        },
        {
            feature: "Training",
            gratuit: false,
            standard: false,
            pro: false,
            entreprise: true,
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Introduction Section */}
            <section className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Pricing
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Start your journey according to your requirements and preferences
                    </p>
                </div>

                {/* Pricing Grids */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {plans.map((plan, index) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-lg border-2 p-6 flex flex-col ${
                                plan.popular
                                    ? "border-primary bg-card shadow-lg scale-105 md:scale-105"
                                    : "border-border bg-card"
                            }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold">
                                        Popular
                                    </span>
                                </div>
                            )}

                            <div className="mb-4">
                                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                <p className="text-sm text-muted-foreground mb-4">
                                    {plan.description}
                                </p>
                                <div className="flex items-baseline gap-1">
                                    {plan.price === "Custom" ? (
                                        <span className="text-3xl font-bold">
                                            {plan.price}
                                        </span>
                                    ) : (
                                        <>
                                            <span className="text-3xl font-bold">
                                                ${plan.price}
                                            </span>
                                            <span className="text-muted-foreground">
                                                /{plan.period}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <ul className="flex-1 space-y-3 mb-6">
                                {plan.features.map((feature, featureIndex) => (
                                    <li
                                        key={featureIndex}
                                        className="flex items-start gap-2"
                                    >
                                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                        <span className="text-sm">{feature}</span>
                                    </li>
                                ))}
                                {plan.limitations.map((limitation, limitIndex) => (
                                    <li
                                        key={`limit-${limitIndex}`}
                                        className="flex items-start gap-2 text-muted-foreground"
                                    >
                                        <X className="h-5 w-5 shrink-0 mt-0.5" />
                                        <span className="text-sm">{limitation}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                variant={plan.buttonVariant}
                                className="w-full"
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
                    <div className="rounded-lg border border-border overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-border bg-muted/50">
                                        <th className="text-left p-4 font-semibold">
                                            Features
                                        </th>
                                        <th className="text-center p-4 font-semibold">
                                            Free
                                        </th>
                                        <th className="text-center p-4 font-semibold">
                                            Standard
                                        </th>
                                        <th className="text-center p-4 font-semibold">
                                            Pro
                                        </th>
                                        <th className="text-center p-4 font-semibold">
                                            Enterprise
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
                                                {typeof row.gratuit === "boolean" ? (
                                                    row.gratuit ? (
                                                        <Check className="h-5 w-5 text-primary mx-auto" />
                                                    ) : (
                                                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                                                    )
                                                ) : (
                                                    <span className="text-sm">
                                                        {row.gratuit}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4 text-center">
                                                {typeof row.standard === "boolean" ? (
                                                    row.standard ? (
                                                        <Check className="h-5 w-5 text-primary mx-auto" />
                                                    ) : (
                                                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                                                    )
                                                ) : (
                                                    <span className="text-sm">
                                                        {row.standard}
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
                                            <td className="p-4 text-center">
                                                {typeof row.entreprise === "boolean" ? (
                                                    row.entreprise ? (
                                                        <Check className="h-5 w-5 text-primary mx-auto" />
                                                    ) : (
                                                        <X className="h-5 w-5 text-muted-foreground mx-auto" />
                                                    )
                                                ) : (
                                                    <span className="text-sm">
                                                        {row.entreprise}
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
