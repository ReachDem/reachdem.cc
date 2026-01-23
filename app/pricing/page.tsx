"use client";

import { Button } from "@/components/ui/button";
import { Check, X, Sparkles, ExternalLink } from "lucide-react";
import { useState, useEffect, useMemo } from "react";

// Currency conversion rates (approximate)
const CURRENCY_RATES = {
    XAF: 1, // Base currency
    USD: 0.0016, // 1 XAF ≈ 0.0016 USD
    EUR: 0.0015, // 1 XAF ≈ 0.0015 EUR
};

// Detect user location and currency
function getCurrencyFromLocation(): { code: string; symbol: string; rate: number } {
    if (typeof window === "undefined") {
        return { code: "XAF", symbol: "FCFA", rate: 1 };
    }

    // Check if user is in Central/West Africa (XAF zone)
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const africanTimezones = [
        "Africa/Douala",
        "Africa/Yaounde",
        "Africa/Brazzaville",
        "Africa/Bangui",
        "Africa/Ndjamena",
        "Africa/Malabo",
        "Africa/Libreville",
        "Africa/Porto-Novo",
        "Africa/Lome",
        "Africa/Ouagadougou",
        "Africa/Abidjan",
        "Africa/Dakar",
        "Africa/Bamako",
        "Africa/Conakry",
        "Africa/Bissau",
        "Africa/Nouakchott",
    ];

    if (africanTimezones.includes(timezone)) {
        return { code: "XAF", symbol: "FCFA", rate: 1 };
    }

    // Default to USD for other regions
    return { code: "USD", symbol: "$", rate: CURRENCY_RATES.USD };
}

// Email volume tiers
const EMAIL_VOLUMES = [
    { value: 1000, label: "1,000" },
    { value: 5000, label: "5,000", recommended: true },
    { value: 10000, label: "10,000" },
    { value: 20000, label: "20,000" },
    { value: 40000, label: "40,000" },
    { value: 60000, label: "60,000" },
    { value: 100000, label: "100,000" },
    { value: 200000, label: "200,000+" },
];

export default function PricingPage() {
    const [selectedPlan, setSelectedPlan] = useState<"trial" | "starter" | "growth" | "pro">("starter");
    const [emailVolume, setEmailVolume] = useState(5000);
    const [billingPeriod, setBillingPeriod] = useState<"monthly" | "yearly">("yearly");
    const [smsVolume, setSmsVolume] = useState(0);
    const [whatsappVolume, setWhatsappVolume] = useState(0);
    const [currency, setCurrency] = useState<{ code: string; symbol: string; rate: number }>({
        code: "XAF",
        symbol: "FCFA",
        rate: 1,
    });

    useEffect(() => {
        setCurrency(getCurrencyFromLocation());
    }, []);

    // Base prices in XAF
    const basePrices = {
        trial: 0,
        starter: 5000,
        growth: 25000,
        pro: 50000,
    };

    // Prix par email selon le volume (XAF par email supplémentaire)
    // Cette fonction calcule le coût total pour un volume donné
    const calculateEmailPrice = (volume: number, includedQuota: number = 0): number => {
        const extraVolume = Math.max(0, volume - includedQuota);
        if (extraVolume <= 0) return 0;
        
        // Calcul du coût pour les emails supplémentaires avec tarification dégressive
        if (extraVolume <= 4000) return extraVolume * 2; // 2 XAF par email
        if (extraVolume <= 9000) return 8000 + (extraVolume - 4000) * 1.5; // 1.5 XAF par email
        if (extraVolume <= 19000) return 15500 + (extraVolume - 9000) * 1.2; // 1.2 XAF par email
        if (extraVolume <= 39000) return 27500 + (extraVolume - 19000) * 1; // 1 XAF par email
        if (extraVolume <= 59000) return 47500 + (extraVolume - 39000) * 0.8; // 0.8 XAF par email
        if (extraVolume <= 99000) return 63500 + (extraVolume - 59000) * 0.6; // 0.6 XAF par email
        return 87500 + (extraVolume - 99000) * 0.5; // 0.5 XAF par email au-delà
    };

    // Prix par SMS (XAF par SMS supplémentaire)
    const calculateSmsPrice = (volume: number, includedQuota: number = 0): number => {
        const extraVolume = Math.max(0, volume - includedQuota);
        if (extraVolume <= 0) return 0;
        // Prix dégressif selon le volume
        if (extraVolume <= 100) return extraVolume * 25; // 25 XAF par SMS
        if (extraVolume <= 500) return 2500 + (extraVolume - 100) * 20; // 20 XAF par SMS
        if (extraVolume <= 1000) return 10500 + (extraVolume - 500) * 18; // 18 XAF par SMS
        return 19500 + (extraVolume - 1000) * 15; // 15 XAF par SMS au-delà
    };

    // Prix par message WhatsApp (XAF par message supplémentaire)
    const calculateWhatsappPrice = (volume: number, includedQuota: number = 0): number => {
        const extraVolume = Math.max(0, volume - includedQuota);
        if (extraVolume <= 0) return 0;
        // Prix dégressif selon le volume
        if (extraVolume <= 100) return extraVolume * 15; // 15 XAF par message
        if (extraVolume <= 500) return 1500 + (extraVolume - 100) * 12; // 12 XAF par message
        if (extraVolume <= 1000) return 6300 + (extraVolume - 500) * 10; // 10 XAF par message
        return 11300 + (extraVolume - 1000) * 8; // 8 XAF par message au-delà
    };

    // Calculate price based on currency
    const formatPrice = (priceXAF: number): string => {
        const convertedPrice = priceXAF * currency.rate;
        if (currency.code === "XAF") {
            return new Intl.NumberFormat("fr-FR").format(convertedPrice);
        }
        return new Intl.NumberFormat("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(convertedPrice);
    };

    // Calculate total price with all options
    const calculateTotalPrice = useMemo(() => {
        // Prix de base du plan
        let basePrice = basePrices[selectedPlan];
        
        // Ajouter le coût des emails supplémentaires (si dépassement du quota inclus)
        const includedEmailQuota = selectedPlan === "trial" ? 100 : 
                                   selectedPlan === "starter" ? 1000 :
                                   selectedPlan === "growth" ? 5000 : 10000;
        const emailCost = calculateEmailPrice(emailVolume, includedEmailQuota);
        
        // Ajouter le coût des SMS (sauf pour le plan trial qui a 20 SMS inclus)
        const includedSmsQuota = selectedPlan === "trial" ? 20 : 0;
        const smsCost = calculateSmsPrice(smsVolume, includedSmsQuota);
        
        // Ajouter le coût des messages WhatsApp (sauf pour le plan trial qui a 100 inclus)
        const includedWhatsappQuota = selectedPlan === "trial" ? 100 : 0;
        const whatsappCost = calculateWhatsappPrice(whatsappVolume, includedWhatsappQuota);
        
        // Prix total mensuel
        let monthlyTotal = basePrice + emailCost + smsCost + whatsappCost;
        
        // Appliquer la réduction annuelle
        if (billingPeriod === "yearly") {
            monthlyTotal = monthlyTotal * 12 * 0.9; // 10% de réduction
        }
        
        return {
            base: basePrice,
            email: emailCost,
            sms: smsCost,
            whatsapp: whatsappCost,
            total: monthlyTotal * currency.rate,
            monthlyEquivalent: (basePrice + emailCost + smsCost + whatsappCost) * currency.rate,
        };
    }, [selectedPlan, emailVolume, smsVolume, whatsappVolume, billingPeriod, currency.rate]);

    const plans = {
        trial: {
            name: "Trial",
            subtitle: "Free",
            description: "Risk-free test",
            basePrice: 0,
            features: [
                "100 Emails / month",
                "20 SMS / month",
                "100 WhatsApp Messages / month",
                "Basic dashboard access",
            ],
            note: "⚠️ SMS quota is only available in this trial plan",
            buttonText: "Get started for free",
        },
        starter: {
            name: "Starter",
            subtitle: "Solo",
            description: "For solopreneurs and beginner e-commerce",
            basePrice: 5000,
            features: [
                "Basic contact management",
                "Simple sends (Manual campaigns)",
                "Link tracking (Click tracking)",
                "Email support",
            ],
            note: null,
            buttonText: "Subscribe",
        },
        growth: {
            name: "Growth",
            subtitle: "SME",
            description: "For SMEs, Marketers, and growth needs",
            basePrice: 25000,
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
        },
        pro: {
            name: "Pro",
            subtitle: "Enterprise",
            description: "For large enterprises and high volume needs",
            basePrice: 50000,
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
        },
    };

    const currentPlan = plans[selectedPlan];

    // Find closest email volume tier
    const currentVolumeTier = EMAIL_VOLUMES.find(
        (tier) => tier.value >= emailVolume
    ) || EMAIL_VOLUMES[EMAIL_VOLUMES.length - 1];

    return (
        <div className="min-h-screen bg-background">
            <section className="container mx-auto px-4 py-16 md:py-24 max-w-7xl">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                        Pricing
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Customize your plan according to your multichannel communication needs
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Plan Customization */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Plan Selection Tabs */}
                        <div className="bg-card rounded-lg border border-border p-1 flex gap-1">
                            {(["trial", "starter", "growth", "pro"] as const).map((planKey) => (
                                <button
                                    key={planKey}
                                    onClick={() => setSelectedPlan(planKey)}
                                    className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                                        selectedPlan === planKey
                                            ? "bg-primary text-primary-foreground shadow-sm"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    {plans[planKey].name}
                                </button>
                            ))}
                        </div>

                        {/* Email Volume Slider */}
                        <div className="bg-card rounded-lg border border-border p-6">
                            <h3 className="text-lg font-semibold mb-4">
                                Monthly email volume (campaigns & transactional)
                            </h3>
                            <div className="mb-4">
                                <div className="text-2xl font-bold text-primary mb-2">
                                    {currentVolumeTier.label} emails/month
                                </div>
                                {currentVolumeTier.recommended && (
                                    <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                                        Recommended
                                    </span>
                                )}
                            </div>

                            {/* Slider */}
                            <div className="relative">
                                <input
                                    type="range"
                                    min="1000"
                                    max="200000"
                                    step="1000"
                                    value={emailVolume}
                                    onChange={(e) => setEmailVolume(Number(e.target.value))}
                                    className="w-full h-2 rounded-lg cursor-pointer"
                                    style={{
                                        background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${
                                            ((emailVolume - 1000) / (200000 - 1000)) * 100
                                        }%, hsl(var(--muted)) ${
                                            ((emailVolume - 1000) / (200000 - 1000)) * 100
                                        }%, hsl(var(--muted)) 100%)`,
                                    }}
                                />
                                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                                    {EMAIL_VOLUMES.slice(0, -1).map((tier) => (
                                        <span key={tier.value}>{tier.label}</span>
                                    ))}
                                    <span>More</span>
                                </div>
                            </div>
                        </div>

                        {/* SMS Volume */}
                        {selectedPlan !== "trial" && (
                            <div className="bg-card rounded-lg border border-border p-6">
                                <h3 className="text-lg font-semibold mb-4">
                                    Volume SMS mensuel
                                </h3>
                                <div className="mb-4">
                                    <div className="text-2xl font-bold text-primary mb-2">
                                        {smsVolume.toLocaleString("fr-FR")} SMS/mois
                                    </div>
                                    {smsVolume > 0 && (
                                        <div className="text-sm text-muted-foreground">
                                            Coût: {formatPrice(calculateTotalPrice.sms)} {currency.symbol}/mois
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="5000"
                                    step="10"
                                    value={smsVolume}
                                    onChange={(e) => setSmsVolume(Number(e.target.value))}
                                    className="w-full h-2 rounded-lg cursor-pointer"
                                    style={{
                                        background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${
                                            (smsVolume / 5000) * 100
                                        }%, hsl(var(--muted)) ${
                                            (smsVolume / 5000) * 100
                                        }%, hsl(var(--muted)) 100%)`,
                                    }}
                                />
                                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                                    <span>0</span>
                                    <span>5,000+</span>
                                </div>
                            </div>
                        )}

                        {/* WhatsApp Volume */}
                        {selectedPlan !== "trial" && (
                            <div className="bg-card rounded-lg border border-border p-6">
                                <h3 className="text-lg font-semibold mb-4">
                                    Volume WhatsApp mensuel
                                </h3>
                                <div className="mb-4">
                                    <div className="text-2xl font-bold text-primary mb-2">
                                        {whatsappVolume.toLocaleString("fr-FR")} messages/mois
                                    </div>
                                    {whatsappVolume > 0 && (
                                        <div className="text-sm text-muted-foreground">
                                            Coût: {formatPrice(calculateTotalPrice.whatsapp)} {currency.symbol}/mois
                                        </div>
                                    )}
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="5000"
                                    step="10"
                                    value={whatsappVolume}
                                    onChange={(e) => setWhatsappVolume(Number(e.target.value))}
                                    className="w-full h-2 rounded-lg cursor-pointer"
                                    style={{
                                        background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${
                                            (whatsappVolume / 5000) * 100
                                        }%, hsl(var(--muted)) ${
                                            (whatsappVolume / 5000) * 100
                                        }%, hsl(var(--muted)) 100%)`,
                                    }}
                                />
                                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                                    <span>0</span>
                                    <span>5,000+</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Plan Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-card rounded-lg border border-border p-6 sticky top-24">
                            {/* Billing Period Toggle */}
                            <div className="flex gap-2 mb-6 p-1 bg-muted rounded-lg">
                                <button
                                    onClick={() => setBillingPeriod("monthly")}
                                    className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                                        billingPeriod === "monthly"
                                            ? "bg-background text-foreground shadow-sm"
                                            : "text-muted-foreground"
                                    }`}
                                >
                                    Monthly
                                </button>
                                <button
                                    onClick={() => setBillingPeriod("yearly")}
                                    className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                                        billingPeriod === "yearly"
                                            ? "bg-background text-foreground shadow-sm"
                                            : "text-muted-foreground"
                                    }`}
                                >
                                    Yearly <span className="text-primary">(-10%)</span>
                                </button>
                            </div>

                            {/* Plan Summary */}
                            <div className="space-y-4 mb-6">
                                <h3 className="font-semibold text-lg">Détail de votre plan</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Plan {currentPlan.name}
                                        </span>
                                        <span className="font-medium">
                                            {formatPrice(calculateTotalPrice.base)} {currency.symbol}
                                        </span>
                                    </div>
                                    {calculateTotalPrice.email > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">
                                                Emails supplémentaires ({currentVolumeTier.label})
                                            </span>
                                            <span className="font-medium">
                                                +{formatPrice(calculateTotalPrice.email)} {currency.symbol}
                                            </span>
                                        </div>
                                    )}
                                    {calculateTotalPrice.sms > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">
                                                SMS ({smsVolume.toLocaleString("fr-FR")})
                                            </span>
                                            <span className="font-medium">
                                                +{formatPrice(calculateTotalPrice.sms)} {currency.symbol}
                                            </span>
                                        </div>
                                    )}
                                    {calculateTotalPrice.whatsapp > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">
                                                WhatsApp ({whatsappVolume.toLocaleString("fr-FR")})
                                            </span>
                                            <span className="font-medium">
                                                +{formatPrice(calculateTotalPrice.whatsapp)} {currency.symbol}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Total Price */}
                            <div className="border-t border-border pt-4 mb-6">
                                <div className="flex justify-between items-baseline mb-2">
                                    <span className="text-lg font-semibold">Prix total</span>
                                    <span className="text-2xl font-bold">
                                        {formatPrice(calculateTotalPrice.total)} {currency.symbol}
                                        {billingPeriod === "yearly" ? "/an" : "/mois"}
                                    </span>
                                </div>
                                {billingPeriod === "yearly" && (
                                    <p className="text-sm text-muted-foreground">
                                        Équiv. {formatPrice(calculateTotalPrice.monthlyEquivalent)} {currency.symbol}/mois en facturation mensuelle
                                    </p>
                                )}
                            </div>

                            {/* CTA Button */}
                            <Button
                                className="w-full"
                                size="lg"
                                variant={selectedPlan === "growth" ? "default" : "outline"}
                            >
                                {currentPlan.buttonText}
                            </Button>

                            {/* Currency Info */}
                            <p className="text-xs text-muted-foreground mt-4 text-center">
                                Prices displayed in {currency.code} ({currency.symbol})
                            </p>
                        </div>
                    </div>
                </div>

                {/* Plan Features Details */}
                <div className="mt-12 bg-card rounded-lg border border-border p-6">
                    <h3 className="text-xl font-bold mb-4">{currentPlan.name} Plan Features</h3>
                    {currentPlan.note && (
                        <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg">
                            <p className="text-sm text-amber-800 dark:text-amber-200">
                                {currentPlan.note}
                            </p>
                        </div>
                    )}
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {currentPlan.features.map((feature, index) => (
                            <li key={index} className="flex items-start gap-2">
                                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                <span className="text-sm">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </div>
    );
}
