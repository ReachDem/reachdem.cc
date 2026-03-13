"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

type Category =
  | "Platform"
  | "Pricing"
  | "Support"
  | "Security"
  | "Features"
  | "Other";

interface FAQItem {
  question: string;
  answer: string;
  category: Category;
}

const faqItems: FAQItem[] = [
  // Platform Questions
  {
    category: "Platform",
    question: "What is this platform?",
    answer:
      "This is a solution designed to facilitate the management of your online processes, automate your key tasks, and improve communication with your users.",
  },
  {
    category: "Platform",
    question: "What makes our solution unique?",
    answer:
      "Our platform stands out for its ease of use, optimized performance, and features tailored to the real needs of today's users.",
  },
  {
    category: "Platform",
    question: "Who is this platform for?",
    answer:
      "Our platform is designed for individuals, professionals, and businesses looking to streamline their online operations and improve their workflow efficiency.",
  },
  // Pricing Questions
  {
    category: "Pricing",
    question: "Is there a free version?",
    answer:
      "Yes, we offer a free plan with basic features to get you started right away. Advanced plans are available to access additional tools.",
  },
  {
    category: "Pricing",
    question: "Why do prices vary between plans?",
    answer:
      "Each plan includes different features and levels of support, tailored to specific needs (personal, professional, or enterprise).",
  },
  {
    category: "Pricing",
    question: "Can I upgrade or downgrade my plan?",
    answer:
      "Yes, you can change your plan at any time. When upgrading, you'll get immediate access to new features. When downgrading, changes take effect at the start of your next billing cycle.",
  },
  {
    category: "Pricing",
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, debit cards, and PayPal. Enterprise customers can also arrange for invoice-based billing.",
  },
  // Support Questions
  {
    category: "Support",
    question: "Is support free?",
    answer:
      "Basic support is included for free. Premium support options may be available depending on your plan.",
  },
  {
    category: "Support",
    question: "How do I get immediate assistance?",
    answer:
      "You can contact our team via the contact form on the site or directly through contact@reachdem.cc for a quick response.",
  },
  {
    category: "Support",
    question: "What are your support hours?",
    answer:
      "Our support team is available Monday through Friday, 9 AM to 6 PM (local time). Premium plan members have access to extended support hours.",
  },
  // Security Questions
  {
    category: "Security",
    question: "Is my data secure?",
    answer:
      "Yes, we use modern security protocols to protect your personal information and data.",
  },
  {
    category: "Security",
    question: "What happens in case of a breach or outage?",
    answer:
      "A continuity plan and regular backups are in place to minimize the impact of potential incidents.",
  },
  {
    category: "Security",
    question: "Where is my data stored?",
    answer:
      "Your data is stored on secure servers in certified data centers that comply with international security standards and regulations.",
  },
  {
    category: "Security",
    question: "Can I export my data?",
    answer:
      "Yes, you can export your data at any time in standard formats. We believe in data portability and will never lock in your information.",
  },
  // Features Questions
  {
    category: "Features",
    question: "Can I integrate other tools or services?",
    answer:
      "Yes, our platform supports numerous integrations with external tools to optimize your workflows.",
  },
  {
    category: "Features",
    question: "Can I update my account without losing my data?",
    answer:
      "Yes, any update to your account or information is done without interruption or content loss.",
  },
  {
    category: "Features",
    question: "Do you offer an API?",
    answer:
      "Yes, we provide a comprehensive REST API that allows you to integrate our platform with your existing systems and build custom solutions.",
  },
  // Other Questions
  {
    category: "Other",
    question: "What if I forget my password?",
    answer:
      "You can use the email recovery feature to reset your password easily.",
  },
  {
    category: "Other",
    question: "Is there a roadmap for future features?",
    answer:
      "Yes, we regularly publish our updates and announcements to keep you informed of upcoming improvements.",
  },
  {
    category: "Other",
    question: "Do you have an automatic backup system?",
    answer:
      "Yes, regular backups are performed to ensure your data remains available and protected.",
  },
];

const categories: Category[] = [
  "Platform",
  "Pricing",
  "Support",
  "Security",
  "Features",
  "Other",
];

const TOP_PADDING = 300;

export function FAQSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("Platform");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isScrollingRef = useRef(false);
  const categoryRefs = useRef<Record<Category, HTMLDivElement | null>>({
    Platform: null,
    Pricing: null,
    Support: null,
    Security: null,
    Features: null,
    Other: null,
  });

  const setupObserver = useCallback(() => {
    observerRef.current?.disconnect();

    let debounceTimeout: NodeJS.Timeout;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Skip if we're programmatically scrolling
        if (isScrollingRef.current) return;

        // Clear any pending timeout
        if (debounceTimeout) {
          clearTimeout(debounceTimeout);
        }

        // Debounce the category update
        debounceTimeout = setTimeout(() => {
          const intersectingEntries = entries.filter(
            (entry) => entry.isIntersecting,
          );

          // Find the entry that's closest to being 100px from the top
          const entry = intersectingEntries.reduce(
            (closest, current) => {
              const rect = current.boundingClientRect;
              const distanceFromThreshold = Math.abs(rect.top - TOP_PADDING);
              const closestDistance = closest
                ? Math.abs(closest.boundingClientRect.top - TOP_PADDING)
                : Infinity;

              return distanceFromThreshold < closestDistance
                ? current
                : closest;
            },
            null as IntersectionObserverEntry | null,
          );

          if (entry) {
            const category = entry.target.getAttribute(
              'data-category',
            ) as Category;
            if (category) {
              setActiveCategory(category);
            }
          }
        }, 150);
      },
      {
        root: null,
        rootMargin: `-${TOP_PADDING}px 0px -100% 0px`,
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    Object.entries(categoryRefs.current).forEach(([category, element]) => {
      if (element) {
        element.setAttribute('data-category', category);
        observerRef.current?.observe(element);
      }
    });

    return () => {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, []);

  useEffect(() => {
    const cleanup = setupObserver();
    return () => {
      cleanup();
      observerRef.current?.disconnect();
    };
  }, [setupObserver]);

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category);
    isScrollingRef.current = true;

    const element = document.getElementById(`faq-${category.toLowerCase()}`);
    if (element) {
      element.style.scrollMargin = `${TOP_PADDING}px`;
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });

      setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };

  return (
    <section className="bg-sand-100 min-h-screen py-16 md:py-28 lg:py-32">
      <div className="container max-w-4xl">
        <div className="text-center">
          <h1 className="text-center text-4xl font-semibold tracking-tight sm:text-5xl">
            We&apos;ve got answers
          </h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-center text-balance">
            This really should be an LLM but we&apos;re waiting for RAG to truly
            reach commodity stage before we touch it.
          </p>
        </div>

        <div className="mt-8 grid max-w-5xl gap-8 md:mt-12 md:grid-cols-[200px_1fr] md:gap-12 lg:mt-16">
          {/* Sidebar */}
          <div className="sticky top-24 flex h-fit flex-col gap-4 max-md:hidden">
            {categories.map((category) => (
              <Button
                variant="ghost"
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`justify-start text-left text-xl transition-colors ${
                  activeCategory === category
                    ? 'font-semibold'
                    : 'font-normal hover:opacity-75'
                }`}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* FAQ Items by Category */}
          <div className="space-y-6">
            {categories.map((category) => {
              const categoryItems = faqItems.filter(
                (item) => item.category === category
              );

              return (
                <div
                  key={category}
                  id={`faq-${category.toLowerCase()}`}
                  ref={(el) => {
                    categoryRefs.current[category] = el;
                  }}
                  className={cn(
                    `rounded-xl`,
                    activeCategory === category
                      ? "bg-background"
                      : "bg-background/40",
                    "px-6"
                  )}
                  style={{
                    scrollMargin: `${TOP_PADDING}px`,
                  }}
                >
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue={`${categories[0]}-0`}
                    className="w-full"
                  >
                    {categoryItems.map((item, i) => (
                      <AccordionItem
                        key={i}
                        value={`${category}-${i}`}
                        className="border-muted border-b last:border-0"
                      >
                        <AccordionTrigger className="text-base font-medium hover:no-underline">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-base font-medium">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
