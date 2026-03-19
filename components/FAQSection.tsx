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
    question: "What is ReachDem?",
    answer:
      "ReachDem is a communication and engagement platform that helps businesses centralize their audience operations, manage contacts, segment users, launch campaigns, and track performance from a single workspace.",
  },
  {
    category: "Platform",
    question: "Who is ReachDem built for?",
    answer:
      "ReachDem is built for startups, small and medium-sized businesses, agencies, sales teams, marketing teams, and organizations that want a more structured and scalable way to communicate with their customers.",
  },
  {
    category: "Platform",
    question: "Do I need technical skills to use ReachDem?",
    answer:
      "No. ReachDem is designed to be easy to use for non-technical teams, while still offering advanced capabilities for developers and technical teams through APIs and integrations.",
  },

  // Pricing Questions
  {
    category: "Pricing",
    question: "How does ReachDem pricing work?",
    answer:
      "ReachDem pricing is generally based on your usage, the features you need, and the scale of your organization. This makes it easier to choose a plan that fits your current stage and growth goals.",
  },
  {
    category: "Pricing",
    question: "Do you offer plans for small businesses?",
    answer:
      "Yes. ReachDem is designed to support growing businesses with flexible plans that allow teams to start with the essentials and expand as their needs evolve.",
  },
  {
    category: "Pricing",
    question: "Are there any hidden fees?",
    answer:
      "No. We aim to keep pricing transparent. Any additional costs related to higher usage, premium features, or specific communication channels are clearly outlined in advance.",
  },

  // Support Questions
  {
    category: "Support",
    question: "What kind of support does ReachDem provide?",
    answer:
      "ReachDem provides support to help customers get started, configure their workspace, understand key features, and resolve technical or operational issues as they arise.",
  },
  {
    category: "Support",
    question: "Do you help with onboarding?",
    answer:
      "Yes. We can help with onboarding, including workspace setup, contact imports, audience organization, and the launch of your first campaigns.",
  },
  {
    category: "Support",
    question: "How can I contact support?",
    answer:
      "You can contact the ReachDem team through the support channels available on the platform, such as email, contact forms, or any support options included in your plan.",
  },

  // Security Questions
  {
    category: "Security",
    question: "Is my contact and customer data secure?",
    answer:
      "Yes. ReachDem takes data security seriously and applies technical and organizational measures to help protect the information stored on the platform.",
  },
  {
    category: "Security",
    question: "Who can access data in my workspace?",
    answer:
      "Access to data depends on the roles and permissions configured within your organization, helping you control who can view, manage, or update specific information and actions.",
  },
  {
    category: "Security",
    question: "How does ReachDem protect user accounts?",
    answer:
      "ReachDem uses secure authentication practices and access controls to reduce the risk of unauthorized access and help keep user accounts protected.",
  },

  // Features Questions
  {
    category: "Features",
    question: "What can I do with ReachDem?",
    answer:
      "With ReachDem, you can manage contacts, organize groups and segments, run communication campaigns, track engagement, and streamline customer communication workflows from one place.",
  },
  {
    category: "Features",
    question: "Can I segment my audience?",
    answer:
      "Yes. ReachDem lets you structure and segment your audience so you can send more targeted, relevant, and personalized communication to the right people.",
  },
  {
    category: "Features",
    question: "Can I track campaign performance?",
    answer:
      "Yes. ReachDem provides campaign tracking and performance insights to help you measure engagement, understand audience behavior, and improve future communication results.",
  },

  // Other Questions
  {
    category: "Other",
    question: "Can ReachDem grow with my business?",
    answer:
      "Yes. ReachDem is designed to scale with your business as your number of contacts, campaigns, users, and communication needs increase over time.",
  },
  {
    category: "Other",
    question: "Can multiple teams use ReachDem?",
    answer:
      "Yes. ReachDem can be structured to support multiple teams, workflows, or business units, making collaboration and organization easier across your operations.",
  },
  {
    category: "Other",
    question: "Why choose ReachDem instead of using multiple separate tools?",
    answer:
      "ReachDem helps centralize your communication operations in one environment, reducing tool fragmentation, improving data consistency, and making your workflows more efficient.",
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
