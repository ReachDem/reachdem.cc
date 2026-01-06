"use client";

import { useState, useEffect, useRef } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  title: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    id: "platform",
    title: "About the Platform",
    items: [
      {
        question: "What is this platform?",
        answer:
          "This is a solution designed to facilitate the management of your online processes, automate your key tasks, and improve communication with your users.",
      },
      {
        question: "What makes our solution unique?",
        answer:
          "Our platform stands out for its ease of use, optimized performance, and features tailored to the real needs of today's users.",
      },
      {
        question: "Who is this platform for?",
        answer:
          "Our platform is designed for individuals, professionals, and businesses looking to streamline their online operations and improve their workflow efficiency.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing & Plans",
    items: [
      {
        question: "Is there a free version?",
        answer:
          "Yes, we offer a free plan with basic features to get you started right away. Advanced plans are available to access additional tools.",
      },
      {
        question: "Why do prices vary between plans?",
        answer:
          "Each plan includes different features and levels of support, tailored to specific needs (personal, professional, or enterprise).",
      },
      {
        question: "Can I upgrade or downgrade my plan?",
        answer:
          "Yes, you can change your plan at any time. When upgrading, you'll get immediate access to new features. When downgrading, changes take effect at the start of your next billing cycle.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards, debit cards, and PayPal. Enterprise customers can also arrange for invoice-based billing.",
      },
    ],
  },
  {
    id: "support",
    title: "Support & Assistance",
    items: [
      {
        question: "Is support free?",
        answer:
          "Basic support is included for free. Premium support options may be available depending on your plan.",
      },
      {
        question: "How do I get immediate assistance?",
        answer:
          "You can contact our team via the contact form on the site or directly by email for a quick response.",
      },
      {
        question: "What are your support hours?",
        answer:
          "Our support team is available Monday through Friday, 9 AM to 6 PM (local time). Premium plan members have access to extended support hours.",
      },
    ],
  },
  {
    id: "security",
    title: "Security & Data",
    items: [
      {
        question: "Is my data secure?",
        answer:
          "Yes, we use modern security protocols to protect your personal information and data.",
      },
      {
        question: "What happens in case of a breach or outage?",
        answer:
          "A continuity plan and regular backups are in place to minimize the impact of potential incidents.",
      },
      {
        question: "Where is my data stored?",
        answer:
          "Your data is stored on secure servers in certified data centers that comply with international security standards and regulations.",
      },
      {
        question: "Can I export my data?",
        answer:
          "Yes, you can export your data at any time in standard formats. We believe in data portability and will never lock in your information.",
      },
    ],
  },
  {
    id: "features",
    title: "Features & Integrations",
    items: [
      {
        question: "Can I integrate other tools or services?",
        answer:
          "Yes, our platform supports numerous integrations with external tools to optimize your workflows.",
      },
      {
        question: "Can I update my account without losing my data?",
        answer:
          "Yes, any update to your account or information is done without interruption or content loss.",
      },
      {
        question: "Do you offer an API?",
        answer:
          "Yes, we provide a comprehensive REST API that allows you to integrate our platform with your existing systems and build custom solutions.",
      },
    ],
  },
  {
    id: "misc",
    title: "Miscellaneous",
    items: [
      {
        question: "What if I forget my password?",
        answer:
          "You can use the email recovery feature to reset your password easily.",
      },
      {
        question: "Is there a roadmap for future features?",
        answer:
          "Yes, we regularly publish our updates and announcements to keep you informed of upcoming improvements.",
      },
      {
        question: "Do you have an automatic backup system?",
        answer:
          "Yes, regular backups are performed to ensure your data remains available and protected.",
      },
    ],
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>("platform");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Scroll detection to auto-highlight menu sections
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const category of faqData) {
        const section = sectionRefs.current[category.id];
        if (section) {
          const { offsetTop, offsetHeight } = section;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveCategory(category.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleQuestion = (categoryId: string, questionIndex: number) => {
    const questionId = `${categoryId}-${questionIndex}`;
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  const scrollToSection = (categoryId: string) => {
    const section = sectionRefs.current[categoryId];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen bg-[#EDECE7] dark:bg-black">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {/* Header Section */}
        <div className="mb-20 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            We Have Answers
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg text-zinc-600 dark:text-zinc-400">
            It would really be an LLM, but we&apos;re waiting for RAG to truly
            reach the baseline product stage before we get into it.
          </p>
        </div>

        {/* FAQ Content - Two Column Layout */}
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Left Column - Category Navigation */}
          <aside className="lg:w-1/4">
            <nav className="sticky top-24 space-y-2">
              {faqData.map((category) => (
                <button
                  key={category.id}
                  onClick={() => scrollToSection(category.id)}
                  className={`block w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                    activeCategory === category.id
                      ? "bg-foreground text-background"
                      : "text-zinc-700 hover:bg-white/50 dark:text-zinc-300 dark:hover:bg-zinc-800/50"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </nav>
          </aside>

          {/* Right Column - Questions and Answers */}
          <main className="lg:w-3/4">
            <div className="space-y-8">
              {faqData.map((category) => (
                <section
                  key={category.id}
                  id={category.id}
                  ref={(el) => {
                    sectionRefs.current[category.id] = el;
                  }}
                  className="space-y-4"
                >
                  {category.items.map((item, index) => {
                    const questionId = `${category.id}-${index}`;
                    const isOpen = openQuestion === questionId;

                    return (
                      <div
                        key={index}
                        className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-900"
                      >
                        <button
                          onClick={() => toggleQuestion(category.id, index)}
                          className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800"
                        >
                          <span className="text-base font-semibold text-foreground">
                            {item.question}
                          </span>
                          <svg
                            className={`h-5 w-5 flex-shrink-0 text-zinc-400 transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        {isOpen && (
                          <div className="border-t border-zinc-100 px-6 py-4 dark:border-zinc-800">
                            <p className="text-zinc-600 dark:text-zinc-400">{item.answer}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </section>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
