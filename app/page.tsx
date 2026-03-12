import { CTASection } from "@/components/landing/CTASection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { Hero195 } from "@/components/landing/Hero195";
import { LogosSection } from "@/components/landing/LogosSection";
import { ProcessSection } from "@/components/landing/ProcessSection";
import { WordRotate } from "@/components/magicui/word-rotate";

export default function Home() {
  return (
    <>
      <Hero195
        title={
          <>
            <span className="block lg:hidden">
              <span className="block">Reach them</span>
              <WordRotate
                className="mt-1 block"
                duration={3500}
                words={["everywhere", "anytime"]}
              />
            </span>
            <span className="hidden lg:inline-flex lg:items-baseline lg:gap-[0.35em] lg:whitespace-nowrap">
              <span className="inline">Reach them</span>
              <WordRotate
                className="lg:min-w-0"
                duration={3500}
                smoothWidth
                words={["everywhere", "anytime"]}
              />
            </span>
          </>
        }
        description="Maximize your communications impact by reaching all your customers through SMS, from one fast and reliable platform."
        primaryButtonText="Get started for free"
        primaryButtonUrl="/signup"
        secondaryButtonText="Talk to Sales"
        secondaryButtonUrl="/support"
      />
      <LogosSection />
      <FeaturesSection />
      <ProcessSection />
      <CTASection />
    </>
  );
}
